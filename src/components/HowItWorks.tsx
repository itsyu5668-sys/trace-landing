import React from 'react';
import { Play, Sparkles, ClipboardCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="flex flex-col gap-12 pt-16 border-t border-[#23252a]"
    >
      <div className="flex flex-col gap-3 text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">How it works</h2>
        <p className="text-sm sm:text-base text-[#8a8f98] max-w-xl">
          Zero configuration required. Just run trace alongside your development server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div
          id="how-it-works-step-1"
          className="bg-[#0f1011] border border-[#23252a] p-6 rounded-lg flex flex-col gap-4 hover:border-[#383b3f] transition-all duration-200 group text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#161718] border border-[#23252a] flex items-center justify-center font-mono text-sm text-white group-hover:border-[#383b3f] transition-colors">
            1
          </div>
          <h3 className="text-lg font-semibold text-white">Run your app</h3>
          <p className="text-sm text-[#8a8f98] leading-relaxed">
            Prefix your usual dev command with trace, or run it standalone to watch your terminal output.
          </p>
          <div className="mt-auto pt-2 font-mono text-xs text-[#62666d] bg-[#08090a] px-3 py-2 rounded border border-[#23252a]/60">
            $ trace npm run dev
          </div>
        </div>

        {/* Step 2 */}
        <div
          id="how-it-works-step-2"
          className="bg-[#0f1011] border border-[#23252a] p-6 rounded-lg flex flex-col gap-4 hover:border-[#383b3f] transition-all duration-200 relative overflow-hidden group text-left"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#eb5757]/5 blur-3xl rounded-full pointer-events-none"></div>
          <div className="w-10 h-10 rounded-full bg-[#161718] border border-[#23252a] flex items-center justify-center font-mono text-sm text-white relative z-10 group-hover:border-[#eb5757]/40 transition-colors">
            2
          </div>
          <h3 className="text-lg font-semibold text-white relative z-10">It catches the crash</h3>
          <p className="text-sm text-[#8a8f98] leading-relaxed relative z-10">
            When an error is thrown, trace intercepts it, cleans up the noise, and removes sensitive environment variables.
          </p>
          <div className="mt-auto pt-2 font-mono text-xs text-[#eb5757] bg-[#eb5757]/5 px-3 py-2 rounded border border-[#eb5757]/20 flex items-center justify-between">
            <span>● Intercepted</span>
            <span className="text-[#8a8f98] text-[10px]">Zero overhead</span>
          </div>
        </div>

        {/* Step 3 */}
        <div
          id="how-it-works-step-3"
          className="bg-[#0f1011] border border-[#23252a] p-6 rounded-lg flex flex-col gap-4 border-l-2 border-l-[#dfed1a]/50 hover:border-l-[#dfed1a] transition-all duration-200 relative overflow-hidden group text-left"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#dfed1a]/5 blur-3xl rounded-full pointer-events-none"></div>
          <div className="w-10 h-10 rounded-full bg-[#dfed1a]/10 border border-[#dfed1a]/30 flex items-center justify-center font-mono text-sm text-[#dfed1a] relative z-10">
            3
          </div>
          <h3 className="text-lg font-semibold text-white relative z-10">Paste it into your agent</h3>
          <p className="text-sm text-[#8a8f98] leading-relaxed relative z-10">
            The clean, contextualized stack trace is already on your clipboard. Just CMD+V into Cursor or Claude Code.
          </p>
          <div className="mt-auto pt-2 font-mono text-xs text-[#dfed1a] bg-[#dfed1a]/5 px-3 py-2 rounded border border-[#dfed1a]/20 flex items-center justify-between">
            <span>⌘V in Claude / Cursor</span>
            <span className="text-[#27a644] text-[10px]">Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};
