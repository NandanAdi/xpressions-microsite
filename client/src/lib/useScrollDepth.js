import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from './analytics';

export function useScrollDepth() {
  const { pathname } = useLocation();
  const firedRef = useRef(new Set());

  useEffect(() => {
    firedRef.current = new Set();

    const checkDepth = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach(threshold => {
        if (pct >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackEvent('scroll_depth', { depth: threshold, page: pathname });
        }
      });
    };

    // 30-second engagement timer
    const engagementTimer = setTimeout(() => {
      trackEvent('engaged_30s', { page: pathname });
    }, 30000);

    window.addEventListener('scroll', checkDepth, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkDepth);
      clearTimeout(engagementTimer);
    };
  }, [pathname]);
}
