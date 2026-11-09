import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../../data/siteConfig.json';
import { trackEvent } from '../../lib/analytics';

export function HeroContent() {
  const handlePrimaryClick = () => {
    trackEvent('primary_cta_click', { cta_id: 'hero_register', page: '/' });
  };

  const handleSecondaryClick = () => {
    trackEvent('explore_competitions_click', { page: '/' });
  };

  return (
    <div className="space-y-6 text-center max-w-4xl mx-auto px-4 py-8">
      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper/5 border border-paper/10 text-xs text-amber font-heading font-semibold uppercase tracking-wider backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-amber animate-pulse" aria-hidden="true" />
        <span>A {siteConfig.groupLabel} initiative</span>
        <span className="text-paper/40">|</span>
        <span className="text-paper/70 normal-case font-body">Upcoming edition details will be published once verified</span>
      </div>

      {/* Main Big Display Tagline */}
      <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-paper leading-[1.05]">
        Find your stage at <span className="text-teal">Xpressions.</span>
      </h1>

      {/* Supporting copy */}
      <p className="text-base sm:text-xl text-paper/80 font-body max-w-2xl mx-auto leading-relaxed">
        The flagship management-cultural fest of Xavier Institute of Management (XIMB), XIM University, Bhubaneswar.
      </p>

      {/* Primary & Secondary Action CTAs */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/express-interest"
          data-cta-id="hero_register"
          onClick={handlePrimaryClick}
          className="w-full sm:w-auto px-8 py-4 rounded-md bg-teal text-white font-heading font-bold text-base hover:bg-teal/90 active:scale-95 transition-all shadow-xl shadow-teal/25 min-h-[50px] flex items-center justify-center gap-2"
        >
          <span>Register Your Interest</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>

        <Link
          to="/competitions"
          data-cta-id="hero_explore"
          onClick={handleSecondaryClick}
          className="w-full sm:w-auto px-7 py-4 rounded-md border-2 border-amber text-amber font-heading font-bold text-base hover:bg-amber hover:text-navy active:scale-95 transition-all min-h-[50px] flex items-center justify-center"
        >
          Explore Competitions
        </Link>
      </div>

      {/* Mandatory Non-binding Disclaimer */}
      <p className="text-xs text-paper/50 max-w-lg mx-auto font-body italic pt-2">
        This is a student-project expression of interest. It does not reserve a pass or register you for a competition.
      </p>
    </div>
  );
}

export default function HeroFallback() {
  return (
    <div
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-navy overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 35%, rgba(185, 28, 28, 0.28) 0%, rgba(7, 9, 14, 0.86) 60%, #07090E 100%), url('/assets/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Festival hero showcase"
    >
      {/* Subtle dark tint */}
      <div className="absolute inset-0 bg-navy/60 pointer-events-none" aria-hidden="true" />

      {/* Decorative CSS X motif spotlight beams */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25" aria-hidden="true">
        <div className="relative w-72 sm:w-96 h-72 sm:h-96 x-motif-pulse">
          <div
            className="absolute top-1/2 left-0 right-0 h-16 sm:h-20 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, #B91C1C, transparent)',
              transform: 'translateY(-50%) rotate(-45deg)',
            }}
          />
          <div
            className="absolute top-1/2 left-0 right-0 h-16 sm:h-20 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, transparent, #B91C1C, transparent)',
              transform: 'translateY(-50%) rotate(45deg)',
            }}
          />
        </div>
      </div>

      {/* Static Spotlight Glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-12 left-1/4 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #B91C1C, transparent 70%)' }} />
        <div className="absolute bottom-12 right-1/4 w-72 h-72 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #F5B544, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full pt-16 pb-12 sm:pt-20">
        <HeroContent />
      </div>
    </div>
  );
}

