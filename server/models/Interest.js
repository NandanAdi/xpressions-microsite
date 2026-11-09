import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 254,
    index: true,
  },
  interestCategory: {
    type: String,
    required: true,
    enum: ['Attending', 'Competing', 'Both'],
  },
  name: { type: String, trim: true, maxLength: 100 },
  institution: { type: String, trim: true, maxLength: 150 },
  consent: { type: Boolean, required: true },
  updatesOptIn: { type: Boolean, default: false },
  utm_source:   { type: String, maxLength: 100 },
  utm_medium:   { type: String, maxLength: 100 },
  utm_campaign: { type: String, maxLength: 100 },
  utm_content:  { type: String, maxLength: 100 },
  referrer:     { type: String, maxLength: 500 },
  landingPath:  { type: String, maxLength: 500 },
  quizResult:   { type: String, maxLength: 100 },
  createdAt:    { type: Date, default: Date.now },
  expiresAt:    { type: Date, required: true },
}, { versionKey: false });

// TTL index — MongoDB will auto-delete documents past expiresAt
interestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Interest', interestSchema);
