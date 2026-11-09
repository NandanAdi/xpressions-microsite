import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import healthRouter from './routes/health.js';
import interestRouter from './routes/interest.js';
import trackRouter from './routes/track.js';
import adminRouter from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

// Route meta for server-side OG tag injection
const ROUTE_META = {
  '/': {
    title: 'Xpressions – Annual Fest of XIMB, XIM University',
    description: 'Find your stage at Xpressions. Annual management-cultural fest of Xavier Institute of Management (XIMB), XIM University, Bhubaneswar.',
  },
  '/experience': {
    title: 'Experience & Highlights – Xpressions',
    description: 'Explore past edition highlights, photo gallery and edition timeline from Xpressions at XIMB, XIM University.',
  },
  '/competitions': {
    title: 'Competitions & Performances – Xpressions',
    description: 'Business cases, cultural performances, campus fun and social events at Xpressions, XIMB.',
  },
  '/plan-your-visit': {
    title: 'Plan Your Visit – Xpressions',
    description: 'Venue, passes information and travel guidance for Xpressions at Xavier Institute of Management, Bhubaneswar.',
  },
  '/faq': {
    title: 'FAQ – Xpressions',
    description: 'Frequently asked questions about Xpressions, the annual fest of XIMB, XIM University.',
  },
  '/express-interest': {
    title: 'Register Your Interest – Xpressions',
    description: 'Register your interest in Xpressions, the annual management-cultural fest of XIMB, XIM University, Bhubaneswar.',
  },
  '/privacy': {
    title: 'Privacy Notice – Xpressions Project',
    description: 'Privacy notice for the Xpressions student digital marketing project.',
  },
};

const app = express();

// Security headers
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const allowedOrigins = [clientOrigin, 'http://localhost:5173', 'http://localhost:4173'];
if (isProd) allowedOrigins.push('https://xpressions-g7.vercel.app');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // needed for Vite HMR in dev
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'data:'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: [
        "'self'",
        'https://www.google-analytics.com',
        'https://analytics.google.com',
        'https://region1.google-analytics.com',
        ...allowedOrigins,
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: isProd ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(compression());
app.use(mongoSanitize());
app.use(express.json({ limit: '50kb' }));

// Logging — omit paths that could include personal data
app.use(morgan(isProd ? 'combined' : 'dev', {
  skip: (req) => req.path.startsWith('/api/interest'),
}));

// API routes
app.use('/api/health',    healthRouter);
app.use('/api/interest',  interestRouter);
app.use('/api/track',     trackRouter);
app.use('/api/admin',     adminRouter);

// Serve client build in production
if (isProd) {
  const distPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(distPath, { maxAge: '1y', immutable: true }));

  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    let html = '';
    try {
      html = fs.readFileSync(indexPath, 'utf-8');
    } catch {
      return res.status(500).send('Build not found. Run npm run build first.');
    }

    const route = req.path;
    const meta = ROUTE_META[route] || ROUTE_META['/'];
    const baseUrl = process.env.CLIENT_ORIGIN || 'https://xpressions-g7.vercel.app';

    html = html
      .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${meta.description}" />`
      )
      .replace(
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${meta.title}" />`
      )
      .replace(
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${meta.description}" />`
      )
      .replace(
        /<link rel="canonical" href="[^"]*" \/>/,
        `<link rel="canonical" href="${baseUrl}${route}" />`
      );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(html);
  });
}

// Error handler
app.use((err, req, res, _next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
