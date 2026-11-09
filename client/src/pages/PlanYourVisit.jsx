import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import siteConfig from '../data/siteConfig.json';
import { trackEvent } from '../lib/analytics';

export default function PlanYourVisit() {
  const [loadMap, setLoadMap] = useState(false);

  const handleMapOutbound = () => {
    trackEvent('outbound_click', {
      url: 'https://maps.google.com/?q=Xavier+Institute+of+Management+Bhubaneswar',
      label: 'Google Maps Directions',
    });
  };

  const handleLumaOutbound = () => {
    trackEvent('official_pass_click', {
      url: 'https://luma.com/nb91z633',
      page: '/plan-your-visit',
    });
  };

  return (
    <PageTransition className="pt-24 pb-16">
      <Helmet>
        <title>Plan Your Visit – Xpressions | XIMB Bhubaneswar</title>
        <meta
          name="description"
          content="Venue location, pass procedures, schedule status, and travel guidance for visiting Xpressions at XIMB, Bhubaneswar."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/plan-your-visit" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        {/* Header */}
        <div>
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            Visitor Information
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-paper tracking-tight mt-2 mb-4">
            Plan Your Visit
          </h1>
          <p className="text-base sm:text-lg text-paper/75 font-body leading-relaxed max-w-3xl">
            Everything you need to know about reaching the campus, how entry passes operated in past editions, and verified venue details.
          </p>
        </div>

        {/* 1. Venue & Map Link */}
        <section className="p-8 rounded-2xl bg-paper/[0.03] border border-paper/10 space-y-6" aria-labelledby="venue-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-paper/10 pb-4">
            <h2 id="venue-heading" className="font-heading font-bold text-2xl text-paper">
              Venue Location
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-paper/10 text-paper/70 font-body">
              Venue per the Xpressions'25 listing
            </span>
          </div>

          <div className="space-y-2 font-body text-paper/90">
            <p className="font-heading font-bold text-lg text-amber">
              Xavier Institute of Management (XIMB)
            </p>
            <p className="text-sm sm:text-base text-paper/80">
              Xavier Square, Jayadev Vihar, Bhubaneswar, Odisha 751013
            </p>
          </div>

          {/* Interactive Map Lazy Load or Direct Link */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Xavier+Institute+of+Management+Bhubaneswar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMapOutbound}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-teal text-white font-heading font-bold text-sm hover:bg-teal/90 min-h-[44px] transition-colors"
              >
                <span>Open in Google Maps ↗</span>
              </a>

              {!loadMap && (
                <button
                  type="button"
                  onClick={() => setLoadMap(true)}
                  className="px-5 py-3 rounded-md border border-paper/20 text-paper/80 font-heading font-semibold text-sm hover:bg-paper/5 min-h-[44px] transition-colors"
                >
                  Load Interactive Map Embed
                </button>
              )}
            </div>

            {loadMap && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-paper/15 mt-4">
                <iframe
                  title="XIMB Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.067425121404!2d85.81977757523689!3d20.297424181177656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909e46a7888b5%3A0xc48ad956f50b2b80!2sXavier%20Institute%20of%20Management%20(XIM%20University)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            <p className="text-xs text-paper/40 italic">
              Note: Travel guidance is provided via the official map navigation link above. No estimated distances are hard-coded to avoid inaccuracies.
            </p>
          </div>
        </section>

        {/* 2. Schedule Block */}
        <section className="p-8 rounded-2xl bg-paper/[0.03] border border-paper/10 space-y-4" aria-labelledby="schedule-heading">
          <div className="flex items-center justify-between border-b border-paper/10 pb-4">
            <h2 id="schedule-heading" className="font-heading font-bold text-2xl text-paper">
              Festival Schedule
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-paper/10 text-paper/70 font-body">
              Status: To be announced
            </span>
          </div>

          {siteConfig.scheduleAvailable ? (
            <p className="text-paper/80 font-body">Confirmed schedule will appear here.</p>
          ) : (
            <div className="p-6 rounded-xl bg-paper/[0.02] border border-paper/5 text-center space-y-2">
              <p className="font-heading font-bold text-paper text-lg">Details to be announced</p>
              <p className="text-xs sm:text-sm text-paper/60 font-body max-w-md mx-auto">
                Day-wise schedules and event timings will be published as soon as the official student committee releases the itinerary.
              </p>
            </div>
          )}
        </section>

        {/* 3. Pass Rules (2025 Historical Reference) */}
        <section className="p-8 rounded-2xl bg-paper/[0.03] border border-paper/10 space-y-6" aria-labelledby="passes-heading">
          <div className="space-y-2 border-b border-paper/10 pb-4">
            <div className="inline-block px-3 py-1 rounded bg-amber/15 text-amber text-xs font-heading font-bold uppercase tracking-wider">
              Past edition, for reference. Do not assume these rules apply to the next edition.
            </div>
            <h2 id="passes-heading" className="font-heading font-bold text-2xl text-paper">
              How Passes Worked in 2025
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-body text-paper/80">
            <div className="p-4 rounded-xl bg-paper/5 space-y-1">
              <p className="font-heading font-bold text-paper text-sm">Pass Pricing</p>
              <p className="text-paper/70">Free of charge. Festival passes were not for sale.</p>
            </div>
            <div className="p-4 rounded-xl bg-paper/5 space-y-1">
              <p className="font-heading font-bold text-paper text-sm">Platform & Ticketing</p>
              <p className="text-paper/70">Registration was managed on Luma with separate passes per day.</p>
            </div>
            <div className="p-4 rounded-xl bg-paper/5 space-y-1">
              <p className="font-heading font-bold text-paper text-sm">ID & Limits</p>
              <p className="text-paper/70">Strictly one pass per government or student ID; waitlist opened upon capacity.</p>
            </div>
            <div className="p-4 rounded-xl bg-paper/5 space-y-1">
              <p className="font-heading font-bold text-paper text-sm">Campus Entry Rules</p>
              <p className="text-paper/70">Single entry with no re-entry. Current XIM students entered with their college ID card.</p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://luma.com/nb91z633"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLumaOutbound}
              className="inline-flex items-center gap-2 text-xs font-heading font-bold text-teal hover:underline min-h-[40px]"
            >
              <span>View Historical 2025 Luma Listing ↗</span>
            </a>
          </div>
        </section>

        {/* 4. Accommodation & Accessibility */}
        <section className="p-8 rounded-2xl bg-paper/[0.03] border border-paper/10 space-y-4" aria-labelledby="logistics-heading">
          <h2 id="logistics-heading" className="font-heading font-bold text-2xl text-paper border-b border-paper/10 pb-4">
            Accommodation & Accessibility
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-body text-paper/70">
            <div className="p-4 rounded-xl bg-paper/5 space-y-1">
              <p className="font-heading font-bold text-paper text-sm">Accommodation Status</p>
              <p>Details to be announced by the fest hospitality desk for outstation participants.</p>
            </div>
            <div className="p-4 rounded-xl bg-paper/5 space-y-1">
              <p className="font-heading font-bold text-paper text-sm">Campus Accessibility</p>
              <p>Details to be announced regarding designated entry points and venue ramp accessibility.</p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
