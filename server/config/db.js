import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino({ name: 'db', level: process.env.LOG_LEVEL || 'info' });

export async function connectDB() {
  let uri = process.env.MONGODB_URI;

  // Treat placeholder strings as unset
  const isPlaceholder =
    uri &&
    (uri.includes('cluster.mongodb.net') ||
      uri.includes('<username>') ||
      uri.includes('user:pass') ||
      uri.includes('your_mongodb'));

  if (isPlaceholder) {
    logger.warn('MONGODB_URI contains placeholder credentials; treating as unset.');
    uri = null;
  }

  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      logger.warn(
        '⚠️ MONGODB_URI environment variable is not configured in production. ' +
        'Server will start in standalone mode so health checks and API endpoints remain accessible. ' +
        'Please add MONGODB_URI in your host dashboard (e.g., Render Environment settings) to persist data.'
      );
      return;
    }

    try {
      // Use in-memory MongoDB for local development
      logger.info('Starting local in-memory database (mongodb-memory-server)...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      logger.info({ uri }, 'mongodb-memory-server started');
    } catch (memErr) {
      logger.warn(
        { err: memErr.message },
        'Could not start mongodb-memory-server. Running server without database connection.'
      );
      return;
    }
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'xpressions',
      serverSelectionTimeoutMS: 5000,
    });
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error({ err: err.message }, 'MongoDB connection failed');
    logger.warn('Continuing server startup so API and health endpoints remain responsive.');
  }
}
