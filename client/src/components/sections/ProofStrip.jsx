import React from 'react';
import CountUp from '../ui/CountUp';

export default function ProofStrip() {
  return (
    <section className="py-12 bg-navy border-b border-paper/10" aria-label="Festival track record and figures">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
          <div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-paper tracking-tight">
              A Legacy of Scale
            </h2>
            <p className="text-xs text-amber font-heading font-semibold uppercase tracking-wider mt-1">
              Xpressions'22, January 2023, official XIMB figures
            </p>
          </div>
          <p className="text-xs text-paper/40 italic">
            Also: Xpressions 2018 reported 25,000+ attendees & 40+ media houses (official placement brochure)
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-xl bg-paper/[0.03] border border-paper/10">
            <p className="font-heading font-black text-3xl sm:text-4xl text-teal mb-1">
              <CountUp end={25} suffix="th" />
            </p>
            <p className="text-xs font-heading font-bold text-paper/90 uppercase tracking-wide">Edition</p>
            <p className="text-[11px] text-paper/40 mt-1">Milestone in Jan '23</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-paper/[0.03] border border-paper/10">
            <p className="font-heading font-black text-3xl sm:text-4xl text-amber mb-1">
              <CountUp end={40000} suffix="+" />
            </p>
            <p className="text-xs font-heading font-bold text-paper/90 uppercase tracking-wide">Footfall</p>
            <p className="text-[11px] text-paper/40 mt-1">Over 3 fest days</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-paper/[0.03] border border-paper/10">
            <p className="font-heading font-black text-3xl sm:text-4xl text-paper mb-1">
              <CountUp end={36} suffix="+" />
            </p>
            <p className="text-xs font-heading font-bold text-paper/90 uppercase tracking-wide">Events</p>
            <p className="text-[11px] text-paper/40 mt-1">Across 4 verticals</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-paper/[0.03] border border-paper/10">
            <p className="font-heading font-black text-3xl sm:text-4xl text-teal mb-1">
              <CountUp end={20} suffix="+" />
            </p>
            <p className="text-xs font-heading font-bold text-paper/90 uppercase tracking-wide">Institutes</p>
            <p className="text-[11px] text-paper/40 mt-1">Top B-schools & colleges</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-paper/[0.03] border border-paper/10">
            <p className="font-heading font-black text-3xl sm:text-4xl text-amber mb-1">
              <CountUp end={10} prefix="₹" suffix="L" />
            </p>
            <p className="text-xs font-heading font-bold text-paper/90 uppercase tracking-wide">Prizes</p>
            <p className="text-[11px] text-paper/40 mt-1">'22 edition prize pool</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-paper/[0.03] border border-paper/10">
            <p className="font-heading font-black text-3xl sm:text-4xl text-paper mb-1">
              <CountUp end={29} />
            </p>
            <p className="text-xs font-heading font-bold text-paper/90 uppercase tracking-wide">Sponsors</p>
            <p className="text-[11px] text-paper/40 mt-1">Brand partners in '22</p>
          </div>
        </div>
      </div>
    </section>
  );
}

