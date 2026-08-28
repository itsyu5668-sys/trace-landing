import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface BottomCtaProps {
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
}

export const BottomCta: React.FC<BottomCtaProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText('npm install -g trace-cli');
      setCopied(true);
      onShowToast('Copied "npm install -g trace-cli" to clipboard!', 'copied');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      onShowToast('Run: npm install -g trace-cli', 'info');
    }
  };

  return (
    <section
      id="bottom-cta"
      className="flex flex-col items-center gap-8 py-20 border-t border-[#23252a] mt-12 text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        Stop the copy-paste loop.
      </h2>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-[#dfed1a] rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
        <button
          id="btn-bottom-install"
          onClick={handleCopy}
          className="relative bg-[#dfed1a] hover:bg-white text-[#08090a] font-mono text-sm sm:text-base px-8 py-4 rounded-lg flex items-center gap-3 font-semibold transition-colors cursor-pointer shadow-xl active:scale-[0.99]"
        >
          <Terminal className="w-4 h-4 text-[#08090a]" />
          <span>npm install -g trace-cli</span>
          <div className="border-l border-[#08090a]/20 pl-2 ml-1">
            {copied ? <Check className="w-4 h-4 text-[#27a644]" /> : <Copy className="w-4 h-4 opacity-70" />}
          </div>
        </button>
      </div>

      <p className="text-xs text-[#8a8f98] font-mono">
        Open source • Zero cloud transmission • Runs 100% locally
      </p>
    </section>
  );
};
