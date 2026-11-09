import React, { useState } from 'react';
import photosData from '../../data/photos.json';
import Chip from '../ui/Chip';
import Lightbox from '../ui/Lightbox';
import { trackEvent } from '../../lib/analytics';

const CATEGORIES = ['All', 'Business', 'Stage and Cultural', 'Campus and Fun', 'Social'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const filteredPhotos =
    selectedCategory === 'All'
      ? photosData
      : photosData.filter((p) => p.category === selectedCategory);

  const handleFilterChange = (cat) => {
    setSelectedCategory(cat);
    trackEvent('filter_used', { filter_value: cat, source: 'gallery' });
  };

  const handlePhotoClick = (index) => {
    const actualIndex = photosData.indexOf(filteredPhotos[index]);
    setActivePhotoIndex(actualIndex >= 0 ? actualIndex : 0);
    trackEvent('gallery_open', { photo_id: filteredPhotos[index].id });
  };

  return (
    <section className="py-16 bg-navy" aria-label="Fest Highlights Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
              Moments Captured
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-paper tracking-tight mt-1">
              Festival Photo Gallery
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterChange(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all min-h-[38px] ${
                  selectedCategory === cat
                    ? 'bg-amber text-navy'
                    : 'bg-paper/5 text-paper/70 hover:bg-paper/10 border border-paper/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => handlePhotoClick(idx)}
              className="text-left rounded-xl bg-paper/[0.03] border border-paper/10 hover:border-paper/25 overflow-hidden group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              aria-label={`View photo: ${photo.alt}`}
            >
              <div className="aspect-video w-full bg-navy relative overflow-hidden flex items-center justify-center">
                {photo.src ? (
                  <>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <Chip category={photo.category} />
                    </div>
                  </>
                ) : (
                  /* Visual placeholder gradient */
                  <div className="w-full h-full bg-gradient-to-br from-paper/10 to-navy p-6 flex flex-col justify-end group-hover:scale-105 transition-transform duration-300">
                    <div className="space-y-1">
                      <Chip category={photo.category} />
                      <p className="text-xs text-paper font-heading font-bold mt-2 line-clamp-1">
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 flex items-center justify-between text-xs text-paper/50">
                <span>{photo.edition}</span>
                <span className="text-amber font-heading font-semibold group-hover:underline">Expand ↗</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <Lightbox
          photos={photosData}
          index={activePhotoIndex}
          onClose={() => setActivePhotoIndex(null)}
          onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
        />
      )}
    </section>
  );
}

