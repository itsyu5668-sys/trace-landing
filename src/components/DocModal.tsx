import React, { useState } from 'react';
import { X, Copy, Terminal, Check, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
}

export const DocModal: React.FC<DocModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'config' | 'agents' | 'cli'>('quickstart');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = (code: string, id: string) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedSection(id);
      onShowToast('Copied code snippet to clipboard!', 'copied');
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (e) {
      onShowToast('Code ready to copy', 'info');
    }
  };

  return (
    <div
      id="modal-documentation-overlay"
      className="fixed inset-0 z-50 bg-[#08090a]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="modal-documentation-dialog"
        className="bg-[#0f1011] border border-[#383b3f] rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#161718] border-b border-[#23252a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-base">Documentation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8a8f98] hover:text-white rounded hover:bg-[#23252a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#23252a] bg-[#0f1011] px-6 gap-2 text-xs font-mono">
          {[
            { id: 'quickstart', label: '1. Quickstart' },
            { id: 'cli', label: '2. CLI Commands' },
            { id: 'agents', label: '3. Agent Handoff' },
            { id: 'config', label: '4. .tracerc Config' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#dfed1a] text-[#dfed1a]'
                  : 'border-transparent text-[#8a8f98] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#d0d6e0] leading-relaxed">
          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-base">Instant Installation</h4>
              <p className="text-xs text-[#8a8f98]">
                Install globally via npm, pnpm, yarn, or Homebrew:
              </p>
              <div className="relative group bg-[#08090a] border border-[#23252a] p-3 rounded font-mono text-xs text-[#dfed1a] flex justify-between items-center">
                <code>npm install -g trace-cli</code>
                <button
                  onClick={() => copyCode('npm install -g trace-cli', 'qs-1')}
                  className="p-1 hover:text-white text-[#8a8f98] cursor-pointer"
                >
                  {copiedSection === 'qs-1' ? <Check className="w-3.5 h-3.5 text-[#27a644]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h4 className="text-white font-semibold text-base pt-2">Running trace</h4>
              <p className="text-xs text-[#8a8f98]">
                Simply wrap whatever command starts your dev server or backend:
              </p>
              <div className="relative group bg-[#08090a] border border-[#23252a] p-3 rounded font-mono text-xs text-[#e5e5e6] flex justify-between items-center">
                <code>trace npm run dev</code>
                <button
                  onClick={() => copyCode('trace npm run dev', 'qs-2')}
                  className="p-1 hover:text-white text-[#8a8f98] cursor-pointer"
                >
                  {copiedSection === 'qs-2' ? <Check className="w-3.5 h-3.5 text-[#27a644]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-[#8a8f98]">
                Whenever an exception or fatal crash occurs, trace automatically captures the callstack, reads surrounding source lines, redacts all secrets, and places the formatted payload on your system clipboard with a desktop chime.
              </p>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded bg-[#08090a] border border-[#23252a]">
                <div className="text-[#dfed1a] font-bold">trace watch &lt;path&gt;</div>
                <div className="text-[#8a8f98] mt-1">Watches directory processes and hooks stdout/stderr for crash signatures.</div>
              </div>
              <div className="p-3 rounded bg-[#08090a] border border-[#23252a]">
                <div className="text-[#dfed1a] font-bold">trace run -- &lt;cmd&gt;</div>
                <div className="text-[#8a8f98] mt-1">Spawns a single sub-process, intercepting fatal panics and unhandled rejections.</div>
              </div>
              <div className="p-3 rounded bg-[#08090a] border border-[#23252a]">
                <div className="text-[#dfed1a] font-bold">trace test-crash</div>
                <div className="text-[#8a8f98] mt-1">Triggers a harmless simulated exception to verify clipboard & redaction pipeline.</div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-4 text-xs">
              <h4 className="text-white font-semibold text-sm">Supported AI Agents & IDEs</h4>
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="bg-[#08090a] p-3 rounded border border-[#23252a]">
                  <span className="text-[#dfed1a] font-bold">Claude Code</span>
                  <p className="text-[#8a8f98] mt-1">CMD+V directly into your terminal prompt.</p>
                </div>
                <div className="bg-[#08090a] p-3 rounded border border-[#23252a]">
                  <span className="text-[#dfed1a] font-bold">Cursor / Composer</span>
                  <p className="text-[#8a8f98] mt-1">Paste into Cmd+I / Cmd+K chat window.</p>
                </div>
                <div className="bg-[#08090a] p-3 rounded border border-[#23252a]">
                  <span className="text-[#dfed1a] font-bold">Windsurf / Cascade</span>
                  <p className="text-[#8a8f98] mt-1">Paste into agent context buffer.</p>
                </div>
                <div className="bg-[#08090a] p-3 rounded border border-[#23252a]">
                  <span className="text-[#dfed1a] font-bold">Copilot Workspace</span>
                  <p className="text-[#8a8f98] mt-1">Paste into repair prompt.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm">Optional `.tracerc.json` in Project Root</h4>
              <pre className="p-3 rounded bg-[#08090a] border border-[#23252a] font-mono text-xs text-[#d0d6e0] leading-relaxed">
{`{
  "clipboard": true,
  "soundNotification": true,
  "contextLines": 4,
  "redactRules": [
    "KEY_.*",
    "SECRET_.*",
    "TOKEN_.*"
  ],
  "ignorePatterns": [
    "node_modules/webpack/hot/*"
  ]
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#161718] border-t border-[#23252a] px-6 py-3 flex justify-between items-center">
          <span className="text-xs text-[#8a8f98] font-mono">trace-cli v1.2.0</span>
          <button
            onClick={onClose}
            className="bg-[#dfed1a] hover:bg-white text-[#08090a] text-xs font-mono font-semibold px-4 py-1.5 rounded transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
