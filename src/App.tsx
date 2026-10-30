import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Global keyboard shortcuts: press '/' or 'K' (or Cmd/Ctrl+K) to open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K shortcut
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Do not trigger single-key shortcut if typing inside an input or textarea
      const activeEl = document.activeElement;
      const isTyping =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          (activeEl as HTMLElement).isContentEditable);

      if (isTyping) return;

      // Pressing '/' or 'k' / 'K'
      if (e.key === '/' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f9f9f8] dark:bg-[#0c0c0c] text-[#111111] dark:text-[#f4f4f5] flex flex-col font-sans selection:bg-[#4F46E5] selection:text-white transition-colors duration-150">
      {/* Page Loader: RSH initials fade in and page reveals (under 1 second total) */}
      <PageLoader />

      {/* Pinned Thin Indigo Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Sticky Navigation with in-memory dark/light mode toggle */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Back to top button (appears after scrolling > 400px) */}
      <BackToTop />

      {/* Quick Navigation Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
