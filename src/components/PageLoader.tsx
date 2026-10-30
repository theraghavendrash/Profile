import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import portfolioData from '../data/portfolio.js';

interface PageLoaderProps {
  onComplete?: () => void;
}

/**
 * PageLoader: Displays "RSH" initials fading in, followed by a crisp reveal
 * of the page. Total duration is under 1 second (approx. 800ms).
 * Respects prefers-reduced-motion by completing almost instantaneously.
 */
export function PageLoader({ onComplete }: PageLoaderProps) {
  const [visible, setVisible] = useState<boolean>(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion, complete almost immediately
    const totalTime = prefersReducedMotion ? 180 : 820;

    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, totalTime);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: prefersReducedMotion ? 0.1 : 0.28, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f9f9f8] dark:bg-[#0c0c0c] select-none pointer-events-auto"
          aria-live="polite"
          aria-label={`Loading ${portfolioData.personal.name} portfolio`}
        >
          <div className="flex flex-col items-center">
            {/* Initials "RSH" */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.32, ease: 'easeOut' }}
              className="flex items-center gap-1.5"
            >
              <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#ffffff]">
                RSH
              </span>
              <span className="w-2 h-2 bg-[#4F46E5] inline-block" />
            </motion.div>

            {/* Minimal Sub-line */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.15, duration: 0.25 }}
              className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6b7280] dark:text-[#a1a1aa]"
            >
              B.Tech AI/ML • 2026
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
