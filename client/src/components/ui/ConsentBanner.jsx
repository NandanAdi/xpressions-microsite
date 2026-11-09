import React, { useState, useEffect, useRef } from 'react';
import { getConsent, setConsent, loadGA } from '../../lib/analytics';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  const acceptRef = useRef(null);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      const timer = setTimeout(() => {
        setShow(true);
        setTimeout(() => acceptRef.current?.focus(), 150);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (existing === 'granted') {
      loadGA();
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    loadGA();
    setShow(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label="Analytics Consent"
      aria-live="polite"
      className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-navy/98 border border-paper/20 rounded-xl p-4 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-teal/20 text-teal flex-shrink-0" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-paper/90 leading-relaxed font-body">
            We use privacy-friendly analytics to evaluate campaign traffic for this university marketing assignment. No personally identifiable data is sent to analytics.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              ref={acceptRef}
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-md bg-teal text-white font-heading font-bold text-xs hover:bg-teal/90 min-h-[38px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Accept Analytics
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-md border border-paper/20 text-paper/70 font-heading font-medium text-xs hover:bg-paper/5 min-h-[38px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

