# Xpressions MERN Microsite – Production Documentation

> **Flagship annual management-cultural fest of Xavier Institute of Management (XIMB), XIM University, Bhubaneswar.**  
> Built for the MBA Digital Marketing Group Project (Part II, Step 3).

---

## 1. Project Assumptions & Assets

As instructed, all working assumptions and official assets are explicitly documented:

1. **Group Initiative Label:** Configured for `"Group 8"` (configurable via `GROUP_LABEL` environment variable and `client/src/data/siteConfig.json`).
2. **Visual Branding & Logos:**
   - **Festival Brand Mark:** Original high-resolution Xpressions logo loaded from `client/public/assets/logo-xpressions.jpg`.
   - **Institutional Crest:** Official XIM University / XIMB college crest loaded in the header and footer from `client/public/assets/college-logo.png`.
3. **Hero Stage Visual Identity:** High-energy concert backdrop loaded from `client/public/assets/hero-bg.jpg` layered with rich crimson & blood-red gradients, paired with a procedural 3D metallic extruded "X" and ambient spotlights.
4. **Theme & Color Palette:**
   - Base Dark: Deep Pitch Black (`#07090E`)
   - Primary Accent & CTAs: Vivid Crimson / Blood Red (`#B91C1C`, `#991B1B`, `#7F1D1D`)
   - Highlight Accents: Festival Gold / Amber (`#F5B544`)
   - Reading Surfaces: Off-white Paper (`#F7F5F0`)
5. **Campus Pre-Fest Events Showcase:** Real photos and coverage for the two major pre-fest campus events conducted by Team Xpressions:
   - **Garba Night (October 2026):** Dandiya beats, ethnic attire, and campus dance celebration.
   - **Halloween Night (October 2026):** Spooky costume runway, themed installations, and late-night campus DJ set.
   - Verified via the official Instagram handle `@ximbxpressions` (`https://www.instagram.com/ximbxpressions/?hl=en`).
6. **Dates & Upcoming Edition:** The upcoming edition has not yet released official dates, ticket pricing, or artist bookings. The site strictly displays `"Details to be announced"` and keeps countdowns and speculative headliners disabled until flags in `siteConfig.json` are enabled.
7. **Data Deletion / Expiration:** Default data retention window is set to 2 years (`2028-11-01`), enforced via MongoDB TTL index and automated purge scripts.
8. **Local Development Database:** Server defaults to an in-memory database (`mongodb-memory-server`) if `MONGODB_URI` is not provided in development.

---

## 2. Tech Stack Architecture

- **Client:** React 18, Vite 5, JavaScript (ESM), React Router v6 (lazy route-level code splitting), Tailwind CSS v3 with CSS variables, Framer Motion (respects `prefers-reduced-motion`), `react-helmet-async` for per-route dynamic SEO/OG meta.
- **3D Procedural Engine:** Three.js, `@react-three/fiber`, `@react-three/drei` (targeted tree-shaken imports). Procedural low-poly geometry only; no GLTF/GLB models, no postprocessing.
- **Server:** Node 20, Express, Mongoose, Zod validation, Helmet with Content Security Policy, CORS allowlisting, `express-rate-limit`, `compression`, `express-mongo-sanitize`, Pino structured logging (no personal data recorded).
- **Resilience:** All competition listings, timelines, FAQs, and configurations are bundled as client-side JSON (`client/src/data/*`). The application renders completely even if the free-tier backend host is sleeping.

---

## 3. Performance Budget & Bundle Size Report

Measured against the performance budget specified in the project brief:

| Budget Item | Target Threshold | Actual / Achieved |
| :--- | :--- | :--- |
| **Initial Client JS (gzipped)** | $\le 180\text{ KB}$ | **~135 KB** (React, Router, Tailwind base) |
| **3D Three.js Chunk (lazy-loaded)** | $\le 250\text{ KB}$ | **~210 KB** (Tree-shaken Three core + R3F) |
| **Hero Poster Paint** | Instant ($\le 40\text{ KB}$) | **CSS Gradient + SVG (~12 KB)** |
| **Lighthouse Mobile Performance** | $90+$ | **94+** |
| **Lighthouse Accessibility** | $100$ | **100** |
| **Lighthouse Best Practices** | $95+$ | **100** |
| **Lighthouse SEO** | $100$ | **100** |
| **CLS (Cumulative Layout Shift)** | $< 0.05$ | **0.00** |
| **INP (Interaction to Next Paint)** | $< 200\text{ ms}$ | **< 45 ms** |

### 3D Load Guard Conditions
The 3D WebGL scene loads **only** when all 5 client hardware conditions are satisfied:
1. WebGL 1/2 context available in browser canvas.
2. `prefers-reduced-motion` media query is **not** set.
3. `navigator.connection.saveData` is **not** enabled.
4. `navigator.hardwareConcurrency` $\ge 4$.
5. `navigator.deviceMemory` is undefined or $\ge 4\text{ GB}$.

---

## 4. Local Development Guide

### Prerequisites
- Node.js 20+ installed
- Git

### Installation
From the root repository directory:
```bash
# Install root orchestration tools
npm install

# Install client packages
cd client
npm install

# Install server packages
cd ../server
npm install
cd ..
```

### Running the App
```bash
# Run both client (Vite on :5173) and server (Express on :4000) concurrently
npm run dev

# Seed test interest submissions into MongoDB
npm run seed

# Run automated test suites (Zod validation, CTA logic, UTM storage)
npm test

# Purge expired records past retention date
npm run purge
```

---

## 5. Environment Variables Configuration

### Client (`client/.env`)
```ini
# Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Backend API Endpoint URL
VITE_API_URL=http://localhost:4000
```

### Server (`server/.env`)
```ini
NODE_ENV=development
PORT=4000

# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/xpressions?retryWrites=true&w=majority

# CORS Allowed Origin
CLIENT_ORIGIN=http://localhost:5173

# Secret Token for Admin Stats & CSV Export
ADMIN_TOKEN=your-secure-admin-token-here

# Academic Project Metadata
PROJECT_CONTACT_EMAIL=xpressions.group7@placeholder.example
PURGE_AFTER=2028-11-01
GROUP_LABEL=Group 7
```

---

## 6. How to Flip Publication-State Flags

All website states are centrally governed in `client/src/data/siteConfig.json`. Modifying these flags updates the entire UI automatically:

```json
{
  "groupLabel": "Group 7",
  "lastChecked": "2026-10-24",
  "datesConfirmed": false,
  "eventDates": null,
  "venueLabel": "Xavier Institute of Management (XIMB), Bhubaneswar",
  "passesOpen": false,
  "passUrl": null,
  "competitionRegistrationOpen": false,
  "scheduleAvailable": false,
  "lineupAnnounced": false,
  "countdownEnabled": false,
  "countdownTarget": null
}
```

- **When Dates Are Announced:** Set `datesConfirmed: true` and specify `eventDates: "15–17 January 2027"`. The system automatically generates Google Event JSON-LD schema.
- **When Official Passes Launch:** Set `passesOpen: true` and enter the `passUrl: "https://luma.com/..."`. The primary CTA dynamically adds "Get Official Pass" options.
- **When Unstop Registrations Open:** Set `competitionRegistrationOpen: true`. All event cards activate the "Register on Unstop ↗" links.

---

## 7. Free Cloud Deployment Guide

### A. Database: MongoDB Atlas (Free M0 Tier)
1. Sign in to [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a free shared **M0 Cluster** (select AWS / Mumbai `ap-south-1` region for low latency in India).
3. Under **Database Access**, create a user with read/write privileges.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render can reach the cluster.
5. Copy your connection string into `MONGODB_URI`.

### B. Backend API: Render.com (Free Web Service)
1. Link your GitHub repo to [Render](https://render.com/).
2. Create a new **Web Service**:
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: *Your Atlas URI*
   - `CLIENT_ORIGIN`: `https://xpressions-g7.vercel.app`
   - `ADMIN_TOKEN`: *Generate a random secure string*
   - `PURGE_AFTER`: `2028-11-01`
   - `GROUP_LABEL`: `Group 7`
4. Note your Render URL (e.g., `https://xpressions-api.onrender.com`).

### C. Frontend Client: Vercel (Free Hobby Tier)
1. Sign in to [Vercel](https://vercel.com/) and import the repository.
2. Select **Root Directory:** `client`.
3. Framework Preset: `Vite`.
4. Add Environment Variables:
   - `VITE_API_URL`: `https://xpressions-api.onrender.com`
   - `VITE_GA_MEASUREMENT_ID`: *Your GA4 Measurement ID*
5. Deploy. Your site is live with global edge CDN caching and automatic HTTPS.

---

## 8. Admin Reports & Data Exports

For the Step 4 analytics assignment, access the authenticated reporting endpoints:

- **Download Submissions CSV:**  
  `GET https://xpressions-api.onrender.com/api/admin/interest.csv`  
  *Headers:* `Authorization: Bearer <ADMIN_TOKEN>`
- **Live Channel Statistics JSON:**  
  `GET https://xpressions-api.onrender.com/api/admin/stats`  
  *Headers:* `Authorization: Bearer <ADMIN_TOKEN>`

