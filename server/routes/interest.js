import { Router } from 'express';
import express from 'express';
import Interest from '../models/Interest.js';
import { interestSchema } from '../validation/schemas.js';
import { interestLimiter } from '../middleware/rateLimiter.js';
import pino from 'pino';

const logger = pino({ name: 'interest' });
const router = Router();

router.post('/', express.json({ limit: '10kb' }), interestLimiter, async (req, res) => {
  try {
    const parsed = interestSchema.safeParse(req.body);

    if (!parsed.success) {
      const fieldErrors = {};
      parsed.error.errors.forEach(e => {
        const field = e.path[0] || 'general';
        fieldErrors[field] = e.message;
      });
      return res.status(400).json({ success: false, errors: fieldErrors });
    }

    const data = parsed.data;

    // Honeypot check — silently accept
    if (data._hp) {
      logger.info('Honeypot triggered');
      return res.status(201).json({
        success: true,
        message: "We've noted your interest. Thank you!",
      });
    }

    // Duplicate check — same success message, no info leak
    const existing = await Interest.findOne({ email: data.email }).lean();
    if (existing) {
      logger.info({ email: '[redacted]' }, 'Duplicate interest submission');
      return res.status(201).json({
        success: true,
        message: "We've noted your interest. Thank you!",
      });
    }

    // Compute expiry date
    const purgeAfter = process.env.PURGE_AFTER || '2028-11-01';
    const expiresAt = new Date(purgeAfter);
    if (isNaN(expiresAt.getTime())) {
      logger.warn('Invalid PURGE_AFTER date, defaulting to 2 years');
      expiresAt.setTime(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000);
    }

    const { _hp: _removed, ...cleanData } = data;
    const interest = new Interest({ ...cleanData, expiresAt });
    await interest.save();

    // No personal data in logs
    logger.info({ interestCategory: data.interestCategory, utm_source: data.utm_source }, 'Interest recorded');

    res.status(201).json({
      success: true,
      message: "We've noted your interest. Thank you! This is a student-project expression of interest and does not reserve a pass or register you for any competition.",
    });
  } catch (err) {
    logger.error({ err: err.message }, 'Interest submission error');
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or email us directly.',
    });
  }
});

export default router;
