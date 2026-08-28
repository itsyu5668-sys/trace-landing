import React, { useState } from 'react';
import { Star, Menu, X, Terminal, BookOpen, GitBranch } from 'lucide-react';

interface NavbarProps {
  onOpenDocs: () => void;
  onOpenChangelog: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDocs, onOpenChangelog, onShowToast }) => {
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(2842);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!starred) {
      setStarred(true);
      setStarCount((prev) => prev + 1);
      onShowToast('Starred trace/trace-cli on GitHub! ⭐', 'success');
    } else {
      setStarred(false);
      setStarCount((prev) => prev - 1);
      onShowToast('Unstarred trace/trace-cli', 'info');
    }
  };

  return (
    <nav
      id="main-navigation"
      aria-label="Main Navigation"
      className="fixed top-0 w-full z-40 bg-[#08090a]/85 backdrop-blur-md border-b border-[#23252a]"
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a
            id="brand-logo"
            href="#"
            className="text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            trace
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 items-center pt-0.5 text-sm font-medium">
            <a
              id="nav-link-how-it-works"
              href="#how-it-works"
              className="text-[#8a8f98] hover:text-white transition-colors duration-200"
            >
              How it works
            </a>
            <a
              id="nav-link-features"
              href="#features"
              className="text-[#8a8f98] hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              id="nav-link-pricing"
              href="#pricing"
              className="text-[#8a8f98] hover:text-white transition-colors duration-200"
            >
              Pricing
            </a>
            <button
              id="nav-link-docs"
              onClick={onOpenDocs}
              className="text-[#8a8f98] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Docs
            </button>
            <button
              id="nav-link-changelog"
              onClick={onOpenChangelog}
              className="text-[#8a8f98] hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <span>v1.2.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfed1a]"></span>
            </button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button
            id="btn-github-star"
            onClick={handleStarClick}
            className={`flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded border transition-all duration-200 cursor-pointer ${
              starred
                ? 'bg-[#161718] border-[#dfed1a] text-[#dfed1a] shadow-[0_0_12px_rgba(223,237,26,0.15)]'
                : 'bg-[#0f1011] border-[#23252a] text-[#ffffff] hover:border-[#383b3f] hover:bg-[#161718]'
            }`}
            title="Star on GitHub"
          >
            <Star
              className={`w-3.5 h-3.5 ${
                starred ? 'fill-[#dfed1a] text-[#dfed1a]' : 'text-[#8a8f98]'
              }`}
            />
            <span className="font-semibold">Star on GitHub</span>
            <span className="border-l border-[#23252a] pl-2 ml-0.5 text-[#8a8f98] text-[11px]">
              {starCount.toLocaleString()}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8a8f98] hover:text-white rounded border border-[#23252a] bg-[#0f1011]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-[#08090a] border-b border-[#23252a] flex flex-col gap-3 text-sm">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#8a8f98] hover:text-white py-1"
          >
            How it works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#8a8f98] hover:text-white py-1"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#8a8f98] hover:text-white py-1"
          >
            Pricing
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDocs();
            }}
            className="text-left text-[#8a8f98] hover:text-white py-1"
          >
            Documentation
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenChangelog();
            }}
            className="text-left text-[#8a8f98] hover:text-white py-1"
          >
            Changelog (v1.2.0)
          </button>
        </div>
      )}
    </nav>
  );
};
