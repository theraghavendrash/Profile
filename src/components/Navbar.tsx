import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import portfolioData from '../data/portfolio.js';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' }
];

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  // Monitor scroll for shadow/border state and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_ITEMS[i].id);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
        scrolled
          ? 'bg-[#ffffff] dark:bg-[#141414] border-b border-[#e5e5e5] dark:border-[#27272a]'
          : 'bg-[#f9f9f8]/95 dark:bg-[#0c0c0c]/95 border-b border-[#e5e5e5] dark:border-[#27272a]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('');
          }}
          className="group flex items-center gap-2.5 text-[#111111] dark:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded p-1"
          aria-label={`${portfolioData.personal.shortName} Home`}
        >
          <span className="w-2.5 h-2.5 bg-[#111111] dark:bg-[#ffffff] group-hover:bg-[#4F46E5] dark:group-hover:bg-[#4F46E5] transition-colors duration-150" />
          <span className="font-semibold text-sm tracking-tight">
            {portfolioData.personal.shortName}
          </span>
          <span className="hidden md:inline-block font-mono text-[11px] text-[#6b7280] dark:text-[#a1a1aa] tracking-normal border-l border-[#e5e5e5] dark:border-[#27272a] pl-2.5 ml-0.5">
            B.TECH AI/ML
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-150 rounded ${
                  isActive
                    ? 'text-[#111111] dark:text-[#ffffff] font-semibold'
                    : 'text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff]'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#4F46E5]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions: Palette trigger, Theme toggle, GH link, Contact button */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Command Palette Trigger Button */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="px-2 py-1 text-xs font-mono text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff] border border-[#e5e5e5] dark:border-[#27272a] hover:border-[#111111] dark:hover:border-[#ffffff] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              title="Open Command Palette (press / or K)"
              aria-label="Open command palette"
            >
              <Search className="w-3 h-3 text-[#4F46E5]" />
              <span className="text-[11px]">⌘K</span>
            </button>
          )}

          {/* Theme Toggle Button (in-memory state only) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 text-[#111111] dark:text-[#ffffff] border border-[#e5e5e5] dark:border-[#27272a] hover:border-[#111111] dark:hover:border-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#e4e4e7]" />
            ) : (
              <Moon className="w-4 h-4 text-[#111111]" />
            )}
          </button>

          <a
            href={portfolioData.personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff] px-2 py-1.5 border border-transparent hover:border-[#e5e5e5] dark:hover:border-[#27272a] transition-all duration-150 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            aria-label="GitHub Profile (opens in new tab)"
          >
            <span>GH</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="text-xs font-medium bg-[#111111] dark:bg-[#ffffff] text-white dark:text-[#111111] hover:bg-[#333333] dark:hover:bg-[#e4e4e7] px-3.5 py-1.5 transition-colors duration-150 rounded-none border border-[#111111] dark:border-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            Initiate Contact
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle & Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle for mobile */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 text-[#111111] dark:text-[#ffffff] border border-[#e5e5e5] dark:border-[#27272a] rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#e4e4e7]" />
            ) : (
              <Moon className="w-4 h-4 text-[#111111]" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111111] dark:text-[#ffffff] hover:bg-[#eeeeed] dark:hover:bg-[#1f1f23] rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] dark:border-[#27272a] bg-[#ffffff] dark:bg-[#141414] px-4 py-4 space-y-2">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full text-left px-3 py-2 text-xs font-mono text-[#4F46E5] border border-[#e5e5e5] dark:border-[#27272a] bg-[#f9f9f8] dark:bg-[#0c0c0c] flex items-center justify-between"
            >
              <span>Command Palette</span>
              <span className="text-[10px] uppercase border px-1 border-[#4F46E5]">⌘K</span>
            </button>
          )}

          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`block px-3 py-2 text-sm font-medium rounded ${
                activeSection === item.id
                  ? 'bg-[#eeeeed] dark:bg-[#1f1f23] text-[#111111] dark:text-[#ffffff] font-semibold'
                  : 'text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff]'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#e5e5e5] dark:border-[#27272a] flex gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="flex-1 text-center py-2 text-xs font-semibold bg-[#111111] dark:bg-[#ffffff] text-white dark:text-[#111111] hover:bg-[#333333] dark:hover:bg-[#e4e4e7] transition-colors"
            >
              Initiate Contact
            </a>
            <a
              href={portfolioData.personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-mono border border-[#e5e5e5] dark:border-[#27272a] text-[#111111] dark:text-[#ffffff] flex items-center justify-center gap-1"
            >
              GH <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
