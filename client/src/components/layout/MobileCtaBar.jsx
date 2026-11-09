import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';

export default function MobileCtaBar() {
  const { pathname } = useLocation();

  // Hide on express interest and thank-you pages
  if (pathname === '/express-interest' || pathname === '/thank-you') {
    return null;
  }

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-navy/95 backdrop-blur-md border-t border-paper/10 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
      aria-label="Quick registration bar"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/express-interest"
          data-cta-id="sticky_register"
          onClick={() => trackEvent('primary_cta_click', { cta_id: 'sticky_register', page: pathname })}
          className="flex-1 flex items-center justify-center px-4 py-3 rounded-md bg-teal text-white font-heading font-bold text-sm min-h-[44px] shadow-md hover:bg-teal/90 active:scale-95 transition-all"
        >
          Register Your Interest
        </Link>
        <Link
          to="/competitions"
          data-cta-id="sticky_explore"
          onClick={() => trackEvent('explore_competitions_click', { page: pathname })}
          className="px-3 py-3 rounded-md border border-paper/20 text-paper/80 font-heading font-semibold text-xs min-h-[44px] flex items-center justify-center hover:bg-paper/5"
        >
          Events
        </Link>
      </div>
    </aside>
  );
}

