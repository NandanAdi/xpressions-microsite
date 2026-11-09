# Xpressions Microsite – Measurement & Analytics Guide (`TRACKING.md`)

This document defines the complete analytics architecture, UTM taxonomy, conversion key events, and campaign URLs for the Xpressions Group Project (Part II, Step 3).

---

## 1. Analytics Architecture

The microsite uses a **dual-layer measurement strategy** to ensure full resilience against ad-blockers and browser tracking prevention:

1. **Client-Side GA4 (`gtag.js`):**
   - Initialized via `client/src/lib/analytics.js`.
   - Adheres to a strict consent-first model: only fires when the visitor clicks **Accept** on the consent banner.
   - PII Sanitization: Strips `email`, `name`, `phone`, and `institution` fields before dispatch.
   - IP Anonymization enabled by default.

2. **First-Party Backup Beacon (`/api/track`):**
   - Transmits non-PII interaction telemetry using `navigator.sendBeacon()` (with `fetch` fallback).
   - Stored directly in MongoDB with a 90-day TTL index.
   - Provides unblocked session and CTA analytics for academic grading even if browser extensions block Google Analytics.

---

## 2. Event Dictionary

All event names are strictly allowlisted. Debug mode can be triggered on any page by appending `?debug=1` to the URL.

| Event Name | Trigger Condition | Parameters Captured | GA4 Key Event? |
| :--- | :--- | :--- | :--- |
| `page_view` | Route navigation in React Router | `page`, `title`, UTM parameters | No |
| `primary_cta_click` | Clicks on "Register Your Interest" buttons | `cta_id` (`hero_register`, `header_register`, `sticky_register`, `banner_register`, `mobile_menu_register`), `page` | **YES (Key Event)** |
| `explore_competitions_click` | Secondary CTA clicks to competitions page | `page` | No |
| `official_pass_click` | Outbound clicks to Luma pass listings | `url`, `page` | No |
| `competition_registration_click` | Outbound clicks to Unstop event registrations | `event_id`, `page` | No |
| `form_start` | First input focus in Express Interest form | `page` | No |
| `form_submit_success` | Confirmed 201 response from `/api/interest` | `interest_category` (`Attending`, `Competing`, `Both`), `quiz_result` | **YES (Primary Conversion)** |
| `form_error` | Client-side validation fail or API rejection | `error_type` (`client_validation`, `server_rejection`, `network_error`) | No |
| `event_card_open` | Expanding competition specifications | `event_id`, `category` | No |
| `filter_used` | Changing category chips or typing search | `filter_value`, `source` | No |
| `quiz_start` | Starting the "Find My Stage" quiz | None | No |
| `quiz_complete` | Finishing the 3-question quiz | `result_world` (`Business`, `Stage and Cultural`, `Campus and Fun`, `Social`) | No |
| `gallery_open` | Opening a photograph in the lightbox | `photo_id` | No |
| `video_play` | Clicking YouTube click-to-load facade | `video_id` | No |
| `faq_open` | Expanding an accordion FAQ item | `question_id` | No |
| `outbound_click` | Outbound links to XIMB or social profiles | `url`, `label` | No |
| `share_click` | Clicking share buttons on Thank You page | `method` (`native`, `whatsapp`, `linkedin`, `copy`), `page` | No |
| `scroll_depth` | Vertical scroll benchmarks | `depth` (`25`, `50`, `75`, `100`), `page` | No |
| `engaged_30s` | Visitor remains active on page for 30+ seconds | `page` | No |
| `add_to_calendar` | Downloading generated `.ics` calendar file | `page` | No |

---

## 3. Ready-to-Use Campaign UTM Links

Base Production Domain: `https://xpressions-g7.vercel.app`

| Channel / Placement | Target URL with Pre-Built UTM Parameters |
| :--- | :--- |
| **Instagram Bio Link** | `https://xpressions-g7.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=xpressions_launch&utm_content=bio_link` |
| **Instagram Story (Sticker)** | `https://xpressions-g7.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=xpressions_launch&utm_content=story_sticker` |
| **Instagram Reel Caption** | `https://xpressions-g7.vercel.app/?utm_source=instagram&utm_medium=social&utm_campaign=xpressions_launch&utm_content=reel_caption` |
| **WhatsApp Student Groups** | `https://xpressions-g7.vercel.app/?utm_source=whatsapp&utm_medium=referral&utm_campaign=xpressions_launch&utm_content=batch_broadcast` |
| **LinkedIn Announcement** | `https://xpressions-g7.vercel.app/?utm_source=linkedin&utm_medium=social&utm_campaign=xpressions_launch&utm_content=alumni_post` |
| **Inter-College Mailer** | `https://xpressions-g7.vercel.app/?utm_source=email&utm_medium=newsletter&utm_campaign=xpressions_launch&utm_content=placement_invite` |
| **Campus Poster QR Code** | `https://xpressions-g7.vercel.app/?utm_source=offline_poster&utm_medium=qr&utm_campaign=xpressions_launch&utm_content=quad_noticeboard` |

---

## 4. Limits of Interpretation (Academic Disclosure)

When analyzing campaign results in Step 4, observe these vital methodological boundaries:

1. **Handoff vs. Completion:**
   An `official_pass_click` or `competition_registration_click` indicates high intent and an outbound handoff to an external platform (Luma or Unstop). It does **not** signify a completed registration, ticket purchase, or university admission.
2. **First-Party vs. GA4 Delta:**
   First-party beacon totals in MongoDB `/api/admin/stats` will typically be 15–30% higher than GA4 counts due to ad-blockers and users who declined the analytics consent banner.
3. **Interest Submissions:**
   `form_submit_success` counts reflect expressions of project interest, not verified festival attendees or confirmed teams.

