import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
  onOpenDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShowToast, onOpenDocs }) => {
  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'brew' | 'cargo'>('npm');
  const [copied, setCopied] = useState(false);

  const getInstallCmd = (pm: string) => {
    switch (pm) {
      case 'pnpm':
        return 'pnpm add -g trace-cli';
      case 'yarn':
        return 'yarn global add trace-cli';
      case 'brew':
        return 'brew install trace-cli';
      case 'cargo':
        return 'cargo install trace-cli';
      case 'npm':
      default:
        return 'npm install -g trace-cli';
    }
  };

  const currentCmd = getInstallCmd(pkgManager);

  const handleCopyInstall = () => {
    try {
      navigator.clipboard.writeText(currentCmd);
      setCopied(true);
      onShowToast(`Copied "${currentCmd}" to clipboard!`, 'copied');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      onShowToast(`Run: ${currentCmd}`, 'info');
    }
  };

  return (
    <section
      id="hero-section"
      className="relative pt-12 md:pt-16 flex flex-col items-center text-center"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl px-4">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Stop copy-pasting <br className="hidden sm:inline" />
          stack traces into your <br className="hidden sm:inline" />
          AI agent.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-[#8a8f98] max-w-2xl mb-10 leading-relaxed">
          trace watches your app, catches the crash, and puts the error straight on your clipboard
          — ready to paste into Claude Code, Cursor, or whatever you're already using.
        </p>

        {/* Action Group */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
          {/* Main Primary Button with subtle glow */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-[#dfed1a] rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
            <button
              id="btn-hero-install"
              onClick={handleCopyInstall}
              className="relative bg-[#dfed1a] hover:bg-white text-[#08090a] font-mono text-sm px-6 py-4 rounded-lg flex items-center gap-3 font-semibold w-full sm:w-auto transition-colors cursor-pointer shadow-lg active:scale-[0.99]"
              title="Click to copy install command"
            >
              <Terminal className="w-4 h-4 text-[#08090a]" />
              <span className="tracking-tight">{currentCmd}</span>
              <div className="border-l border-[#08090a]/20 pl-2 ml-1 flex items-center">
                {copied ? (
                  <Check className="w-4 h-4 text-[#27a644]" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </button>
          </div>

          {/* Secondary Link */}
          <a
            id="link-hero-github"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8a8f98] hover:text-white transition-colors flex items-center gap-1.5 group py-2"
          >
            <span>or view on GitHub</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Package manager pill selector */}
        <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-[#62666d]">
          <span>or switch to:</span>
          {(['npm', 'pnpm', 'yarn', 'brew', 'cargo'] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPkgManager(pm)}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                pkgManager === pm
                  ? 'text-[#dfed1a] bg-[#23252a] font-semibold'
                  : 'hover:text-[#8a8f98]'
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Interactive Visual Component */}
      <InteractiveTerminal onShowToast={onShowToast} />
    </section>
  );
};
