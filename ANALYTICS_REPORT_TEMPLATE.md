# Digital Marketing Campaign Analytics Report (Step 4 Template)

**Project:** Xpressions Microsite Launch  
**Course:** Marketing Management II (Digital Marketing)  
**Academic Cohort:** Group 7, XIMB, XIM University, Bhubaneswar  
**Reporting Window:** `[YYYY-MM-DD]` to `[YYYY-MM-DD]`  

---

## 1. Executive Summary

| Metric | Target Goal | Actual Achieved | % Variance |
| :--- | :--- | :--- | :--- |
| **Total Users** | `1,500` | `[Actual]` | `[+/- %]` |
| **Total Sessions** | `2,200` | `[Actual]` | `[+/- %]` |
| **Primary CTA Click-Through Rate** | `12.0%` | `[Actual %]` | `[+/- %]` |
| **Expressions of Interest Recorded** | `150` | `[Actual]` | `[+/- %]` |
| **Average Engagement Time** | `> 50s` | `[Actual s]` | `[+/- %]` |

---

## 2. Traffic Acquisition by Channel (Source / Medium)

*Data Source: Google Analytics 4 & First-Party Mongo `/api/admin/stats`*

| Source / Medium | Sessions | Engaged Sessions | Engagement Rate | Primary CTA Clicks | Interest Submissions | Conversion Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `instagram / social` | `[Count]` | `[Count]` | `[%]` | `[Count]` | `[Count]` | `[%]` |
| `whatsapp / referral` | `[Count]` | `[Count]` | `[%]` | `[Count]` | `[Count]` | `[%]` |
| `linkedin / social` | `[Count]` | `[Count]` | `[%]` | `[Count]` | `[Count]` | `[%]` |
| `email / newsletter` | `[Count]` | `[Count]` | `[%]` | `[Count]` | `[Count]` | `[%]` |
| `offline_poster / qr` | `[Count]` | `[Count]` | `[%]` | `[Count]` | `[Count]` | `[%]` |
| `(direct) / (none)` | `[Count]` | `[Count]` | `[%]` | `[Count]` | `[Count]` | `[%]` |
| **Total** | `[Sum]` | `[Sum]` | `[Avg %]` | `[Sum]` | `[Sum]` | `[Avg %]` |

---

## 3. CTA Funnel & Drop-Off Analysis

### Stage Conversion Metrics
1. **Landing Session:** `100.0%` (`[Count]` sessions)
2. **Engaged Session (30s+ or scroll 50%+):** `[ %]` (`[Count]` sessions)
3. **Primary CTA Click (`primary_cta_click`):** `[ %]` (`[Count]` sessions)
   - *Hero CTA (`hero_register`):* `[Count]` clicks
   - *Header CTA (`header_register`):* `[Count]` clicks
   - *Sticky Mobile CTA (`sticky_register`):* `[Count]` clicks
   - *Closing Banner CTA (`banner_register`):* `[Count]` clicks
4. **Form Initiated (`form_start`):** `[ %]` (`[Count]` sessions)
5. **Successful Submission (`form_submit_success`):** `[ %]` (`[Count]` submissions)

### Funnel Bottlenecks
*Analyze where the largest drop-off occurred (e.g., between CTA click and form submit, or on mobile viewports).*

---

## 4. Content Engagement & Top Pages

| Route / Section | Page Views | Avg Time on Page | Scroll Depth 75%+ | Outbound Handoffs |
| :--- | :--- | :--- | :--- | :--- |
| `/` (Home) | `[Views]` | `[Time]` | `[%]` | `[Count]` |
| `/competitions` | `[Views]` | `[Time]` | `[%]` | `[Count to Unstop]` |
| `/experience` | `[Views]` | `[Time]` | `[%]` | `[Lightbox opens]` |
| `/plan-your-visit` | `[Views]` | `[Time]` | `[%]` | `[Maps/Luma clicks]` |
| `/faq` | `[Views]` | `[Time]` | `[%]` | `[FAQ expansions]` |

---

## 5. Audience & Device Breakdown

- **Mobile Viewport (< 768px):** `[ %]` of traffic
- **Desktop Viewport (>= 1024px):** `[ %]` of traffic
- **Tablet (768–1023px):** `[ %]` of traffic
- **Interactive Quiz Completion Rate:** `[ %]` of quiz starters completed all 3 questions.
- **Most Matched Stage Vertical:** `[Business / Cultural / Campus / Social]` (`[ %]`)

---

## 6. Strategic Interpretation & Insights

1. **Top Performing Channel:**  
   `[State which source drove the highest conversion rate and why]`
2. **Audience Intent Breakdown:**  
   `[Ratio of Attending vs. Competing submissions in the database]`
3. **Mobile Usability Impact:**  
   `[How the sticky bottom CTA and light performance budget influenced mobile completion]`

---

## 7. Recommended Optimizations for Next Phase

- **Creative Asset Refresh:** Replace placeholder gradient cards with verified high-resolution photography once cleared by student committees.
- **Direct Pass Integration:** As soon as `passesOpen` is enabled, switch hero CTA hierarchy to drive direct traffic to the Luma gateway.
- **Retargeting Strategy:** Follow up with opted-in email subscribers (`updatesOptIn: true`) upon initial competition registrations opening on Unstop.

