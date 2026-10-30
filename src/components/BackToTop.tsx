import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * BackToTop: Minimal, flat button that appears after scrolling down (> 400px).
 * Smoothly scrolls back to top when clicked.
 */
export function BackToTop() {
  const [visible, setVisible] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Back to top of page"
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-1.5 px-3 py-2 bg-[#ffffff] dark:bg-[#18181b] border border-[#e5e5e5] dark:border-[#27272a] text-[#111111] dark:text-[#f4f4f5] hover:border-[#111111] dark:hover:border-[#f4f4f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer shadow-none"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#4F46E5] group-hover:-translate-y-0.5 transition-transform duration-150" />
          <span className="font-mono text-xs font-medium tracking-wider">TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
