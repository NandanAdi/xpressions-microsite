import React from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';

const PRE_FEST_EVENTS = [
  {
    id: 'garba-night',
    title: 'Garba Night',
    tagline: 'Dandiya Beats & Cultural Radiance',
    badge: 'Conducted • Campus Celebration',
    date: 'October 2026',
    venue: 'XIMB Campus Courtyard',
    description:
      'High-energy traditional dandiya beats, dazzling ethnic attire, and campus-wide festive fervor. Students across MBA batches came together under the open sky to kick off the festive semester.',
    photos: [
      {
        src: '/assets/photos/garba-night-1.jpg',
        alt: 'XIMB students celebrating Garba Night with dandiya sticks and festive attire',
        caption: 'The vibrant circle of dandiya dancers at XIMB',
      },
      {
        src: '/assets/photos/garba-night-2.jpg',
        alt: 'Garba Night celebration details and campus lighting',
        caption: 'Festive lights and traditional music beats',
      },
    ],
    tags: ['Traditional Culture', 'Dandiya Raas', 'Campus-Wide', 'Festive Spirit'],
    igLink: 'https://www.instagram.com/ximbxpressions/?hl=en',
  },
  {
    id: 'halloween-night',
    title: 'Halloween Night',
    tagline: 'Spooky Season & Electric Beats',
    badge: 'Conducted • Campus Experience',
    date: 'October 2026',
    venue: 'Campus Grounds, Xavier Square',
    description:
      'Nightmare on Xavier Square! Ghoulish costumes, haunted themed decor, a student runway showdown, and a pulse-pounding DJ set that kept the campus roaring till late night.',
    photos: [
      {
        src: '/assets/photos/halloween-night-1.jpg',
        alt: 'Students dressed in Halloween costumes posing at XIMB Halloween Night',
        caption: 'Creative costume contest winners on the runway',
      },
      {
        src: '/assets/photos/halloween-night-2.jpg',
        alt: 'Halloween Night stage setup, spooky decor and campus DJ crowd',
        caption: 'Haunted arena lighting and student crowd',
      },
    ],
    tags: ['Costume Runway', 'Late-Night DJ', 'Thematic Decor', 'Pop Culture'],
    igLink: 'https://www.instagram.com/ximbxpressions/?hl=en',
  },
];

export default function PreFestEvents() {
  const handleInstagramClick = (eventName) => {
    trackEvent('outbound_click', {
      url: 'https://www.instagram.com/ximbxpressions/?hl=en',
      label: `Instagram - ${eventName}`,
    });
  };

  return (
    <section
      id="campus-buzz"
      className="py-20 bg-navy text-paper relative overflow-hidden border-t border-paper/10"
      aria-label="Pre-Fest Campus Events"
    >
      {/* Background ambient crimson glow */}
      <div
        className="absolute top-1/3 -left-48 w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B91C1C, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-48 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F5B544, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/20 border border-crimson/30 text-amber font-heading font-semibold text-xs uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
            <span>Campus Buzz & Pre-Fest Energy</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-paper mb-4">
            The Stage is <span className="text-teal">Already Set.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-paper/75 leading-relaxed">
            Before the main festival arrives, Team Xpressions brings the campus alive with signature pre-fest nights.
            Here is a look at recent events already conducted at Xavier Square:
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="space-y-16">
          {PRE_FEST_EVENTS.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-2xl bg-paper/[0.03] border border-paper/10 overflow-hidden hover:border-paper/20 transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
                {/* Event Narrative (Col 5) */}
                <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-teal/20 text-white font-semibold font-heading border border-teal/30">
                      {event.badge}
                    </span>
                    <span className="text-paper/60 font-body">
                      {event.date} • {event.venue}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-paper">
                    {event.title}
                  </h3>
                  <p className="text-amber font-heading text-sm font-semibold tracking-wide">
                    {event.tagline}
                  </p>

                  <p className="font-body text-sm sm:text-base text-paper/75 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-paper/5 text-paper/70 border border-paper/10 font-body"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Instagram Link CTA */}
                  <div className="pt-4">
                    <a
                      href={event.igLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleInstagramClick(event.title)}
                      className="inline-flex items-center gap-2 text-sm font-heading font-bold text-amber hover:text-amber/80 underline decoration-amber/40 hover:decoration-amber transition-colors"
                    >
                      <span>See photos on @ximbxpressions</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Event Photos (Col 7) */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-navy/80 border border-paper/10 shadow-md"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-xs text-paper/85 font-body line-clamp-2">
                          {photo.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Arena Moments / Past Concerts Teaser */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-crimson/20 via-navy to-blood/20 border border-paper/15 p-8 text-center space-y-4">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-paper">
            Want to see what happens when 20,000+ students gather?
          </h3>
          <p className="font-body text-sm sm:text-base text-paper/70 max-w-2xl mx-auto">
            From star concerts featuring Amaal Mallik and Sunidhi Chauhan to intense national business case finals, Xpressions is Eastern India’s crown jewel.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/ximbxpressions/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleInstagramClick('Campus Banner')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-teal text-white font-heading font-bold text-sm hover:bg-teal/90 transition-all shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Follow @ximbxpressions on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

