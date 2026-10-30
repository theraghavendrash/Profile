import { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import portfolioData from '../data/portfolio.js';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#ffffff] dark:bg-[#141414] border-t border-[#e5e5e5] dark:border-[#27272a] py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#e5e5e5] dark:border-[#27272a]">
          {/* Identity & Scope */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#111111] dark:bg-[#ffffff]" />
              <span className="font-semibold text-sm tracking-tight text-[#111111] dark:text-[#ffffff]">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-xs text-[#6b7280] dark:text-[#a1a1aa] leading-relaxed max-w-sm">
              Portfolio of {portfolioData.personal.name} — 2nd Year B.Tech student in AI & ML. Projects in C, Python, and web development.
            </p>
          </div>

          {/* Telemetry / Invariant */}
          <div className="md:col-span-4 font-mono text-xs text-[#6b7280] dark:text-[#a1a1aa] space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#111111] dark:text-[#ffffff] font-semibold">
              LOCAL TIME
            </div>
            <div className="text-sm font-semibold text-[#111111] dark:text-[#ffffff]">
              {currentTime || '00:00:00 UTC'}
            </div>
            <div className="text-[11px] text-[#6b7280] dark:text-[#a1a1aa]">
              {theme === 'dark' ? 'CANVAS: NEAR-BLACK #0C0C0C' : 'CANVAS: STONE #FAFAF9'} / ACCENT #4F46E5
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#e5e5e5] dark:border-[#27272a] text-[#111111] dark:text-[#ffffff] hover:border-[#111111] dark:hover:border-[#ffffff] hover:text-[#4F46E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#e5e5e5] dark:border-[#27272a] text-[#111111] dark:text-[#ffffff] hover:border-[#111111] dark:hover:border-[#ffffff] hover:text-[#4F46E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="p-2 border border-[#e5e5e5] dark:border-[#27272a] text-[#111111] dark:text-[#ffffff] hover:border-[#111111] dark:hover:border-[#ffffff] hover:text-[#4F46E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                aria-label="Email Inbox"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6b7280] dark:text-[#a1a1aa] hover:text-[#111111] dark:hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] transition-colors cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata bar */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#6b7280] dark:text-[#a1a1aa]">
          <div>
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>EDITORIAL PORTFOLIO</span>
            <span>•</span>
            <span className="text-[#4F46E5] font-semibold">B.TECH AI/ML</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
