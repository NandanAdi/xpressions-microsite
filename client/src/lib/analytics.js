// Analytics wrapper – GA4 via gtag + first-party /api/track beacon
// NEVER send personal data (email, name, phone) to any analytics service.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const API_URL = import.meta.env.VITE_API_URL || 'https://xpressions-microsite.onrender.com';

const ALLOWED_EVENTS = new Set([
  'page_view', 'primary_cta_click', 'explore_competitions_click',
  'official_pass_click', 'competition_registration_click',
  'form_start', 'form_submit_success', 'form_error',
  'event_card_open', 'filter_used', 'quiz_start', 'quiz_complete',
  'gallery_open', 'video_play', 'faq_open', 'outbound_click',
  'share_click', 'scroll_depth', 'engaged_30s', 'add_to_calendar',
]);

// Personal data fields to strip
const PERSONAL_FIELDS = ['email', 'name', 'phone', 'institution', 'full_name'];

let gaLoaded = false;

function getUTMParams() {
  try {
    const stored = sessionStorage.getItem('xp_utm');
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
}

function isDebug() {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('debug') === '1') {
    try { sessionStorage.setItem('DEBUG_ANALYTICS', '1'); } catch {}
    return true;
  }
  try { return sessionStorage.getItem('DEBUG_ANALYTICS') === '1'; } catch { return false; }
}

function sanitize(params = {}) {
  const clean = { ...params };
  PERSONAL_FIELDS.forEach(f => delete clean[f]);
  return clean;
}

export function getConsent() {
  try { return localStorage.getItem('xp_consent'); } catch { return null; }
}

export function setConsent(granted) {
  try { localStorage.setItem('xp_consent', granted ? 'granted' : 'denied'); } catch {}
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    });
  }
  if (granted && !gaLoaded) loadGA();
}

export function loadGA() {
  if (!GA_ID || gaLoaded || typeof window === 'undefined') return;
  gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
  });
  window.gtag('config', GA_ID, {
    send_page_view: false, // We fire page_view manually
    anonymize_ip: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function trackEvent(name, params = {}) {
  if (!ALLOWED_EVENTS.has(name)) return;

  const utmParams = getUTMParams();
  const clean = sanitize({ ...utmParams, ...params });

  if (isDebug()) {
    console.warn('[Analytics]', name, clean);
  }

  if (window.gtag && getConsent() === 'granted') {
    window.gtag('event', name, clean);
  }

  // First-party beacon (non-blocking)
  if (API_URL) {
    const sessionId = (() => {
      try {
        let id = sessionStorage.getItem('xp_session_id');
        if (!id) {
          id = Math.random().toString(36).slice(2) + Date.now().toString(36);
          sessionStorage.setItem('xp_session_id', id);
        }
        return id;
      } catch { return 'unknown'; }
    })();

    const payload = sanitize({
      event: name,
      page: window.location.pathname,
      sessionId,
      ...utmParams,
      ...params,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(`${API_URL}/api/track`, blob);
    } else {
      fetch(`${API_URL}/api/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  }
}
