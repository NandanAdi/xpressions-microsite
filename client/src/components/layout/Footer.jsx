import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../../data/siteConfig.json';
import { trackEvent } from '../../lib/analytics';

function SocialIcon({ href, label, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 text-paper/70 hover:text-teal transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-paper/5"
      onClick={() => trackEvent('outbound_click', { url: href, label })}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-paper/10 pt-16 pb-12 text-paper/80" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-paper/10">
          {/* Brand & Status Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-flex items-center gap-2.5 font-heading font-black text-2xl tracking-tight text-paper uppercase">
                <img
                  src="/assets/logo-xpressions.jpg"
                  alt="Xpressions Festival Logo"
                  className="h-10 w-10 rounded-md object-cover border border-paper/20 shadow-md"
                />
                <span>Xpressions</span>
              </Link>
              <a
                href="https://www.ximb.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="XIM University / XIMB"
                className="pl-3 border-l border-paper/20 hover:opacity-90 transition-opacity"
              >
                <img
                  src="/assets/college-logo.png"
                  alt="XIM University Crest"
                  className="h-9 w-auto object-contain brightness-90"
                />
              </a>
            </div>
            <p className="text-sm text-paper/70 leading-relaxed font-body">
              The flagship annual management-cultural festival of Xavier Institute of Management (XIMB), XIM University, Bhubaneswar.
            </p>
            <div className="p-3.5 rounded-lg bg-paper/5 border border-paper/10 text-xs text-paper/60 space-y-1.5">
              <p className="font-semibold text-amber">
                A {siteConfig.groupLabel} initiative.
              </p>
              <p>
                Upcoming edition details will be published once verified.
              </p>
              <p className="text-paper/40 text-[11px]">
                Content verified: {siteConfig.lastChecked}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-paper/50 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 font-body text-sm">
              <li>
                <Link to="/" className="text-paper/70 hover:text-amber transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/experience" className="text-paper/70 hover:text-amber transition-colors">Experience & Highlights</Link>
              </li>
              <li>
                <Link to="/competitions" className="text-paper/70 hover:text-amber transition-colors">Competitions & Events</Link>
              </li>
              <li>
                <Link to="/plan-your-visit" className="text-paper/70 hover:text-amber transition-colors">Plan Your Visit</Link>
              </li>
              <li>
                <Link to="/faq" className="text-paper/70 hover:text-amber transition-colors">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Project & Legal */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-paper/50 mb-4">
              Academic Project
            </h3>
            <ul className="space-y-2.5 font-body text-sm">
              <li>
                <Link to="/express-interest" className="text-paper/70 hover:text-amber transition-colors font-medium">
                  Register Your Interest
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-paper/70 hover:text-amber transition-colors">
                  Privacy Notice
                </Link>
              </li>
              <li className="pt-2 text-xs text-paper/50 leading-relaxed">
                Part II, Step 3 university digital marketing assignment. Expressions of interest are non-binding.
              </li>
            </ul>
          </div>

          {/* Official Channels & Connect */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-paper/50 mb-4">
              Official Channels
            </h3>
            <p className="text-xs text-paper/60 mb-3 font-body">
              For official announcements and live updates, follow the fest handles:
            </p>
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              <SocialIcon href={siteConfig.socials.instagram} label="Xpressions Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.socials.facebook} label="Xpressions Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.socials.x} label="Xpressions on X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialIcon>
            </div>
            <p className="text-xs text-paper/50">
              Institution:{' '}
              <a
                href="https://www.ximb.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-paper"
                onClick={() => trackEvent('outbound_click', { url: 'https://www.ximb.ac.in/', label: 'XIMB official site' })}
              >
                ximb.ac.in ↗
              </a>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/50">
          <p>© {currentYear} Xpressions Student Project Initiative ({siteConfig.groupLabel}). All university marks belong to XIMB, XIM University.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-paper transition-colors">Privacy Notice</Link>
            <span aria-hidden="true">·</span>
            <a href="#main-content" className="hover:text-paper transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

