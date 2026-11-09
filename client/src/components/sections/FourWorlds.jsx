import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../ui/Chip';
import { trackEvent } from '../../lib/analytics';

const WORLDS = [
  {
    id: 'Business',
    name: 'Business',
    color: '#007F82',
    accentBorder: 'border-teal/40 hover:border-teal',
    bgBadge: 'bg-teal',
    tagline: 'High-stakes case battles, equity pitches & strategy simulations',
    description: 'Where India’s brightest minds spar over market entries, M&A dilemmas, and disruptive business roadmaps.',
    events: ['Jack of All Trades', 'XIM MUN', 'Trade Wars', 'FinBid', 'Ad Valorem', 'Maven'],
    badge: 'Flagship Vertical',
  },
  {
    id: 'Stage and Cultural',
    name: 'Stage and Cultural',
    color: '#713F82',
    accentBorder: 'border-plum/40 hover:border-plum',
    bgBadge: 'bg-plum',
    tagline: 'Spotlights, bands, runway fashion & electric crowd roar',
    description: 'The amphitheatre and main stage ignite with competitive dance, battle of bands, theatrical drama, and stand-up.',
    events: ['Decibelz', 'Thirkan', 'Goonj', 'Rap It Up', 'Carnival de Vogue', 'Punchline'],
    badge: 'Live Showcase',
  },
  {
    id: 'Campus and Fun',
    name: 'Campus and Fun',
    color: '#245A9C',
    accentBorder: 'border-blue/40 hover:border-blue',
    bgBadge: 'bg-blue',
    tagline: 'Informal stalls, bungee challenges & midnight campus energy',
    description: 'Fast-paced carnival games, team challenges, food stalls, and the unmistakable buzz of campus fest life.',
    events: ['Informal Games', 'Zorbing', 'Bungee Basketball', 'Rifle Shooting', 'Stall Exhibits'],
    badge: 'Festival Vibe',
  },
  {
    id: 'Social',
    name: 'Social',
    color: '#2F6B45',
    accentBorder: 'border-green/40 hover:border-green',
    bgBadge: 'bg-green',
    tagline: 'Purpose-driven initiatives moving hearts and community',
    description: 'Channeling festival energy toward social responsibility and community empowerment in Bhubaneswar.',
    events: ['X-Athon (Pre-fest Run for a Cause)', 'X-Enable (Celebrating Specially-Abled Children)'],
    badge: 'Impact',
  },
];

function WorldCard({ world }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    // Disable tilt on touch / reduced motion
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 8;
    const ry = (x / (rect.width / 2)) * 8;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setIsHovered(false);
  };

  const handleCardClick = () => {
    trackEvent('filter_used', { filter_value: world.id, source: 'four_worlds' });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="h-full"
    >
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`h-full rounded-2xl bg-paper/[0.04] border ${world.accentBorder} p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-lg relative overflow-hidden`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Chip category={world.name} />
            <span className="text-[11px] font-heading font-semibold text-paper/50 uppercase tracking-wider">
              {world.badge}
            </span>
          </div>

          <h3 className="font-heading font-black text-2xl text-paper tracking-tight">
            {world.name}
          </h3>

          <p className="text-sm font-heading font-semibold text-amber">
            {world.tagline}
          </p>

          <p className="text-sm text-paper/70 font-body leading-relaxed">
            {world.description}
          </p>

          <div className="pt-2">
            <p className="text-xs uppercase font-heading font-bold tracking-wider text-paper/40 mb-2">
              Featured Events (Past Edition)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {world.events.map((ev, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-paper/5 text-paper/80 font-body border border-paper/10"
                >
                  {ev}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-paper/10">
          <Link
            to={`/competitions?category=${encodeURIComponent(world.id)}`}
            onClick={handleCardClick}
            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-paper hover:text-amber transition-colors"
          >
            <span>Explore {world.name} Events</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FourWorlds() {
  return (
    <section className="py-20 bg-navy" aria-label="The Four Worlds of Xpressions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            The Spectrum
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-paper tracking-tight mt-2 mb-4">
            Four Worlds. Endless Possibilities.
          </h2>
          <p className="text-base sm:text-lg text-paper/70 font-body">
            Whether you command the boardroom case, mesmerise on the stage, dive into campus carnivals, or champion social change — there is a stage for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WORLDS.map((w) => (
            <WorldCard key={w.id} world={w} />
          ))}
        </div>
      </div>
    </section>
  );
}

