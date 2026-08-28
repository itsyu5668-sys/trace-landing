import React from 'react';
import { Check, Clipboard, Sparkles } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          onClick={() => onDismiss(toast.id)}
          className="pointer-events-auto flex items-center gap-3 bg-[#161718] border border-[#383b3f] text-[#e5e5e6] px-4 py-3 rounded-lg shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
        >
          {toast.type === 'copied' && (
            <div className="w-6 h-6 rounded-full bg-[#dfed1a]/20 border border-[#dfed1a]/40 flex items-center justify-center text-[#dfed1a]">
              <Clipboard className="w-3.5 h-3.5" />
            </div>
          )}
          {toast.type === 'success' && (
            <div className="w-6 h-6 rounded-full bg-[#27a644]/20 border border-[#27a644]/40 flex items-center justify-center text-[#27a644]">
              <Check className="w-3.5 h-3.5" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="w-6 h-6 rounded-full bg-[#dfed1a]/20 border border-[#dfed1a]/40 flex items-center justify-center text-[#dfed1a]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          )}
          <span className="text-sm font-medium font-mono text-[#ffffff]">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
