import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
import pino from 'pino';

const logger = pino({ name: 'server', level: process.env.LOG_LEVEL || 'info' });
const PORT = parseInt(process.env.PORT || '4000', 10);

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    logger.info({ port: PORT }, `Xpressions API listening`);
  });
}

main().catch(err => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
