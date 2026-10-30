import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Compass, BookOpen, Code2, Users } from 'lucide-react';
import portfolioData from '../data/portfolio.js';
import useReducedMotion from '../hooks/useReducedMotion';
import MaskRevealTitle from './MaskRevealTitle';

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const { about } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven subtle parallax (max 20px) on the fact list / academic card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const factListY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-28 border-b border-[#e5e5e5] dark:border-[#27272a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#6b7280] dark:text-[#a1a1aa] mb-3"
          >
            <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{about.eyebrow}</span>
          </motion.div>

          {/* Section title with bottom-to-top clip-path mask wipe */}
          <MaskRevealTitle className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#ffffff] max-w-3xl mb-8">
            {about.title}
          </MaskRevealTitle>

          {/* Student Narrative Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-5">
              {about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg text-[#1a1c1c]/90 dark:text-[#d1d5db] leading-relaxed max-w-2xl"
                >
                  {para}
                </p>
              ))}

              <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-[#6b7280] dark:text-[#a1a1aa]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#4F46E5]" />
                  <span>C & Python Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#4F46E5]" />
                  <span>Collaborative Team Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4F46E5]" />
                  <span>Active AI/ML Study</span>
                </div>
              </div>
            </motion.div>

            {/* Fact list card with subtle scroll-driven parallax (max 16px <= 20px) */}
            <motion.div
              variants={itemVariants}
              style={{
                y: prefersReducedMotion ? 0 : factListY
              }}
              className="lg:col-span-5 bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-2">
                  ACADEMIC DETAILS
                </div>
                <div className="text-sm font-semibold text-[#111111] dark:text-[#ffffff] mb-4">
                  Undergraduate Programme
                </div>
                <ul className="space-y-3 font-mono text-xs text-[#464555] dark:text-[#a1a1aa]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4F46E5] font-bold">—</span>
                    <span>Degree: B.Tech in Artificial Intelligence & Machine Learning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4F46E5] font-bold">—</span>
                    <span>Year: 2nd Year undergraduate coursework.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4F46E5] font-bold">—</span>
                    <span>Focus: Algorithms, data handling, and software projects.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4F46E5] font-bold">—</span>
                    <span>Goal: Building strong engineering fundamentals and teamwork.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e5e5e5] dark:border-[#27272a] flex items-center justify-between text-[11px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">
                <span>STATUS: ENROLLED</span>
                <span>YEAR 2</span>
              </div>
            </motion.div>
          </div>

          {/* 3 Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.principles.map((principle) => (
              <motion.div
                key={principle.code}
                variants={itemVariants}
                className="bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] p-6 hover:border-[#111111] dark:hover:border-[#ffffff] transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-[#4F46E5] font-semibold mb-3">
                    // VALUE {principle.code}
                  </div>
                  <h3 className="text-base font-semibold text-[#111111] dark:text-[#ffffff] mb-2 tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[#464555] dark:text-[#a1a1aa] leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#f3f4f3] dark:border-[#27272a] flex items-center justify-between text-[11px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">
                  <span>PRACTICE</span>
                  <span>LEARNING</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
