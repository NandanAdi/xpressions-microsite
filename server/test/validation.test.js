import { describe, it, expect } from 'vitest';
import { interestSchema, trackSchema } from '../validation/schemas.js';

describe('Zod Server Validation Schemas', () => {
  it('validates a valid interest submission', () => {
    const validData = {
      email: 'student@ximb.ac.in',
      interestCategory: 'Attending',
      name: 'Priya Sharma',
      institution: 'XIMB',
      consent: true,
      updatesOptIn: true,
      utm_source: 'instagram',
      utm_medium: 'social',
      utm_campaign: 'xpressions_launch',
      utm_content: 'bio_link',
      quizResult: 'Business',
    };

    const parsed = interestSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
    expect(parsed.data.email).toBe('student@ximb.ac.in');
    expect(parsed.data.interestCategory).toBe('Attending');
  });

  it('rejects an invalid email address', () => {
    const invalidData = {
      email: 'not-an-email',
      interestCategory: 'Competing',
      consent: true,
    };

    const parsed = interestSchema.safeParse(invalidData);
    expect(parsed.success).toBe(false);
    expect(parsed.error.errors[0].message).toContain('valid email');
  });

  it('rejects submission without consent', () => {
    const noConsentData = {
      email: 'test@example.com',
      interestCategory: 'Both',
      consent: false,
    };

    const parsed = interestSchema.safeParse(noConsentData);
    expect(parsed.success).toBe(false);
  });

  it('detects honeypot field', () => {
    const botData = {
      email: 'bot@spam.com',
      interestCategory: 'Attending',
      consent: true,
      _hp: 'gotcha',
    };

    const parsed = interestSchema.safeParse(botData);
    expect(parsed.success).toBe(true);
    expect(parsed.data._hp).toBe('gotcha');
  });

  it('validates track beacon payload', () => {
    const trackPayload = {
      event: 'primary_cta_click',
      page: '/',
      sessionId: 'sess_123',
      utm_source: 'whatsapp',
      utm_medium: 'referral',
      utm_campaign: 'xpressions_launch',
    };

    const parsed = trackSchema.safeParse(trackPayload);
    expect(parsed.success).toBe(true);
    expect(parsed.data.event).toBe('primary_cta_click');
  });
});

