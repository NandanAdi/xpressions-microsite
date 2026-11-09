# Xpressions Microsite – Content & Asset Verification Status

This document tracks all verified factual data, active placeholders, and items awaiting official festival committee release for the upcoming edition of **Xpressions** (XIMB, XIM University, Bhubaneswar).

---

## 1. Publication-State Flags (`client/src/data/siteConfig.json`)

| Flag | Current Setting | Action Required to Activate |
| :--- | :--- | :--- |
| `datesConfirmed` | `false` | Set to `true` and populate `eventDates` (e.g., `"16–18 January 2027"`) once university circular is published. Automatically injects JSON-LD Event schema. |
| `eventDates` | `null` | String with confirmed dates. |
| `passesOpen` | `false` | Set to `true` and provide `passUrl` once official ticketing on Luma is launched. |
| `passUrl` | `null` | URL to live Luma listing (e.g., `https://luma.com/...`). |
| `competitionRegistrationOpen` | `false` | Set to `true` when Unstop opens entries. Switches cards from "Details to be announced" to "Register on Unstop ↗". |
| `scheduleAvailable` | `false` | Set to `true` when day-wise itinerary is released. |
| `lineupAnnounced` | `false` | Set to `true` when Celeblitz, EDM Night, and Comedy artists are revealed. |
| `countdownEnabled` | `false` | Must remain `false` until dates are confirmed. |
| `countdownTarget` | `null` | ISO 8601 target timestamp if countdown is activated. |

---

## 2. Asset Verification Status

| Asset Path | Current State | Verification Source |
| :--- | :--- | :--- |
| `client/public/assets/logo-xpressions.jpg` | **Supplied & Integrated** | Official Xpressions logo supplied by team. Displayed in Header and Footer. |
| `client/public/assets/college-logo.png` | **Supplied & Integrated** | Official XIM University / XIMB crest. Displayed in Header and Footer. |
| `client/public/assets/hero-bg.jpg` | **Supplied & Integrated** | High-energy arena concert stage backdrop with crimson vignette. |
| `client/public/assets/photos/garba-night-1.jpg` & `garba-night-2.jpg` | **Supplied & Integrated** | Official photos from Garba Night 2026 pre-fest celebration via `@ximbxpressions`. |
| `client/public/assets/photos/halloween-night-1.jpg` & `halloween-night-2.jpg` | **Supplied & Integrated** | Official photos from Halloween Night 2026 pre-fest costume/DJ night via `@ximbxpressions`. |
| `client/public/assets/photos/concert-live-1.jpg` & `concert-live-2.jpg` | **Supplied & Integrated** | Official photos from Celeblitz live concert nights via `@ximbxpressions`. |
| `client/public/assets/og-image.png` | 1200×630 OpenGraph card | Official promotional social share banner. |

---

## 3. Fact Verification Matrix

| Entity | Verified Historical Fact | Source | Upcoming Edition Status |
| :--- | :--- | :--- | :--- |
| **Festival Identity** | Annual management-cultural fest of XIMB, XIM University, Bhubaneswar | Official XIMB Portal | Confirmed |
| **Venue** | Xavier Institute of Management, Xavier Square, Jayadev Vihar, Bhubaneswar 751013 | Xpressions'25 Luma Listing | Confirmed per listing |
| **Xpressions'22 Scale** | 25th edition, 40,000+ footfall, 36 events, 20+ institutes, ₹10 lakh prizes, 29 sponsors | Official Placement Brochure / Media | Historical reference only |
| **Xpressions 2018 Scale** | 25,000+ attendees, 40+ media houses | Official Brochure | Historical reference only |
| **Past Celeblitz Artists** | Lucky Ali (2011), Arijit Singh (2013), Shankar-Ehsaan-Loy (2016), Farhan Akhtar (2017), Sunidhi Chauhan (2018), Mika Singh (2019), Vishal-Shekhar (2022 & prior), Darshan Raval (2023), Sachin-Jigar (2023) | Media & Placement Reports | **Upcoming lineup strictly unannounced** |
| **Participating Institutions** | Teams from IIMs, XLRI, MICA, IRMA, Great Lakes, IMT, KIIT, Ravenshaw, ITER | Media & College Reports | Verified historical reach |
| **Pass Regulations (2025)** | Free of cost, single entry, no re-entry, 1 pass/ID on Luma, college ID for XIM students | Luma 2025 Archive | **Historical only; rules may change** |
| **Competition Registration** | Centralized on Unstop with event-by-event deadlines and guidelines | Unstop Archives | **Pending committee release** |
| **Social Initiatives** | X-Athon (pre-fest charity run) and X-Enable (specially-abled children empowerment) | Official Festival Records | Traditions confirmed; dates TBD |

---

## 4. Verification Guardrails Adhered To

1. **Zero Guesswork Policy:** No prospective dates, ticket prices, prize pools, or artist bookings have been invented.
2. **Clear Separation of Actions:**
   - **Expression of Interest:** Academic capture via this site.
   - **Passes:** Official ticketing via Luma.
   - **Competition Entries:** Live registrations via Unstop.
3. **Institutional Mark Protection:** Project label (`Group 8`) clearly demarcated on all pages. No modification of institutional crests.

