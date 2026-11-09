import 'dotenv/config';
import mongoose from 'mongoose';
import Interest from '../models/Interest.js';
import pino from 'pino';

const logger = pino({ name: 'purge' });

async function purge() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    logger.error('MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName: 'xpressions' });
  logger.info('Connected. Purging expired interest records...');

  const result = await Interest.deleteMany({ expiresAt: { $lt: new Date() } });
  logger.info({ deleted: result.deletedCount }, 'Purge complete');

  await mongoose.disconnect();
}

purge().catch(err => {
  logger.error({ err }, 'Purge failed');
  process.exit(1);
});
