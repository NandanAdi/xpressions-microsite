import React from 'react';

const COLLEGES = [
  'IIMs',
  'XLRI',
  'MICA',
  'IRMA',
  'Great Lakes',
  'IMT',
  'KIIT',
  'Ravenshaw',
  'ITER',
];

export default function HighlightsStrip() {
  return (
    <section className="py-14 bg-navy/80 border-b border-paper/10" aria-label="Participation legacy and reach">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            National Footprint
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-paper tracking-tight mt-1">
            Colleges That Have Taken The Stage
          </h2>
          <p className="text-xs text-paper/50 mt-1.5 font-body">
            Verified participation documented in collegiate media & past placement reports
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {COLLEGES.map((college, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-xl bg-paper/[0.04] border border-paper/10 text-paper/90 font-heading font-bold text-sm sm:text-base flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
              <span>{college}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

