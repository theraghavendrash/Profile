import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, ExternalLink, Terminal } from 'lucide-react';
import portfolioData from '../data/portfolio.js';
import useReducedMotion from '../hooks/useReducedMotion';
import { formatStatValue } from '../utils/portfolioUtils';

// Lazy load the 3D HeroScene
const HeroScene = React.lazy(() => import('./HeroScene'));

interface StatCounterProps {
  value: number | string;
  suffix?: string;
  decimals?: number;
  label: string;
  isNumeric?: boolean;
}

function StatCounter({ value, suffix = '', decimals = 0, label, isNumeric = true }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isNumeric || typeof value !== 'number') return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = value * easeOut;
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, prefersReducedMotion, hasAnimated, isNumeric]);

  return (
    <div ref={containerRef} className="border-t border-[#e5e5e5] dark:border-[#27272a] pt-4 pr-4">
      <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#111111] dark:text-[#f4f4f5] flex items-baseline flex-wrap">
        {isNumeric && typeof value === 'number' ? (
          <span>{formatStatValue(displayValue, decimals)}</span>
        ) : (
          <span>{String(value)}</span>
        )}
        {suffix && (
          <span className="text-[#4F46E5] font-semibold ml-1 text-base sm:text-lg">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa] uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

/**
 * TextScramble: Subtle terminal-style glyph scramble effect
 * Runs on mount and on hover. Respects prefers-reduced-motion.
 */
const SCRAMBLE_GLYPHS = '0123456789ABCDEF/_-+*#[]<>';

function TextScramble({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState<string>(text);
  const prefersReducedMotion = useReducedMotion();
  const animatingRef = useRef<boolean>(false);

  const startScramble = useCallback(() => {
    if (prefersReducedMotion || animatingRef.current) return;
    animatingRef.current = true;

    const length = text.length;
    let iteration = 0;
    const maxIterations = length + 8;

    const interval = setInterval(() => {
      iteration++;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '/') return char;
          // When iteration passes index, lock in the real character
          if (index < iteration - 4) {
            return text[index];
          }
          // Otherwise pick a random glyph
          return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        animatingRef.current = false;
      }
    }, 38);
  }, [text, prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) {
      const timeout = setTimeout(startScramble, 200);
      return () => clearTimeout(timeout);
    } else {
      setDisplayText(text);
    }
  }, [text, prefersReducedMotion, startScramble]);

  return (
    <span
      onMouseEnter={startScramble}
      className="inline-block cursor-default select-none font-mono"
      title="Interactive label"
    >
      {displayText}
    </span>
  );
}

/**
 * MagneticButton: Leans subtly toward the cursor (max 8px).
 * Smoothly resets on mouse leave. Respects prefers-reduced-motion.
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  'aria-label': ariaLabel
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    // Strict maximum limit: 8px
    const distance = Math.hypot(deltaX, deltaY);
    const maxDist = 8;
    const factor = distance > maxDist ? maxDist / distance : 1;

    setOffset({
      x: deltaX * factor,
      y: deltaY * factor
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        prefersReducedMotion
          ? { x: 0, y: 0 }
          : { x: offset.x, y: offset.y }
      }
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 22,
        mass: 0.4
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.a>
  );
}

function HeroSceneFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-white dark:bg-[#141414]">
      <svg
        className="w-40 h-40 text-[#111111] dark:text-[#f4f4f5] animate-[spin_24s_linear_infinite]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
        <polygon points="50,22 75,36 75,64 50,78 25,64 25,36" strokeDasharray="3 2" />
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="15" y1="30" x2="85" y2="70" />
        <line x1="85" y1="30" x2="15" y2="70" />
        <circle cx="50" cy="50" r="4" fill="#4F46E5" />
      </svg>
      <div className="mt-4 font-mono text-[11px] text-[#6b7280] dark:text-[#a1a1aa]">
        INITIALIZING WIREFRAME
      </div>
    </div>
  );
}

export function Hero() {
  const { personal } = portfolioData;
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Mouse tracking on hero section for subtle dot-grid spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || prefersReducedMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  // Scroll-driven motion for the hero headline: scales slightly and fades as user scrolls past it
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const headlineScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.94]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.22]);
  const headlineY = useTransform(scrollYProgress, [0, 0.55], [0, 18]);

  const wordContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05
      }
    }
  };

  const wordVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#e5e5e5] dark:border-[#27272a] overflow-hidden"
    >
      {/* Subtle Dot-Grid Background: static base layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-25 [background-size:24px_24px] [background-image:radial-gradient(#9ca3af_1px,transparent_1px)] dark:[background-image:radial-gradient(#52525b_1px,transparent_1px)]"
        aria-hidden="true"
      />

      {/* Subtle Dot-Grid Brightening near cursor */}
      {mousePos && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none [background-size:24px_24px] [background-image:radial-gradient(#4F46E5_1.2px,transparent_1.2px)] dark:[background-image:radial-gradient(#818cf8_1.2px,transparent_1.2px)] transition-opacity duration-150"
          style={{
            maskImage: `radial-gradient(circle 260px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 75%)`,
            WebkitMaskImage: `radial-gradient(circle 260px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 75%)`,
            opacity: 0.8
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge with subtle text scramble */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] text-[11px] font-mono tracking-widest text-[#464555] dark:text-[#a1a1aa]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              <TextScramble text={personal.eyebrow} />
            </div>

            {/* Scroll-driven scaling and fading headline wrapper */}
            <motion.div
              style={{
                scale: prefersReducedMotion ? 1 : headlineScale,
                opacity: prefersReducedMotion ? 1 : headlineOpacity,
                y: prefersReducedMotion ? 0 : headlineY,
                transformOrigin: 'left center'
              }}
            >
              <motion.h1
                variants={wordContainerVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.12] text-[#111111] dark:text-[#ffffff]"
              >
                {personal.headlineWords.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.28em] last:mr-0"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Bio text */}
            <p className="text-base sm:text-lg text-[#464555] dark:text-[#a1a1aa] leading-relaxed max-w-xl">
              {personal.bio}
            </p>

            {/* Actions with Magnetic Hover Effect */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#projects"
                className="px-5 py-3 bg-[#111111] dark:bg-[#f4f4f5] text-white dark:text-[#111111] text-xs font-semibold hover:bg-[#2e2e2e] dark:hover:bg-[#e4e4e7] border border-[#111111] dark:border-[#f4f4f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                <span className="inline-flex items-center gap-2">
                  <span>View Projects</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </span>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="px-5 py-3 bg-[#ffffff] dark:bg-[#18181b] text-[#111111] dark:text-[#f4f4f5] text-xs font-semibold hover:border-[#111111] dark:hover:border-[#f4f4f5] border border-[#e5e5e5] dark:border-[#27272a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                <span>Get in Touch</span>
              </MagneticButton>

              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                aria-label="GitHub Profile"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>github/theraghavendrash</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Availability status line */}
            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-[#6b7280] dark:text-[#a1a1aa]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{personal.availability}</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Scene */}
          <div className="lg:col-span-5 h-[320px] sm:h-[380px] lg:h-[420px] relative bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] flex items-center justify-center overflow-hidden">
            <div
              id="hero-scene-container"
              className="w-full h-full relative flex items-center justify-center"
            >
              <Suspense fallback={<HeroSceneFallback />}>
                <HeroScene />
              </Suspense>
            </div>

            <span className="absolute top-2 left-2 text-[10px] font-mono text-[#a3a3a3] dark:text-[#71717a] pointer-events-none select-none">
              3D WIREFRAME • CLICK TO PULSE
            </span>
            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#a3a3a3] dark:text-[#71717a] pointer-events-none select-none">
              PLANAR PROJECTION
            </span>
          </div>
        </div>

        {/* 3 Stats: "3 Projects", "4 Languages", "Year 2 · B.Tech AI/ML" */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-[#e5e5e5] dark:border-[#27272a] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {personal.stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals || 0}
              label={stat.label}
              isNumeric={stat.isNumeric ?? (typeof stat.value === 'number')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
