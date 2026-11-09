import React from 'react';
import siteConfig from '../../data/siteConfig.json';

const PERFORMANCES = [
  {
    title: 'Celeblitz (Celebrity Night)',
    status: siteConfig.lineupAnnounced ? 'Confirmed' : 'Lineup to be announced',
    description: 'The premier concert night closing Xpressions. Past editions featured India’s top artists.',
    tag: 'Flagship Night',
  },
  {
    title: 'Comedy Night',
    status: siteConfig.lineupAnnounced ? 'Confirmed' : 'Lineup to be announced',
    description: 'An evening of top-tier stand-up laughter featuring acclaimed national comedians.',
    tag: 'Pro Show',
  },
  {
    title: 'EDM Night',
    status: siteConfig.lineupAnnounced ? 'Confirmed' : 'Lineup to be announced',
    description: 'High-energy electronic dance music, lighting stages, and crowd drops.',
    tag: 'Live Set',
  },
  {
    title: 'Distinguished Speakers & Attractions',
    status: 'To be announced',
    description: 'Keynotes, fireside leadership sessions, and interactive experiential zones on campus.',
    tag: 'Conclave',
  },
];

export default function PerformancesBlock() {
  return (
    <section className="py-16 border-t border-paper/10 mt-16" aria-label="Performances and Pro-Nights">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-plum">
            Stage & Pro-Nights
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-paper tracking-tight mt-1">
            Performances & Attractions
          </h2>
          <p className="text-sm text-paper/70 font-body mt-2">
            Details for upcoming edition nights will be revealed once officially confirmed by the organising committee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFORMANCES.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-paper/[0.03] border border-paper/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber px-2.5 py-1 rounded bg-amber/10 inline-block">
                  {p.tag}
                </span>
                <h3 className="font-heading font-black text-xl text-paper">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-paper/70 font-body leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-paper/10 flex items-center justify-between">
                <span className="text-xs font-heading font-bold text-teal">
                  Status:
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-paper/10 text-paper/80 font-body">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

