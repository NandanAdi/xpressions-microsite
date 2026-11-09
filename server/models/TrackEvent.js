import mongoose from 'mongoose';

const ALLOWED_EVENTS = [
  'page_view', 'primary_cta_click', 'explore_competitions_click',
  'official_pass_click', 'competition_registration_click',
  'form_start', 'form_submit_success', 'form_error',
  'event_card_open', 'filter_used', 'quiz_start', 'quiz_complete',
  'gallery_open', 'video_play', 'faq_open', 'outbound_click',
  'share_click', 'scroll_depth', 'engaged_30s', 'add_to_calendar',
];

const trackEventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ALLOWED_EVENTS,
  },
  page:         { type: String, maxLength: 500 },
  sessionId:    { type: String, maxLength: 100 },
  utm_source:   { type: String, maxLength: 100 },
  utm_medium:   { type: String, maxLength: 100 },
  utm_campaign: { type: String, maxLength: 100 },
  utm_content:  { type: String, maxLength: 100 },
  createdAt:    { type: Date, default: Date.now },
}, { versionKey: false });

// TTL: auto-delete after 90 days
trackEventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export const TRACK_ALLOWED_EVENTS = ALLOWED_EVENTS;
export default mongoose.model('TrackEvent', trackEventSchema);
