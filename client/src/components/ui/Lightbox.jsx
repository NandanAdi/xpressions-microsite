import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_GRADIENTS = {
  'Business': 'from-teal/30 to-navy',
  'Stage and Cultural': 'from-plum/30 to-navy',
  'Campus and Fun': 'from-blue/30 to-navy',
  'Social': 'from-green/30 to-navy',
};

export default function Lightbox({ photos = [], index = 0, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const photo = photos[index];

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((index + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((index - 1 + photos.length) % photos.length);
      } else if (e.key === 'Tab') {
        // Focus trap
        const focusable = dialogRef.current?.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [index, onClose, onNavigate, photos.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  const gradient = CATEGORY_GRADIENTS[photo.category] || 'from-teal/30 to-navy';

  return (
    <AnimatePresence>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo details: ${photo.alt}`}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl w-full bg-navy border border-paper/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Close */}
          <div className="flex items-center justify-between p-4 border-b border-paper/10 bg-navy/80">
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-amber">
              {photo.category} · {photo.edition}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full text-paper hover:bg-paper/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Visual Display: Gradient Placeholder or Image */}
          <div className="relative aspect-video w-full bg-navy flex items-center justify-center overflow-hidden">
            {photo.placeholder ? (
              <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-8 text-center`}>
                <div className="w-16 h-16 rounded-2xl bg-paper/10 flex items-center justify-center mb-4 text-paper/70">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <p className="font-heading font-bold text-lg text-paper mb-1">
                  {photo.alt}
                </p>
                <p className="text-xs text-paper/60 font-body">
                  Tasteful placeholder. Official image asset to be verified in Step 4.
                </p>
              </div>
            ) : (
              <img
                src={photo.src || `/assets/photos/${photo.id}.webp`}
                alt={photo.alt}
                className="w-full h-full object-contain max-h-[70vh] bg-navy"
                loading="lazy"
                decoding="async"
              />
            )}

            {/* Prev / Next controls */}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy/70 text-paper hover:bg-navy border border-paper/15 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((index + 1) % photos.length)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy/70 text-paper hover:bg-navy border border-paper/15 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Caption & Metadata */}
          <div className="p-4 sm:p-5 bg-navy/90 border-t border-paper/10 text-xs sm:text-sm text-paper/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-body">
            <div>
              <p className="font-medium text-paper">{photo.alt}</p>
              <p className="text-paper/50 text-xs mt-0.5">{photo.credit}</p>
            </div>
            <span className="text-paper/40 text-xs">
              {index + 1} of {photos.length}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

