import React from 'react';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenPrivacy: () => void;
  onOpenChangelog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenPrivacy, onOpenChangelog }) => {
  return (
    <footer className="w-full py-16 bg-[#08090a] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start px-6 gap-8 text-left">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-white">trace</span>
          </div>
          <p className="text-sm text-[#8a8f98]">© 2024 trace. Built for the agentic era.</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs text-[#62666d]">
          <button
            id="footer-link-docs"
            onClick={onOpenDocs}
            className="hover:text-[#dfed1a] transition-colors cursor-pointer"
          >
            Documentation
          </button>
          <button
            id="footer-link-privacy"
            onClick={onOpenPrivacy}
            className="hover:text-[#dfed1a] transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <button
            id="footer-link-terms"
            onClick={onOpenPrivacy}
            className="hover:text-[#dfed1a] transition-colors cursor-pointer"
          >
            Terms
          </button>
          <button
            id="footer-link-changelog"
            onClick={onOpenChangelog}
            className="hover:text-[#dfed1a] transition-colors cursor-pointer"
          >
            Changelog
          </button>
          <a
            id="footer-link-github"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#dfed1a] transition-colors"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </footer>
  );
};
