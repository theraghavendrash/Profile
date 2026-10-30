import React from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

interface MaskRevealTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MaskRevealTitle: Reveals section titles with a bottom-to-top clip-path mask wipe.
 * Duration: 0.55s (< 0.7s) with easeOut.
 * Animates transform (y), opacity, and clip-path.
 * Fully respects prefers-reduced-motion.
 */
export function MaskRevealTitle({ children, className = '' }: MaskRevealTitleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.h2
      initial={
        prefersReducedMotion
          ? { opacity: 1, clipPath: 'none', y: 0 }
          : {
              opacity: 0,
              y: 16,
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}

export default MaskRevealTitle;
