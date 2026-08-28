import React, { useState } from 'react';
import { 
  Shield, 
  RotateCcw, 
  GitFork, 
  Terminal, 
  Cpu, 
  EyeOff, 
  Check, 
  ArrowRight,
  Code2,
  Sparkles,
  Search
} from 'lucide-react';

interface FeaturesBentoProps {
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({ onShowToast }) => {
  const [customSecret, setCustomSecret] = useState('OPENAI_KEY=sk-proj-8392198');
  const [selectedRuntime, setSelectedRuntime] = useState('node');

  const getRedacted = (input: string) => {
    return input.replace(/(=["']?)([^"'\s]+)(["']?)/g, '$1[REDACTED]$3');
  };

  return (
    <section
      id="features"
      className="flex flex-col gap-12 pt-16 border-t border-[#23252a]"
    >
      <div className="flex flex-col gap-3 text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Features built for agentic workflows
        </h2>
        <p className="text-sm sm:text-base text-[#8a8f98] max-w-xl">
          LLMs need context, but not noise. trace gives your AI exactly what it needs to fix the bug on the first try.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(200px,auto)]">
        {/* Feature 1: Crash detection (Span 8) */}
        <div
          id="feature-crash-detection"
          className="col-span-1 md:col-span-8 bg-[#0f1011] border border-[#23252a] rounded-lg p-6 flex flex-col justify-between overflow-hidden relative group hover:border-[#383b3f] transition-all text-left"
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">Crash detection</h3>
              <p className="text-sm text-[#8a8f98] max-w-md leading-relaxed">
                Instantly identifies unhandled exceptions, panics, and fatal errors across Node.js, Python, Go, and Rust.
              </p>
            </div>
            <span className="font-mono text-xs text-white bg-[#161718] border border-[#23252a] px-2 py-1 rounded">
              Free
            </span>
          </div>

          {/* Runtime support pill indicators */}
          <div className="z-10 mt-6 flex flex-wrap gap-2 text-xs font-mono">
            {['Node.js / Bun', 'Python / FastAPI', 'Go runtime', 'Rust / Tokio', 'C++ / Segfaults'].map((rt) => (
              <span
                key={rt}
                className="bg-[#161718] border border-[#23252a] text-[#8a8f98] px-2.5 py-1 rounded flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#27a644]"></span>
                {rt}
              </span>
            ))}
          </div>

          {/* Abstract visual background */}
          <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-t from-[#161718] to-transparent border-t border-l border-[#23252a] rounded-tl-xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 flex items-center justify-center pointer-events-none">
            <Search className="text-[#383b3f] w-16 h-16 stroke-1 opacity-50" />
          </div>
        </div>

        {/* Feature 2: Secret scrubbing (Span 4) */}
        <div
          id="feature-secret-scrubbing"
          className="col-span-1 md:col-span-4 bg-[#0f1011] border border-[#23252a] rounded-lg p-6 flex flex-col justify-between gap-3 relative hover:border-[#383b3f] transition-all text-left"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">Secret scrubbing</h3>
              <span className="font-mono text-xs text-white bg-[#161718] border border-[#23252a] px-2 py-1 rounded">
                Free
              </span>
            </div>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              Automatically redacts API keys, passwords, and tokens before hitting your clipboard.
            </p>
          </div>

          {/* Live secret scrubbing preview */}
          <div className="pt-2 flex flex-col gap-1.5 font-mono text-xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#eb5757] line-through truncate max-w-[140px]">DB_PASS="s3cr3t"</span>
              <span className="text-[#8a8f98]">→</span>
              <span className="text-[#27a644]">DB_PASS="[REDACTED]"</span>
            </div>
            <div className="text-[11px] text-[#62666d] flex items-center gap-1 mt-1">
              <Shield className="w-3 h-3 text-[#27a644]" />
              <span>Regex engine covers 40+ credential formats</span>
            </div>
          </div>
        </div>

        {/* Feature 3: One-paste handoff (Span 4) */}
        <div
          id="feature-one-paste-handoff"
          className="col-span-1 md:col-span-4 bg-[#0f1011] border border-[#23252a] rounded-lg p-6 flex flex-col justify-between gap-3 relative border-b-2 border-b-[#dfed1a]/50 hover:border-[#383b3f] hover:border-b-[#dfed1a] transition-all text-left"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">One-paste handoff</h3>
              <span className="font-mono text-xs text-white bg-[#161718] border border-[#23252a] px-2 py-1 rounded">
                Free
              </span>
            </div>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              Formats the trace perfectly for LLM context windows, including relevant surrounding code lines.
            </p>
          </div>

          <div className="font-mono text-xs text-[#d0d6e0] bg-[#08090a] p-2.5 rounded border border-[#23252a] flex items-center justify-between">
            <span className="text-[#dfed1a]">✦ Context Window Ready</span>
            <span className="text-[#8a8f98] text-[10px]">Zero fluff</span>
          </div>
        </div>

        {/* Feature 4: Git checkpoint (Span 4) */}
        <div
          id="feature-git-checkpoint"
          className="col-span-1 md:col-span-4 bg-[#161718] border border-[#23252a] rounded-lg p-6 flex flex-col justify-between gap-3 relative hover:border-[#383b3f] transition-all text-left"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">Git checkpoint</h3>
              <span className="font-mono text-xs text-[#dfed1a] bg-[#dfed1a]/10 border border-[#dfed1a]/20 px-2 py-1 rounded">
                Pro
              </span>
            </div>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              Automatically stashes your working directory state when an error occurs, so you can safely let an agent write fixes.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8a8f98] bg-[#08090a] p-2.5 rounded border border-[#23252a] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <GitFork className="w-3 h-3 text-[#dfed1a]" />
              <span>git stash create [trace-pre-fix]</span>
            </span>
          </div>
        </div>

        {/* Feature 5: Restart & verify (Span 4) */}
        <div
          id="feature-restart-verify"
          className="col-span-1 md:col-span-4 bg-[#161718] border border-[#23252a] rounded-lg p-6 flex flex-col justify-between gap-3 relative hover:border-[#383b3f] transition-all text-left"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">Restart & verify</h3>
              <span className="font-mono text-xs text-[#dfed1a] bg-[#dfed1a]/10 border border-[#dfed1a]/20 px-2 py-1 rounded">
                Pro
              </span>
            </div>
            <p className="text-sm text-[#8a8f98] leading-relaxed">
              Orchestrate the loop: Apply agent fix, restart the server, and verify if the crash happens again.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8a8f98] bg-[#08090a] p-2.5 rounded border border-[#23252a] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3 text-[#27a644]" />
              <span>Auto-restart on code change</span>
            </span>
            <span className="text-[#27a644] text-[10px]">Verified ✓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
