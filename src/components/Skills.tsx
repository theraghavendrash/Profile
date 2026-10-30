import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Library, Sparkles, Filter } from 'lucide-react';
import portfolioData from '../data/portfolio.js';
import useReducedMotion from '../hooks/useReducedMotion';
import MaskRevealTitle from './MaskRevealTitle';

type FilterType = 'all' | 'languages' | 'libraries' | 'learning';

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { skills } = portfolioData;

  // Flatten all skills into a unified list
  const allSkills = skills.categories.flatMap((cat) => cat.items);

  const filteredSkills = allSkills.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  // Unique list of skill names for the infinite marquee strip
  const marqueeList = [
    'C',
    'C++',
    'Python',
    'HTML',
    'Pandas',
    'Matplotlib',
    'Tkinter',
    'NumPy',
    'scikit-learn',
    'Generative AI'
  ];
  // Doubled for seamless CSS infinite scrolling
  const duplicatedMarquee = [...marqueeList, ...marqueeList, ...marqueeList];

  const filterTabs: { id: FilterType; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', count: allSkills.length, icon: <Filter className="w-3.5 h-3.5" /> },
    {
      id: 'languages',
      label: 'Languages',
      count: skills.categories[0].items.length,
      icon: <Code2 className="w-3.5 h-3.5" />
    },
    {
      id: 'libraries',
      label: 'Libraries',
      count: skills.categories[1].items.length,
      icon: <Library className="w-3.5 h-3.5" />
    },
    {
      id: 'learning',
      label: 'Learning',
      count: skills.categories[2].items.length,
      icon: <Sparkles className="w-3.5 h-3.5" />
    }
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-[#e5e5e5] dark:border-[#27272a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#6b7280] dark:text-[#a1a1aa] mb-2">
            <Code2 className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{skills.eyebrow}</span>
          </div>

          {/* Section title with bottom-to-top clip-path mask wipe */}
          <MaskRevealTitle className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#ffffff] mb-3">
            {skills.title}
          </MaskRevealTitle>

          <p className="text-sm text-[#6b7280] dark:text-[#a1a1aa] max-w-xl mb-8">
            Languages learned in coursework, data exploration libraries applied in projects, and subjects currently exploring.
          </p>

          {/* Filter Row with layout animations */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#e5e5e5] dark:border-[#27272a]">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-[#111111] dark:bg-[#ffffff] text-white dark:text-[#111111] border-[#111111] dark:border-[#ffffff] font-medium'
                      : 'bg-[#ffffff] dark:bg-[#141414] text-[#6b7280] dark:text-[#a1a1aa] border-[#e5e5e5] dark:border-[#27272a] hover:border-[#111111] dark:hover:border-[#ffffff] hover:text-[#111111] dark:hover:text-[#ffffff]'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 border ${
                      isActive
                        ? 'border-white/30 dark:border-black/30'
                        : 'border-[#e5e5e5] dark:border-[#27272a]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Skill Chips Grid with 2px lift and informative tooltips */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-14"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((item) => {
                const isHovered = hoveredSkill === item.name;
                return (
                  <motion.div
                    key={item.name}
                    layout
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    whileHover={prefersReducedMotion ? {} : { y: -2 }}
                    onMouseEnter={() => setHoveredSkill(item.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="relative group bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] hover:border-[#111111] dark:hover:border-[#ffffff] p-3.5 transition-colors cursor-default select-none flex items-center justify-between"
                  >
                    {/* Tooltip on hover: authentic context only, no invented percentages */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#111111] dark:bg-[#ffffff] text-white dark:text-[#111111] text-[11px] font-mono whitespace-nowrap z-30 pointer-events-none border border-[#111111] dark:border-[#ffffff] shadow-none"
                          role="tooltip"
                        >
                          {item.tooltip}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Skill Info */}
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#4F46E5] inline-block shrink-0" />
                      <span className="font-mono text-sm font-semibold text-[#111111] dark:text-[#ffffff]">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#6b7280] dark:text-[#a1a1aa] uppercase px-1.5 py-0.5 border border-[#e5e5e5] dark:border-[#27272a] bg-[#f9f9f8] dark:bg-[#0c0c0c]">
                        {item.level}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Slow Infinite Marquee Strip: Pauses on hover, double-buffered for seamless loop */}
      <div className="border-y border-[#e5e5e5] dark:border-[#27272a] bg-[#fdfdfc] dark:bg-[#111113] py-3 overflow-hidden select-none marquee-container">
        <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
          {duplicatedMarquee.map((skillName, index) => (
            <div
              key={`${skillName}-${index}`}
              className="inline-flex items-center gap-4 text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa]"
            >
              <span className="font-medium text-[#111111] dark:text-[#f4f4f5]">
                {skillName}
              </span>
              <span className="text-[#4F46E5] text-[10px]">♦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
