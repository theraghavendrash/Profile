import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Users } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import useReducedMotion from '../hooks/useReducedMotion';

interface ProjectCardProps {
  project: ProjectItem;
}

/**
 * Miniature interactive previews for each project type
 */
function Loan360Preview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-20 bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a] p-2.5 flex items-center justify-between gap-3 overflow-hidden select-none">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#111111] dark:bg-[#ffffff] flex items-center justify-center text-white dark:text-[#111111]">
          <span className="font-mono text-[9px] font-bold tracking-tight">L360</span>
        </div>
        <div>
          <div className="text-[10px] font-mono font-semibold text-[#111111] dark:text-[#ffffff] leading-tight">
            Borrower Portal
          </div>
          <div className="text-[9px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">
            Database Auth • Active
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#18181b] border border-[#e5e5e5] dark:border-[#27272a] p-1.5 flex items-center gap-1.5 shadow-none">
        <div className="space-y-1">
          <div className="w-20 h-2.5 bg-[#eeeeed] dark:bg-[#27272a] border border-[#e5e5e5] dark:border-[#3f3f46] flex items-center px-1">
            <span className="text-[7px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">usr:admin_sec</span>
          </div>
          <div className="w-20 h-2.5 bg-[#eeeeed] dark:bg-[#27272a] border border-[#e5e5e5] dark:border-[#3f3f46] flex items-center px-1">
            <span className="text-[7px] font-mono tracking-widest text-[#111111] dark:text-[#ffffff]">••••••</span>
          </div>
        </div>
        <motion.div
          animate={isHovered ? { scale: [1, 0.94, 1] } : { scale: 1 }}
          transition={{ duration: 0.35, repeat: isHovered ? 1 : 0 }}
          className="h-6 px-2 bg-[#4F46E5] text-white flex items-center justify-center text-[8px] font-mono font-semibold"
        >
          Sign In
        </motion.div>
      </div>
    </div>
  );
}

function GraphicsEditorPreview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-20 bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a] px-3 flex items-center justify-around overflow-hidden select-none">
      <svg className="w-full h-full max-w-[240px]" viewBox="0 0 240 70" fill="none">
        {/* Wireframe reference lines */}
        <line x1="10" y1="35" x2="230" y2="35" stroke="currentColor" className="text-[#e5e5e5] dark:text-[#27272a]" strokeDasharray="3 3" />
        <line x1="80" y1="10" x2="80" y2="60" stroke="currentColor" className="text-[#e5e5e5] dark:text-[#27272a]" strokeDasharray="3 3" />
        <line x1="160" y1="10" x2="160" y2="60" stroke="currentColor" className="text-[#e5e5e5] dark:text-[#27272a]" strokeDasharray="3 3" />

        {/* 1. Circle with pulse and stroke animation */}
        <motion.circle
          cx="45"
          cy="35"
          r="16"
          stroke="#4F46E5"
          strokeWidth="1.5"
          fill="none"
          animate={
            isHovered
              ? { scale: [1, 1.15, 1], strokeWidth: [1.5, 2, 1.5] }
              : { scale: 1, strokeWidth: 1.5 }
          }
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 0.2 }}
          style={{ transformOrigin: '45px 35px' }}
        />
        <circle cx="45" cy="35" r="2.5" fill="#4F46E5" />

        {/* 2. Square with rotation animation */}
        <motion.rect
          x="108"
          y="23"
          width="24"
          height="24"
          stroke="currentColor"
          className="text-[#111111] dark:text-[#f4f4f5]"
          strokeWidth="1.5"
          fill="none"
          animate={
            isHovered
              ? { rotate: [0, 45, 90] }
              : { rotate: 0 }
          }
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ transformOrigin: '120px 35px' }}
        />

        {/* 3. Triangle with translation animation */}
        <motion.polygon
          points="195,20 210,48 180,48"
          stroke="currentColor"
          className="text-[#111111] dark:text-[#f4f4f5]"
          strokeWidth="1.5"
          fill="none"
          animate={
            isHovered
              ? { y: [-3, 3, -3] }
              : { y: 0 }
          }
          transition={{ duration: 0.8, ease: 'easeInOut', repeat: isHovered ? Infinity : 0 }}
        />
      </svg>
    </div>
  );
}

function CsvDashboardPreview({ isHovered }: { isHovered: boolean }) {
  const bars = [
    { x: 30, h: 22, label: 'Q1' },
    { x: 65, h: 36, label: 'Q2' },
    { x: 100, h: 28, label: 'Q3' },
    { x: 135, h: 46, label: 'Q4', isMax: true },
    { x: 170, h: 32, label: 'AVG' },
    { x: 205, h: 40, label: 'MAX' }
  ];

  return (
    <div className="w-full h-20 bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a] px-2 flex items-center justify-center overflow-hidden select-none">
      <svg className="w-full h-full max-w-[250px]" viewBox="0 0 250 70" fill="none">
        {/* Baseline & guide lines */}
        <line x1="15" y1="58" x2="235" y2="58" stroke="currentColor" className="text-[#111111] dark:text-[#f4f4f5]" strokeWidth="1" />
        <line x1="15" y1="36" x2="235" y2="36" stroke="currentColor" className="text-[#e5e5e5] dark:text-[#27272a]" strokeDasharray="3 3" />
        <line x1="15" y1="18" x2="235" y2="18" stroke="currentColor" className="text-[#e5e5e5] dark:text-[#27272a]" strokeDasharray="3 3" />

        {/* Animated bars */}
        {bars.map((bar, i) => (
          <g key={i}>
            <motion.rect
              x={bar.x}
              y={58 - bar.h}
              width="18"
              height={bar.h}
              fill={bar.isMax ? '#4F46E5' : 'currentColor'}
              className={bar.isMax ? '' : 'text-[#111111] dark:text-[#f4f4f5]'}
              initial={{ scaleY: 0.85 }}
              animate={
                isHovered
                  ? { scaleY: [0.85, 1, 0.92, 1], y: [4, 0, 2, 0] }
                  : { scaleY: 0.85, y: 0 }
              }
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: 'easeOut'
              }}
              style={{ transformOrigin: 'center 58px' }}
            />
            <text
              x={bar.x + 9}
              y="66"
              textAnchor="middle"
              fill="currentColor"
              className="text-[#6b7280] dark:text-[#a1a1aa]"
              fontSize="7"
              fontFamily="monospace"
            >
              {bar.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect touch devices to skip 3D tilt
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (maximum 6 degrees)
    const rotX = ((y - centerY) / centerY) * -5.5;
    const rotY = ((x - centerX) / centerX) * 5.5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Select preview component
  const renderPreview = () => {
    if (project.id === 'loan-360') {
      return <Loan360Preview isHovered={isHovered} />;
    }
    if (project.id === 'graphics-editor') {
      return <GraphicsEditorPreview isHovered={isHovered} />;
    }
    return <CsvDashboardPreview isHovered={isHovered} />;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          !prefersReducedMotion && !isTouchDevice && isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s ease-out'
      }}
      className={`group relative h-full flex flex-col justify-between bg-[#ffffff] dark:bg-[#141414] border transition-colors duration-150 p-6 sm:p-7 ${
        project.featured ? 'border-[#111111] dark:border-[#e4e4e7]' : 'border-[#e5e5e5] dark:border-[#27272a]'
      }`}
    >
      {/* Drawn thin indigo border on hover via animated SVG rect */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-visible"
        aria-hidden="true"
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isHovered && !prefersReducedMotion ? 1 : 0
          }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      </svg>

      {/* Faint subtle highlight overlay on hover */}
      <div
        className={`pointer-events-none absolute inset-0 bg-[#111111]/[0.015] dark:bg-[#ffffff]/[0.02] transition-opacity duration-150 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[#111111] dark:text-[#ffffff] px-2 py-0.5 bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a]">
              PROJECT {project.number}
            </span>

            {project.badge && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-medium tracking-tight bg-[#4F46E5] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {project.badge}
              </span>
            )}
          </div>

          <span className="text-[11px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">
            {project.tags.slice(0, 2).join(' / ')}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] dark:text-[#ffffff] tracking-tight mb-1 group-hover:text-[#4F46E5] transition-colors duration-150">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa] mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#1a1c1c]/90 dark:text-[#d1d5db] mb-4">
          {project.description}
        </p>

        {/* Miniature interactive preview slot: ensures equal card heights while providing tactile feedback on hover */}
        <div className="my-4 transition-all duration-300 ease-out">
          {renderPreview()}
        </div>
      </div>

      {/* Bottom Section: Tags & Action Links */}
      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono bg-[#f9f9f8] dark:bg-[#0c0c0c] text-[#111111] dark:text-[#f4f4f5] border border-[#e5e5e5] dark:border-[#27272a]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-[#e5e5e5] dark:border-[#27272a] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Live Demo button: only rendered if liveDemoUrl is present */}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] dark:text-[#ffffff] hover:text-[#4F46E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] transition-colors"
                aria-label={`View live demo of ${project.title} (opens in new tab)`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* GitHub button: only rendered if githubUrl is present */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] transition-colors"
                aria-label={`View source code of ${project.title} on GitHub (opens in new tab)`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {/* When NO links are available: non-clickable 'Team Project' label */}
            {!project.liveDemoUrl && !project.githubUrl && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa] bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a] select-none">
                <Users className="w-3.5 h-3.5 text-[#6b7280] dark:text-[#a1a1aa]" />
                <span>Team Project</span>
              </span>
            )}
          </div>

          {/* Project number index with diagonal sliding arrow on hover */}
          <span className="text-[11px] font-mono text-[#6b7280] dark:text-[#a1a1aa] flex items-center gap-1">
            <span>#{project.number}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7280] dark:text-[#a1a1aa] transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#4F46E5]" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
