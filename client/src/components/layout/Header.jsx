import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '../../data/siteConfig.json';
import { trackEvent } from '../../lib/analytics';

function XpressionsLogo({ className = '' }) {
  return (
    <Link to="/" aria-label="Xpressions home" className={`flex items-center gap-3 ${className}`}>
      <img
        src="/assets/logo-xpressions.jpg"
        alt="Xpressions Festival Logo"
        className="h-10 w-10 sm:h-11 sm:w-11 rounded-md object-cover border border-paper/20 shadow-md"
      />
      <div className="flex flex-col">
        <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-paper uppercase leading-tight">
          Xpressions
        </span>
        <span className="text-[10px] font-heading font-semibold text-amber uppercase tracking-wider hidden sm:block">
          XIMB Flagship Fest
        </span>
      </div>
    </Link>
  );
}

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/competitions', label: 'Competitions' },
  { to: '/plan-your-visit', label: 'Plan Your Visit' },
  { to: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const focusable = menuRef.current?.querySelectorAll(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) focusable[0].focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  function handleRegisterClick(ctaId) {
    trackEvent('primary_cta_click', { cta_id: ctaId, page: location.pathname });
  }

  const headerBg = scrolled || menuOpen ? 'bg-navy/95 backdrop-blur-md shadow-lg border-b border-paper/10' : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`} role="banner">
      {/* Live Status Bar */}
      <div className="bg-navy/90 border-b border-paper/10 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex gap-4 items-center justify-center flex-wrap text-paper/70">
          <span>
            <strong className="text-amber font-semibold">Dates:</strong>{' '}
            {siteConfig.datesConfirmed && siteConfig.eventDates ? siteConfig.eventDates : 'Details to be announced'}
          </span>
          <span className="text-paper/30">|</span>
          <span>
            <strong className="text-amber font-semibold">Passes:</strong>{' '}
            {siteConfig.passesOpen && siteConfig.passUrl ? (
              <a href={siteConfig.passUrl} target="_blank" rel="noopener noreferrer" className="underline text-teal hover:text-teal/80">
                Open on Luma ↗
              </a>
            ) : (
              'Details to be announced'
            )}
          </span>
          <span className="text-paper/30">|</span>
          <span>
            <strong className="text-amber font-semibold">Events:</strong>{' '}
            {siteConfig.competitionRegistrationOpen ? 'Registration Open' : 'Details to be announced'}
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <XpressionsLogo />

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `font-body text-sm font-medium transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'text-amber border-amber font-semibold'
                      : 'text-paper/80 hover:text-paper border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <Link
              to="/express-interest"
              data-cta-id="header_register"
              onClick={() => handleRegisterClick('header_register')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md bg-teal text-white font-heading font-bold text-sm hover:bg-teal/90 active:scale-95 transition-all duration-200 min-h-[44px] shadow-sm"
            >
              Register Your Interest
            </Link>

            {/* Official College Crest */}
            <a
              href="https://www.ximb.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit XIM University Official Site"
              className="hidden md:flex items-center gap-2 pl-3 border-l border-paper/20 hover:opacity-90 transition-opacity"
              title="XIM University / XIMB"
            >
              <img
                src="/assets/college-logo.png"
                alt="XIM University Crest"
                className="h-9 sm:h-10 w-auto object-contain brightness-95"
              />
            </a>

            <button
              ref={triggerRef}
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 text-paper rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-navy/98 border-t border-paper/10 flex flex-col justify-between p-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 pt-2">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `font-heading font-bold text-2xl py-2 border-b border-paper/10 transition-colors ${
                      isActive ? 'text-amber' : 'text-paper hover:text-amber'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/express-interest"
                data-cta-id="mobile_menu_register"
                onClick={() => handleRegisterClick('mobile_menu_register')}
                className="mt-4 flex items-center justify-center px-6 py-3.5 rounded-md bg-teal text-white font-heading font-bold text-base min-h-[48px]"
              >
                Register Your Interest
              </Link>
            </nav>

            <div className="pt-6 border-t border-paper/10 text-xs text-paper/50 space-y-1">
              <p><strong className="text-paper/70">Dates:</strong> {siteConfig.datesConfirmed && siteConfig.eventDates ? siteConfig.eventDates : 'Details to be announced'}</p>
              <p><strong className="text-paper/70">Passes:</strong> {siteConfig.passesOpen ? 'Open' : 'Details to be announced'}</p>
              <p className="text-paper/40 italic mt-3">A {siteConfig.groupLabel} initiative. Upcoming edition details will be published once verified.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

