import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';

export default function ClosingCTA() {
  const handleRegisterClick = () => {
    trackEvent('primary_cta_click', { cta_id: 'banner_register', page: '/' });
  };

  const handleExploreClick = () => {
    trackEvent('explore_competitions_click', { page: '/' });
  };

  return (
    <section
      className="py-24 bg-navy relative overflow-hidden border-t border-paper/10"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #172a44 0%, #101827 75%)',
      }}
      aria-label="Join the festival journey"
    >
      {/* Decorative spotlight beam crossing */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10" aria-hidden="true">
        <div className="relative w-96 h-96">
          <div className="absolute top-1/2 left-0 right-0 h-24 bg-teal rounded-full -translate-y-1/2 rotate-45 blur-2xl" />
          <div className="absolute top-1/2 left-0 right-0 h-24 bg-amber rounded-full -translate-y-1/2 -rotate-45 blur-2xl" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <span className="text-xs uppercase font-heading font-bold tracking-widest text-amber">
          Be The First To Know
        </span>

        <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-paper tracking-tight leading-tight">
          Ready to step onto <span className="text-teal">your stage?</span>
        </h2>

        <p className="text-base sm:text-lg text-paper/80 font-body max-w-2xl mx-auto leading-relaxed">
          Sign up to receive early alerts when official passes release on Luma and competition registrations go live on Unstop.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/express-interest"
            data-cta-id="banner_register"
            onClick={handleRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-teal text-white font-heading font-bold text-base hover:bg-teal/90 active:scale-95 transition-all shadow-xl shadow-teal/20 min-h-[50px] flex items-center justify-center gap-2"
          >
            <span>Register Your Interest</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>

          <Link
            to="/competitions"
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-7 py-4 rounded-md border-2 border-paper/30 text-paper font-heading font-bold text-base hover:bg-paper/10 min-h-[50px] flex items-center justify-center"
          >
            Explore Events List
          </Link>
        </div>

        <p className="text-xs text-paper/50 max-w-md mx-auto font-body italic pt-2">
          This is a student-project expression of interest. It does not reserve a pass or register you for a competition.
        </p>
      </div>
    </section>
  );
}

