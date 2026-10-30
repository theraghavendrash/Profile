import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GitCommit, Award, BookOpen } from 'lucide-react';
import portfolioData, { MilestoneItem } from '../data/portfolio.js';
import useReducedMotion from '../hooks/useReducedMotion';
import MaskRevealTitle from './MaskRevealTitle';

interface MilestoneRowProps {
  milestone: MilestoneItem;
  idx: number;
}

function MilestoneRow({ milestone, idx }: MilestoneRowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative group"
    >
      {/* Timeline node marker: fills with deep indigo (#4F46E5) when reaching the middle of the screen */}
      <motion.span
        initial={
          prefersReducedMotion
            ? { backgroundColor: '#4F46E5', borderColor: '#4F46E5' }
            : { backgroundColor: '#ffffff', borderColor: '#111111' }
        }
        whileInView={{
          backgroundColor: '#4F46E5',
          borderColor: '#4F46E5'
        }}
        viewport={{ margin: '0px 0px -50% 0px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 border-2 z-10 flex items-center justify-center bg-white dark:bg-[#141414] border-[#111111] dark:border-[#ffffff]"
        aria-hidden="true"
      >
        <motion.span
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: '0px 0px -50% 0px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-1 h-1 bg-white"
        />
      </motion.span>

      {/* Milestone Card */}
      <div className="bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] p-6 sm:p-7 hover:border-[#111111] dark:hover:border-[#ffffff] transition-colors duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-[#4F46E5]">
                {milestone.period}
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#71717a]">•</span>
              <span className="font-mono text-xs text-[#6b7280] dark:text-[#a1a1aa]">
                {milestone.place}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-[#111111] dark:text-[#ffffff] tracking-tight">
              {milestone.role}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#111111] dark:text-[#ffffff] px-2.5 py-1 bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a] self-start sm:self-auto">
            {milestone.period.includes('Cert') ? (
              <Award className="w-3.5 h-3.5 text-[#4F46E5]" />
            ) : (
              <BookOpen className="w-3.5 h-3.5 text-[#4F46E5]" />
            )}
            <span>STEP 0{idx + 1}</span>
          </div>
        </div>

        <p className="text-sm text-[#1a1c1c]/90 dark:text-[#d1d5db] leading-relaxed mb-4">
          {milestone.description}
        </p>

        <div className="pt-3 border-t border-[#e5e5e5] dark:border-[#27272a] flex flex-wrap items-center gap-1.5">
          {milestone.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono bg-[#f9f9f8] dark:bg-[#0c0c0c] text-[#464555] dark:text-[#a1a1aa] border border-[#e5e5e5] dark:border-[#27272a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const { journey } = portfolioData;
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-driven line drawing using useScroll and useTransform
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 65%', 'end 50%']
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="py-20 sm:py-28 border-b border-[#e5e5e5] dark:border-[#27272a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#6b7280] dark:text-[#a1a1aa] mb-2">
            <GitCommit className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{journey.eyebrow}</span>
          </div>

          {/* Section title with bottom-to-top clip-path mask wipe */}
          <MaskRevealTitle className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#ffffff] mb-3">
            {journey.title}
          </MaskRevealTitle>

          <p className="text-sm text-[#6b7280] dark:text-[#a1a1aa] max-w-xl mb-14">
            Practical coursework, project collaborations, certifications, and entrepreneurship exposure.
          </p>

          {/* Timeline Container */}
          <div
            ref={timelineRef}
            className="relative pl-6 sm:pl-8 space-y-10 ml-2 sm:ml-4"
          >
            {/* Base static guide line */}
            <div
              className="absolute left-[-1px] top-2 bottom-4 w-[2px] bg-[#e5e5e5] dark:bg-[#27272a]"
              aria-hidden="true"
            />

            {/* Scroll-drawn progress line in deep indigo accent */}
            <motion.div
              style={{
                scaleY: prefersReducedMotion ? 1 : lineScaleY,
                transformOrigin: 'top'
              }}
              className="absolute left-[-1px] top-2 bottom-4 w-[2px] bg-[#4F46E5] z-0"
              aria-hidden="true"
            />

            {/* Milestones */}
            {journey.milestones.map((milestone, idx) => (
              <MilestoneRow key={idx} milestone={milestone} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;
