import { Router } from 'express';
import express from 'express';
import TrackEvent, { TRACK_ALLOWED_EVENTS } from '../models/TrackEvent.js';
import { trackSchema } from '../validation/schemas.js';
import { trackLimiter } from '../middleware/rateLimiter.js';
import pino from 'pino';

const logger = pino({ name: 'track' });
const router = Router();

router.post('/', express.json({ limit: '5kb' }), trackLimiter, async (req, res) => {
  // Always return 204 to avoid blocking the page
  res.status(204).end();

  try {
    const parsed = trackSchema.safeParse(req.body);
    if (!parsed.success) return;

    const data = parsed.data;
    if (!TRACK_ALLOWED_EVENTS.includes(data.event)) return;

    await TrackEvent.create(data);
  } catch (err) {
    logger.warn({ err: err.message }, 'Track event save failed (non-critical)');
  }
});

export default router;
