import { motion, type Variants } from 'framer-motion';
import { Layers } from 'lucide-react';
import portfolioData from '../data/portfolio.js';
import ProjectCard from './ProjectCard';
import useReducedMotion from '../hooks/useReducedMotion';
import MaskRevealTitle from './MaskRevealTitle';

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const projects = portfolioData.projects;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
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
    <section id="projects" className="py-20 sm:py-28 border-b border-[#e5e5e5] dark:border-[#27272a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#6b7280] dark:text-[#a1a1aa] mb-2">
              <Layers className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>FEATURED WORKS</span>
            </div>
            
            {/* Section title with bottom-to-top clip-path mask wipe */}
            <MaskRevealTitle className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#ffffff]">
              Selected Projects
            </MaskRevealTitle>
            
            <p className="mt-2 text-sm text-[#6b7280] dark:text-[#a1a1aa] max-w-xl">
              Web applications, C graphics mini-projects, and collaborative Python data dashboards.
            </p>
          </div>

          <div className="text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa] px-3 py-1.5 bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] self-start md:self-auto">
            <span>SHOWING 03 PROJECTS</span>
          </div>
        </div>

        {/* 3-Item Balanced Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`h-full ${index === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
