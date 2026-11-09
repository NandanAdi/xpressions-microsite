import React, { useState } from 'react';
import Chip from './Chip';
import siteConfig from '../../data/siteConfig.json';
import { trackEvent } from '../../lib/analytics';

export default function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    const nextState = !expanded;
    setExpanded(nextState);
    if (nextState) {
      trackEvent('event_card_open', {
        event_id: event.id,
        category: event.category,
      });
    }
  };

  const isRegistrationLive =
    siteConfig.competitionRegistrationOpen && Boolean(event.registrationUrl);

  const handleRegisterClick = () => {
    trackEvent('competition_registration_click', {
      event_id: event.id,
      page: window.location.pathname,
    });
  };

  return (
    <article
      className="rounded-xl bg-paper/[0.04] border border-paper/10 hover:border-paper/20 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm"
      aria-label={`Event details: ${event.name}`}
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Badges / Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Chip category={event.category} />
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-paper/10 text-paper/70 font-body">
            {event.edition}, for reference
          </span>
        </div>

        {/* Title & One-liner */}
        <div>
          <h3 className="font-heading font-bold text-xl text-paper tracking-tight">
            {event.name}
          </h3>
          <p className="mt-2 text-sm text-paper/75 leading-relaxed font-body">
            {event.oneLine}
          </p>
        </div>

        {/* Organiser if any */}
        {event.organiser && (
          <p className="text-xs text-paper/50">
            <span className="font-semibold text-paper/70">Organiser:</span> {event.organiser}
          </p>
        )}

        {/* Collapsible details */}
        {expanded && (
          <div className="pt-3 border-t border-paper/10 text-xs space-y-2 text-paper/70 font-body">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-semibold text-paper/90">Eligibility:</span>{' '}
                {event.eligibility}
              </div>
              <div>
                <span className="font-semibold text-paper/90">Team Size:</span>{' '}
                {event.teamSize}
              </div>
              <div>
                <span className="font-semibold text-paper/90">Format:</span>{' '}
                {event.format}
              </div>
              <div>
                <span className="font-semibold text-paper/90">Deadline:</span>{' '}
                {event.deadline}
              </div>
              <div>
                <span className="font-semibold text-paper/90">Fee:</span>{' '}
                {event.fee}
              </div>
              <div>
                <span className="font-semibold text-paper/90">Prize Pool:</span>{' '}
                {event.prize}
              </div>
            </div>
            <p className="pt-2 text-[11px] text-paper/40 italic">
              Verified per official archives. Upcoming edition rules will be updated when released on Unstop.
            </p>
          </div>
        )}
      </div>

      {/* Card Footer / Action */}
      <div className="p-5 sm:p-6 pt-0 border-t border-paper/5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={toggleDetails}
          aria-expanded={expanded}
          className="text-xs text-amber font-heading font-semibold hover:underline flex items-center gap-1 min-h-[38px] px-2 py-1"
        >
          {expanded ? 'Hide specifications ▲' : 'View specifications ▼'}
        </button>

        <div className="w-full sm:w-auto">
          {isRegistrationLive ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegisterClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-teal text-white font-heading font-bold text-xs hover:bg-teal/90 min-h-[44px] transition-colors"
            >
              Register on Unstop ↗
            </a>
          ) : (
            <button
              disabled
              aria-disabled="true"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-paper/5 text-paper/40 font-heading font-semibold text-xs border border-paper/10 cursor-not-allowed min-h-[44px]"
            >
              Details to be announced
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

