import 'dotenv/config';
import mongoose from 'mongoose';
import Interest from '../models/Interest.js';
import pino from 'pino';

const logger = pino({ name: 'seed' });

const seeds = [
  { email: 'test.attending@example.com', interestCategory: 'Attending', consent: true, utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'xpressions_launch', expiresAt: new Date('2028-11-01') },
  { email: 'test.competing@example.com', interestCategory: 'Competing', consent: true, utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'xpressions_launch', quizResult: 'Business', expiresAt: new Date('2028-11-01') },
  { email: 'test.both@example.com', interestCategory: 'Both', consent: true, institution: 'IIM Bangalore', utm_source: 'whatsapp', utm_medium: 'referral', utm_campaign: 'xpressions_launch', expiresAt: new Date('2028-11-01') },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    logger.error('MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName: 'xpressions' });
  await Interest.deleteMany({ email: { $regex: '@example.com$' } });
  await Interest.insertMany(seeds);
  logger.info({ count: seeds.length }, 'Seed data inserted');
  await mongoose.disconnect();
}

seed().catch(err => {
  logger.error({ err }, 'Seed failed');
  process.exit(1);
});
