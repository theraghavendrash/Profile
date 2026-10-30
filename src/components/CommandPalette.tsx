import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Compass,
  Code2,
  FolderGit2,
  Milestone,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import portfolioData from '../data/portfolio.js';
import useReducedMotion from '../hooks/useReducedMotion';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'External' | 'Preferences';
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const topOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    }, 50);
  };

  const commands: CommandItem[] = [
    {
      id: 'about',
      title: 'About',
      subtitle: 'Student profile, background and learning principles',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-[#4F46E5]" />,
      action: () => scrollToSection('about')
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Languages, data libraries, and ongoing learning',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-[#4F46E5]" />,
      action: () => scrollToSection('skills')
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'Loan 360, 2D Graphics Editor, CSV Data Dashboard',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-[#4F46E5]" />,
      action: () => scrollToSection('projects')
    },
    {
      id: 'journey',
      title: 'Journey',
      subtitle: 'Academic milestones, programmes, and course labs',
      category: 'Navigation',
      icon: <Milestone className="w-4 h-4 text-[#4F46E5]" />,
      action: () => scrollToSection('journey')
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: 'Send an email regarding opportunities or collaboration',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-[#4F46E5]" />,
      action: () => scrollToSection('contact')
    },
    {
      id: 'github',
      title: 'Open GitHub',
      subtitle: 'github.com/theraghavendrash',
      category: 'External',
      icon: <Github className="w-4 h-4 text-[#4F46E5]" />,
      action: () => {
        onClose();
        window.open(portfolioData.personal.links.github, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn',
      subtitle: 'linkedin.com/in/raghavendracsh',
      category: 'External',
      icon: <Linkedin className="w-4 h-4 text-[#4F46E5]" />,
      action: () => {
        onClose();
        window.open(portfolioData.personal.links.linkedin, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'theme-toggle',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: theme === 'dark' ? 'Stone light background with thin borders' : 'Near-black theme with white text',
      category: 'Preferences',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-[#4F46E5]" /> : <Moon className="w-4 h-4 text-[#4F46E5]" />,
      action: () => {
        toggleTheme();
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Keep selection bounded
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle modal keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-none cursor-default"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] shadow-none overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-[#e5e5e5] dark:border-[#27272a]">
              <Search className="w-4 h-4 text-[#6b7280] dark:text-[#a1a1aa] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Jump to section, open link, or switch theme..."
                className="w-full bg-transparent text-sm text-[#111111] dark:text-[#f4f4f5] placeholder-[#9ca3af] dark:placeholder-[#71717a] outline-none font-sans"
              />
              <span className="font-mono text-[10px] text-[#6b7280] dark:text-[#a1a1aa] uppercase px-1.5 py-0.5 border border-[#e5e5e5] dark:border-[#27272a] shrink-0 ml-2">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[320px] overflow-y-auto divide-y divide-[#f3f4f6] dark:divide-[#1f1f23] p-1.5">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa]">
                  No matching commands found
                </div>
              ) : (
                filteredCommands.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors cursor-pointer rounded-none ${
                        isSelected
                          ? 'bg-[#f4f4f5] dark:bg-[#1f1f23] text-[#111111] dark:text-[#ffffff]'
                          : 'text-[#4b5563] dark:text-[#d1d5db] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1c]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="p-1 border border-[#e5e5e5] dark:border-[#27272a] bg-white dark:bg-[#141414] shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium font-sans truncate text-[#111111] dark:text-[#ffffff]">
                            {item.title}
                          </div>
                          <div className="text-[11px] font-mono text-[#6b7280] dark:text-[#a1a1aa] truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono uppercase text-[#9ca3af] dark:text-[#71717a]">
                          {item.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-[#4F46E5]" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-[#f9f9f8] dark:bg-[#0c0c0c] border-t border-[#e5e5e5] dark:border-[#27272a] flex items-center justify-between text-[10px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div>
                <span>Press &apos;/&apos; or &apos;K&apos; anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
