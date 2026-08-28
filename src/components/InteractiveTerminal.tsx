import React, { useState } from 'react';
import { CheckCircle2, Copy, AlertTriangle } from 'lucide-react';
import { CRASH_SCENARIOS } from '../data/scenarios';
import { RuntimeType } from '../types';

interface TerminalProps {
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ onShowToast }) => {
  const [activeRuntime, setActiveRuntime] = useState<RuntimeType>('node');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const scenario = CRASH_SCENARIOS[activeRuntime];

  const handleCopyPacket = () => {
    try {
      navigator.clipboard.writeText(scenario.llmPacket);
      setCopiedSuccess(true);
      onShowToast('Copied LLM-ready stack trace to clipboard!', 'copied');
      setTimeout(() => setCopiedSuccess(false), 2000);
    } catch (e) {
      onShowToast('Failed to copy to clipboard', 'info');
    }
  };

  return (
    <div className="w-full max-w-4xl mt-12 relative z-10 flex flex-col gap-3">
      {/* Runtime Switcher */}
      <div className="flex items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-1.5 bg-[#0f1011] p-1 rounded-lg border border-[#23252a]">
          {(['node', 'python', 'go', 'rust'] as RuntimeType[]).map((rt) => (
            <button
              key={rt}
              id={`tab-runtime-${rt}`}
              onClick={() => setActiveRuntime(rt)}
              className={`px-3 py-1.5 rounded text-xs transition-all duration-150 cursor-pointer ${
                activeRuntime === rt
                  ? 'bg-[#23252a] text-[#ffffff] font-semibold border border-[#383b3f] shadow-sm'
                  : 'text-[#8a8f98] hover:text-[#ffffff] hover:bg-[#161718]'
              }`}
            >
              {rt === 'node' && 'Node.js'}
              {rt === 'python' && 'Python'}
              {rt === 'go' && 'Go'}
              {rt === 'rust' && 'Rust'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Terminal Window Frame */}
      <div className="w-full rounded-lg border border-[#23252a] bg-[#0f1011] shadow-2xl overflow-hidden text-left transition-all duration-300">
        {/* Terminal Header */}
        <div className="bg-[#161718] border-b border-[#23252a] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#eb5757]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#e4f222]/80"></div>
              <div className="w-3 h-3 rounded-full bg-[#27a644]/80"></div>
            </div>
            <span className="text-[11px] text-[#62666d] ml-2 hidden sm:inline">
              PID 48219 • trace-agent
            </span>
          </div>

          <div className="text-xs text-[#8a8f98]">bash - trace-cli ~ watch</div>

          <div className="w-8"></div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 text-sm text-[#e5e5e6] leading-relaxed min-h-[260px] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {/* Command Line */}
            <div className="flex items-center flex-wrap">
              <span className="text-[#27a644] mr-2 font-bold">➜</span>
              <span className="text-[#dfed1a] font-bold">trace</span>
              <span className="ml-2 text-[#8a8f98]">{scenario.command.replace('trace ', '')}</span>
            </div>

            {/* Error Container */}
            <div className="mt-3 border-l-2 border-[#eb5757] pl-4 py-2 bg-[#eb5757]/5 rounded-r">
              <div className="text-[#eb5757] font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{scenario.errorTitle}</span>
              </div>
              <div className="text-[#ffffff] font-medium mt-1 break-words">
                {scenario.errorMessage}
              </div>
              <div className="text-[#8a8f98] mt-1.5 text-xs whitespace-pre-line leading-normal">
                {scenario.errorLocation}
              </div>
            </div>

            {/* Scrubbing & Auto-copy feedback */}
            <div className="mt-3 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 text-[#8a8f98]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#27a644]" />
                <span>Scrubbing secrets and environment variables...</span>
                <span className="text-[10px] text-[#27a644] bg-[#27a644]/10 px-1.5 py-0.5 rounded border border-[#27a644]/20">
                  2 tokens redacted
                </span>
              </div>

              <div className="flex items-center justify-between text-[#ffffff] font-bold mt-1 bg-[#dfed1a]/10 border border-[#dfed1a]/20 px-3 py-2 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-[#dfed1a]">Stack trace copied to clipboard</span>
                </div>
                <button
                  id="btn-copy-terminal-output"
                  onClick={handleCopyPacket}
                  className="text-[11px] text-[#08090a] bg-[#dfed1a] hover:bg-white px-2.5 py-1 rounded font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3 text-[#08090a]" />
                  <span>{copiedSuccess ? 'Copied!' : 'Copy to clipboard'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Footer Quick Bar */}
          <div className="pt-4 mt-4 border-t border-[#23252a] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#62666d]">
            <div className="flex items-center gap-3">
              <span>Clipboard hook: <strong className="text-[#8a8f98]">Active (CMD+V ready)</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Target IDEs: <strong className="text-[#8a8f98]">Cursor, Claude Code, Windsurf, Copilot</strong></span>
            </div>
            <div className="text-[#8a8f98]">
              Ready to paste into chat prompt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

