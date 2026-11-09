import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import EventFinder from '../components/competitions/EventFinder';
import PerformancesBlock from '../components/competitions/PerformancesBlock';
import siteConfig from '../data/siteConfig.json';

export default function Competitions() {
  return (
    <PageTransition className="pt-24 pb-16">
      <Helmet>
        <title>Competitions & Performances – Xpressions | XIMB</title>
        <meta
          name="description"
          content="Explore all competitions across Business, Stage and Cultural, Campus and Fun, and Social verticals at Xpressions, XIMB."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/competitions" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper/5 border border-paper/10 text-xs text-amber font-heading font-semibold uppercase tracking-wider mb-3">
            <span>Verified Archives</span>
            <span>·</span>
            <span>Last checked: {siteConfig.lastChecked}</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-paper tracking-tight mb-4">
            Competitions & Events
          </h1>
          <p className="text-base sm:text-lg text-paper/75 font-body leading-relaxed">
            Search events across all four worlds. Note: Competition registration normally runs on Unstop; team sizes, rules, fees, deadlines, and prizes change annually and will link to live listings once announced.
          </p>
        </div>

        {/* Event Finder (Search + Categories + Cards) */}
        <EventFinder />

        {/* Performances & Pro-Nights Block */}
        <PerformancesBlock />
      </div>
    </PageTransition>
  );
}
