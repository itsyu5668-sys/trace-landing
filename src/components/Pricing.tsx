import React, { useState } from 'react';
import { Check, Plus, Terminal } from 'lucide-react';
import { subscribeEmail } from '../lib/supabase';

interface PricingProps {
  onShowToast: (text: string, type?: 'success' | 'info' | 'copied') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedFree, setCopiedFree] = useState(false);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid developer email', 'info');
      return;
    }
    setSubmitting(true);
    const result = await subscribeEmail(email.trim().toLowerCase());
    setSubmitting(false);
    if (result.ok) {
      setIsSubscribed(true);
      onShowToast(
        `You're on the Pro waitlist! We'll email ${email} when early access opens.`,
        'success',
      );
    } else {
      onShowToast(`Couldn't save your email right now. Please try again later.`, 'info');
    }
  };

  const handleFreeCopy = () => {
    try {
      navigator.clipboard.writeText('npm install -g trace-cli');
      setCopiedFree(true);
      onShowToast('Copied "npm install -g trace-cli" to clipboard!', 'copied');
      setTimeout(() => setCopiedFree(false), 2000);
    } catch (e) {
      onShowToast('Run: npm install -g trace-cli', 'info');
    }
  };

  return (
    <section
      id="pricing"
      className="flex flex-col items-center gap-12 pt-16 border-t border-[#23252a]"
    >
      <div className="text-center flex flex-col gap-3 items-center max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Pricing</h2>
        <p className="text-sm sm:text-base text-[#8a8f98]">
          Start speeding up your workflow today. Upgrade when you need more power.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Free Tier */}
        <div
          id="pricing-card-free"
          className="bg-[#0f1011] border border-[#23252a] rounded-lg p-8 flex flex-col gap-6 text-left hover:border-[#383b3f] transition-all"
        >
          <div>
            <h3 className="text-2xl font-bold text-white">Free</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">$0</span>
              <span className="text-sm text-[#8a8f98]">/forever</span>
            </div>
          </div>

          <p className="text-sm text-[#8a8f98] border-b border-[#23252a] pb-6 leading-relaxed">
            Everything you need to stop copy-pasting stack traces manually.
          </p>

          <ul className="flex flex-col gap-3 text-sm text-[#e5e5e6] flex-grow">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#27a644] shrink-0" />
              <span>Local crash detection</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#27a644] shrink-0" />
              <span>Secret scrubbing</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#27a644] shrink-0" />
              <span>Auto-copy to clipboard</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#27a644] shrink-0" />
              <span>Support for Node, Python, Go, Rust</span>
            </li>
          </ul>

          <button
            id="btn-pricing-free-install"
            onClick={handleFreeCopy}
            className="w-full bg-[#08090a] border border-[#23252a] text-white font-mono text-sm py-3 px-4 rounded hover:border-[#383b3f] hover:bg-[#161718] transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#8a8f98]" />
            <span>{copiedFree ? 'Copied to Clipboard!' : 'npm install -g trace-cli'}</span>
          </button>
        </div>

        {/* Pro Tier */}
        <div
          id="pricing-card-pro"
          className="bg-[#161718] border border-[#23252a] rounded-lg p-8 flex flex-col gap-6 relative overflow-hidden text-left hover:border-[#383b3f] transition-all"
        >
          {/* Coming Soon Ribbon */}
          <div className="absolute top-4 right-[-32px] bg-[#dfed1a] text-[#08090a] font-mono text-[11px] py-1 px-10 rotate-45 font-bold shadow-lg tracking-wider">
            COMING SOON
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">Pro</h3>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-bold text-white opacity-50 tracking-tight">$10</span>
              <span className="text-sm text-[#8a8f98]">/mo</span>
            </div>
          </div>

          <p className="text-sm text-[#8a8f98] border-b border-[#23252a] pb-6 leading-relaxed">
            Advanced workflow orchestration for heavy AI agent users.
          </p>

          <ul className="flex flex-col gap-3 text-sm text-[#e5e5e6] opacity-75 flex-grow">
            <li className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#8a8f98] shrink-0" />
              <span>Everything in Free</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#8a8f98] shrink-0" />
              <span>Git auto-checkpoints before agent edits</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#8a8f98] shrink-0" />
              <span>Restart & verify self-healing loop</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#8a8f98] shrink-0" />
              <span>Custom redaction & AST rule filters</span>
            </li>
          </ul>

          {/* Waitlist Form */}
          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="notify-email" className="sr-only">
              Email for waitlist
            </label>
            {isSubscribed ? (
              <div className="bg-[#dfed1a]/10 border border-[#dfed1a]/30 p-3 rounded text-center text-xs font-mono text-[#dfed1a]">
                ✓ You're on the early access list! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="flex bg-[#08090a] border border-[#23252a] rounded overflow-hidden p-1 focus-within:border-[#383b3f] transition-colors">
                <input
                  type="email"
                  id="notify-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for early access"
                  className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder:text-[#8a8f98] px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  id="btn-waitlist-submit"
                  disabled={submitting}
                  className="bg-[#0f1011] text-white font-mono text-xs px-4 py-2 rounded hover:bg-[#383b3f] transition-colors whitespace-nowrap border border-[#23252a] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving…' : 'Notify me'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
