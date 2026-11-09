import React from 'react';

export default function Marquee({ items = [], label = 'Past Celeblitz headliners' }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-6 border-y border-paper/10 bg-navy/60 overflow-hidden" aria-label={label}>
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
        <span className="text-xs uppercase font-heading font-bold tracking-widest text-amber">
          ★ {label}
        </span>
        <span className="text-[11px] text-paper/40 italic">
          Historical reference · Sources: Media & Placement brochures
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex mask-radial">
        <div className="flex gap-8 items-center marquee-track whitespace-nowrap will-change-transform">
          {items.map((item, idx) => (
            <div
              key={`h1-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-paper/5 border border-paper/10 text-paper/90 text-sm font-heading font-bold"
            >
              <span className="text-amber">✦</span>
              <span>{item.name}</span>
              <span className="text-xs font-normal text-paper/50">
                ({item.year})
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div className="flex gap-8 items-center marquee-track whitespace-nowrap will-change-transform" aria-hidden="true">
          {items.map((item, idx) => (
            <div
              key={`h2-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-paper/5 border border-paper/10 text-paper/90 text-sm font-heading font-bold"
            >
              <span className="text-amber">✦</span>
              <span>{item.name}</span>
              <span className="text-xs font-normal text-paper/50">
                ({item.year})
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

