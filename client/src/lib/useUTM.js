import { useEffect } from 'react';

export function useUTM() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    if (Object.keys(utm).length > 0) {
      try {
        sessionStorage.setItem('xp_utm', JSON.stringify(utm));
      } catch {}
    }
    // Store referrer and landing path
    try {
      if (!sessionStorage.getItem('xp_referrer')) {
        sessionStorage.setItem('xp_referrer', document.referrer || '');
        sessionStorage.setItem('xp_landing', window.location.pathname + window.location.search);
      }
    } catch {}
  }, []);
}
