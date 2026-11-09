const API_URL = import.meta.env.VITE_API_URL || 'https://xpressions-microsite.onrender.com';

let pinged = false;

export async function pingHealth() {
  if (pinged || !API_URL) return;
  pinged = true;
  try {
    await fetch(`${API_URL}/api/health`, { method: 'GET', cache: 'no-store' });
  } catch {
    // Server sleeping – graceful degradation; site works from bundled data
  }
}
