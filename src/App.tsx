import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesBento } from './components/FeaturesBento';
import { Pricing } from './components/Pricing';
import { BottomCta } from './components/BottomCta';
import { Footer } from './components/Footer';
import { DocModal } from './components/DocModal';
import { ChangelogModal } from './components/ChangelogModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Toast } from './components/Toast';
import { ToastMessage } from './types';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const addToast = (text: string, type: 'success' | 'info' | 'copied' = 'copied') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-[#08090a] min-h-screen selection:bg-[#dfed1a] selection:text-[#08090a] flex flex-col items-center text-white relative font-sans">
      {/* Top Fixed Navbar */}
      <Navbar
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenChangelog={() => setIsChangelogOpen(true)}
        onShowToast={addToast}
      />

      {/* Main Content Area matching max-w-[1200px] */}
      <main className="w-full max-w-[1200px] mx-auto px-6 pt-28 pb-24 flex flex-col gap-24">
        {/* Hero Section */}
        <Hero
          onShowToast={addToast}
          onOpenDocs={() => setIsDocsOpen(true)}
        />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Features Bento Grid */}
        <FeaturesBento onShowToast={addToast} />

        {/* Pricing Section */}
        <Pricing onShowToast={addToast} />

        {/* Bottom CTA */}
        <BottomCta onShowToast={addToast} />
      </main>

      {/* Footer */}
      <Footer
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenChangelog={() => setIsChangelogOpen(true)}
      />

      {/* Modals & Overlays */}
      <DocModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        onShowToast={addToast}
      />

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Floating Notifications Toast */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
