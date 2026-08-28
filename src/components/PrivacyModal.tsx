import React from 'react';
import { X, ShieldCheck, Lock, HardDrive, CheckCircle } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-privacy-overlay"
      className="fixed inset-0 z-50 bg-[#08090a]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="modal-privacy-dialog"
        className="bg-[#0f1011] border border-[#383b3f] rounded-xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#161718] border-b border-[#23252a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#27a644]" />
            <h3 className="font-semibold text-white text-base">Privacy & Secret Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8a8f98] hover:text-white rounded hover:bg-[#23252a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#d0d6e0] leading-relaxed">
          <div className="flex items-start gap-3 bg-[#08090a] p-3.5 rounded border border-[#23252a]">
            <HardDrive className="w-4 h-4 text-[#dfed1a] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">100% Local Execution</strong>
              <p className="text-[#8a8f98]">
                trace-cli runs strictly on your machine. It has zero network phone-home endpoints, telemetry beacons, or external databases. Your code and error traces never leave your localhost.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#08090a] p-3.5 rounded border border-[#23252a]">
            <Lock className="w-4 h-4 text-[#27a644] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">Client-Side Secret Redaction</strong>
              <p className="text-[#8a8f98]">
                Before any trace touches your clipboard, trace’s AST scanner filters out environment variables matching common secret patterns (JWTs, DB connection strings, AWS keys, Stripe keys, GitHub tokens).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#08090a] p-3.5 rounded border border-[#23252a]">
            <CheckCircle className="w-4 h-4 text-[#dfed1a] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">Open Source & Auditable</strong>
              <p className="text-[#8a8f98]">
                Every line of the CLI source code is open and verifiable on GitHub under the MIT license.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#161718] border-t border-[#23252a] px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#23252a] hover:bg-[#383b3f] text-white text-xs font-mono px-4 py-1.5 rounded transition-colors cursor-pointer border border-[#383b3f]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
