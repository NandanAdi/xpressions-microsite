import { Router } from 'express';
import Interest from '../models/Interest.js';
import TrackEvent from '../models/TrackEvent.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import pino from 'pino';

const logger = pino({ name: 'admin' });
const router = Router();

router.use(adminAuth, adminLimiter);

// GET /api/admin/interest.csv
router.get('/interest.csv', async (req, res) => {
  try {
    const records = await Interest.find({})
      .select('email interestCategory name institution utm_source utm_medium utm_campaign utm_content quizResult createdAt')
      .sort({ createdAt: -1 })
      .lean();

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="interest.csv"');

    const header = 'email,interestCategory,name,institution,utm_source,utm_medium,utm_campaign,utm_content,quizResult,createdAt\n';
    res.write(header);

    for (const r of records) {
      const row = [
        r.email, r.interestCategory,
        r.name || '', r.institution || '',
        r.utm_source || '', r.utm_medium || '', r.utm_campaign || '', r.utm_content || '',
        r.quizResult || '', r.createdAt?.toISOString() || '',
      ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
      res.write(row + '\n');
    }
    res.end();
    logger.info('Admin downloaded interest CSV');
  } catch (err) {
    logger.error({ err: err.message }, 'CSV export failed');
    res.status(500).json({ error: 'Export failed' });
  }
});

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [categoryStats, sourceStats, mediumStats, campaignStats, dayStats, eventStats] = await Promise.all([
      Interest.aggregate([{ $group: { _id: '$interestCategory', count: { $sum: 1 } } }]),
      Interest.aggregate([{ $group: { _id: '$utm_source', count: { $sum: 1 } } }]),
      Interest.aggregate([{ $group: { _id: '$utm_medium', count: { $sum: 1 } } }]),
      Interest.aggregate([{ $group: { _id: '$utm_campaign', count: { $sum: 1 } } }]),
      Interest.aggregate([{
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      }, { $sort: { _id: 1 } }]),
      TrackEvent.aggregate([{ $group: { _id: '$event', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    ]);

    res.json({
      totalInterest: await Interest.countDocuments(),
      byCategory: categoryStats,
      bySource: sourceStats,
      byMedium: mediumStats,
      byCampaign: campaignStats,
      byDay: dayStats,
      trackEventTotals: eventStats,
    });
  } catch (err) {
    logger.error({ err: err.message }, 'Stats query failed');
    res.status(500).json({ error: 'Stats query failed' });
  }
});

export default router;
