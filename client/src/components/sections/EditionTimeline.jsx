import React from 'react';
import timelineData from '../../data/timeline.json';

export default function EditionTimeline() {
  return (
    <section className="py-16 bg-navy relative" aria-label="Edition by edition historical timeline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            The Chronicle
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-paper tracking-tight mt-1">
            Edition by Edition History
          </h2>
          <p className="text-xs text-paper/50 mt-2 font-body">
            Verified historical records from official releases, brochures, and media reports.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-teal/40 space-y-12">
          {timelineData.map((item, index) => (
            <div key={index} className="relative group">
              {/* Dot on timeline */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-navy border-2 border-amber group-hover:scale-125 transition-transform"
                aria-hidden="true"
              />

              <div className="p-5 sm:p-6 rounded-xl bg-paper/[0.03] border border-paper/10 hover:border-paper/25 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-black text-xl sm:text-2xl text-paper">
                      {item.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-teal/20 text-teal font-heading font-semibold">
                      {item.year}
                    </span>
                  </div>
                  <span className="text-xs text-paper/40 italic">
                    Source: {item.source}
                  </span>
                </div>

                <p className="text-xs text-amber font-heading font-semibold mb-3">
                  Dates: {item.dates}
                </p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-paper/75 font-body">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal font-bold leading-none mt-1">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

