import React from 'react';
import { X, Sparkles, GitCommit, Check } from 'lucide-react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-changelog-overlay"
      className="fixed inset-0 z-50 bg-[#08090a]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="modal-changelog-dialog"
        className="bg-[#0f1011] border border-[#383b3f] rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#161718] border-b border-[#23252a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-base">Changelog</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8a8f98] hover:text-white rounded hover:bg-[#23252a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#d0d6e0]">
          {/* v1.2.0 */}
          <div className="border-b border-[#23252a] pb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#dfed1a] bg-[#dfed1a]/10 px-2 py-0.5 rounded border border-[#dfed1a]/20">
                v1.2.0 (Current)
              </span>
              <span className="text-xs text-[#8a8f98] font-mono">Today</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#8a8f98] pt-1">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#27a644] shrink-0 mt-0.5" />
                <span>Added AST-based surrounding code extraction (4 context lines before/after crash point).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#27a644] shrink-0 mt-0.5" />
                <span>Rust Tokio runtime panic interception & demangled symbol backtrace support.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#27a644] shrink-0 mt-0.5" />
                <span>Support for Claude Code CLI terminal direct-paste buffer.</span>
              </li>
            </ul>
          </div>

          {/* v1.1.0 */}
          <div className="border-b border-[#23252a] pb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-white bg-[#161718] px-2 py-0.5 rounded border border-[#23252a]">
                v1.1.0
              </span>
              <span className="text-xs text-[#8a8f98] font-mono">Last week</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#8a8f98] pt-1">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#27a644] shrink-0 mt-0.5" />
                <span>Expanded automated secret redactor with 40+ API key signatures (OpenAI, Stripe, AWS, JWT, GCP).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#27a644] shrink-0 mt-0.5" />
                <span>Go panic recovery and stack unwinder improvements.</span>
              </li>
            </ul>
          </div>

          {/* v1.0.0 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-white bg-[#161718] px-2 py-0.5 rounded border border-[#23252a]">
                v1.0.0 (Initial Release)
              </span>
              <span className="text-xs text-[#8a8f98] font-mono">Launch</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#8a8f98] pt-1">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#27a644] shrink-0 mt-0.5" />
                <span>First public release of trace CLI for Node.js and Python.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
