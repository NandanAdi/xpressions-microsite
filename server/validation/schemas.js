import { z } from 'zod';

export const interestSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .max(254)
    .transform(v => v.toLowerCase().trim()),
  interestCategory: z.enum(['Attending', 'Competing', 'Both'], {
    errorMap: () => ({ message: 'Please select your interest category' }),
  }),
  name: z.string().max(100).optional().transform(v => v?.trim() || undefined),
  institution: z.string().max(150).optional().transform(v => v?.trim() || undefined),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms to continue' }) }),
  updatesOptIn: z.boolean().optional().default(false),
  utm_source:   z.string().max(100).optional(),
  utm_medium:   z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content:  z.string().max(100).optional(),
  referrer:     z.string().max(500).optional(),
  landingPath:  z.string().max(500).optional(),
  quizResult:   z.string().max(100).optional(),
  _hp:          z.string().optional(), // honeypot field
});

export const trackSchema = z.object({
  event: z.string().max(100),
  page: z.string().max(500).optional(),
  sessionId: z.string().max(100).optional(),
  utm_source:   z.string().max(100).optional(),
  utm_medium:   z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content:  z.string().max(100).optional(),
});
