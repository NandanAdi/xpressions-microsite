import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import eventsData from '../../data/events.json';
import EventCard from '../ui/EventCard';
import { trackEvent } from '../../lib/analytics';

const CATEGORIES = [
  'All',
  'Business',
  'Stage and Cultural',
  'Campus and Fun',
  'Social',
];

export default function EventFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state if URL search param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams, { replace: true });
    trackEvent('filter_used', { filter_value: cat, source: 'event_finder' });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.length >= 3) {
      trackEvent('filter_used', { filter_value: val, source: 'event_search' });
    }
  };

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        event.name.toLowerCase().includes(q) ||
        event.oneLine.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls: Search Bar & Filter Chips */}
      <div className="p-6 rounded-2xl bg-paper/[0.03] border border-paper/10 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="event-search" className="sr-only">
            Search competitions and events
          </label>
          <input
            id="event-search"
            type="search"
            placeholder="Search by event name, keyword, or domain..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-5 py-3.5 pl-12 rounded-xl bg-navy border border-paper/20 text-paper placeholder-paper/40 font-body text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/40"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter events by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all min-h-[40px] ${
                selectedCategory === cat
                  ? 'bg-amber text-navy shadow-md shadow-amber/20'
                  : 'bg-paper/5 text-paper/70 hover:bg-paper/10 border border-paper/10 hover:text-paper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count indicator */}
        <div className="flex items-center justify-between text-xs text-paper/50 pt-1">
          <span>
            Showing <strong className="text-paper">{filteredEvents.length}</strong> event{filteredEvents.length === 1 ? '' : 's'}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-amber hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-paper/[0.02] border border-paper/10 p-8 space-y-3">
          <p className="font-heading font-bold text-xl text-paper">No events match your criteria</p>
          <p className="text-sm text-paper/60 font-body">Try clearing your search query or selecting a different category.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-md bg-teal text-white font-heading font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

