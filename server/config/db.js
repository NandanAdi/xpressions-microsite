import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino({ name: 'db', level: process.env.LOG_LEVEL || 'info' });

export async function connectDB() {
  let uri = process.env.MONGODB_URI;

  // Treat placeholder strings as unset
  const isPlaceholder = uri && (uri.includes('cluster.mongodb.net') || uri.includes('<username>') || uri.includes('user:pass'));
  if (isPlaceholder) {
    uri = null;
  }

  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      logger.error('MONGODB_URI not set in production — aborting');
      process.exit(1);
    }
    try {
      // Use in-memory MongoDB for local development
      logger.info('Starting local in-memory database (mongodb-memory-server)...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      logger.info({ uri }, 'mongodb-memory-server started');
    } catch (memErr) {
      logger.warn({ err: memErr.message }, 'Could not start mongodb-memory-server. Running server without database connection.');
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
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logger.warn('Continuing server startup in development mode so API endpoints remain responsive.');
    }
  }
}
