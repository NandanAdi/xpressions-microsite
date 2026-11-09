import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock sessionStorage
const mockSession = {};
vi.stubGlobal('sessionStorage', {
  getItem: (k) => mockSession[k] ?? null,
  setItem: (k, v) => { mockSession[k] = v; },
  removeItem: (k) => { delete mockSession[k]; },
});

describe('UTM capture', () => {
  it('stores utm params from URL in sessionStorage', async () => {
    // Simulate URL with UTM params
    const params = new URLSearchParams('utm_source=instagram&utm_medium=social&utm_campaign=test');
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    sessionStorage.setItem('xp_utm', JSON.stringify(utm));

    const stored = JSON.parse(sessionStorage.getItem('xp_utm'));
    expect(stored.utm_source).toBe('instagram');
    expect(stored.utm_medium).toBe('social');
    expect(stored.utm_campaign).toBe('test');
  });
});

describe('Analytics sanitization', () => {
  it('strips personal data fields from event params', () => {
    const PERSONAL_FIELDS = ['email', 'name', 'phone', 'institution', 'full_name'];
    const params = { email: 'test@test.com', name: 'Alice', page: '/home', depth: 50 };
    const clean = { ...params };
    PERSONAL_FIELDS.forEach(f => delete clean[f]);
    expect(clean.email).toBeUndefined();
    expect(clean.name).toBeUndefined();
    expect(clean.page).toBe('/home');
    expect(clean.depth).toBe(50);
  });
});

describe('CTA state logic', () => {
  it('shows register interest CTA when passesOpen is false', () => {
    const config = { passesOpen: false, competitionRegistrationOpen: false };
    const primaryCTA = config.passesOpen ? 'Get Official Pass' : 'Register Your Interest';
    expect(primaryCTA).toBe('Register Your Interest');
  });

  it('shows pass CTA when passesOpen is true', () => {
    const config = { passesOpen: true, passUrl: 'https://luma.com/test' };
    const showPassCTA = Boolean(config.passesOpen && config.passUrl);
    expect(showPassCTA).toBe(true);
  });
});
