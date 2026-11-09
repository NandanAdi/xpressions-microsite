import React, { useState } from 'react';
import { trackEvent } from '../../lib/analytics';

export default function VideoFacade({
  videoId = 'dQw4w9WgXcQ',
  title = 'Xpressions Aftermovie & Stage Highlights',
  thumbnailUrl,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent('video_play', { video_id: videoId });
  };

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-navy border border-paper/15 shadow-2xl">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-navy via-navy/90 to-teal/30">
          {/* Background image if provided */}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              loading="lazy"
              decoding="async"
            />
          )}

          {/* Click to load facade button */}
          <div className="relative z-10 text-center space-y-4 p-6">
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Play video: ${title}`}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-teal text-white flex items-center justify-center mx-auto shadow-2xl hover:bg-teal/90 hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
            <div>
              <p className="font-heading font-bold text-lg sm:text-xl text-paper">
                {title}
              </p>
              <p className="text-xs text-paper/60 font-body mt-1">
                Click to load video (saves mobile bandwidth)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

