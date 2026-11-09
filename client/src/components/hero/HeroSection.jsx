import React, { useState, useEffect, useRef } from 'react';
import { canRenderWebGL } from './canDetectWebGL';
import HeroFallback, { HeroContent } from './HeroFallback';

export default function HeroSection() {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [CanvasComponent, setCanvasComponent] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const attempt3DLoad = () => {
      if (!canRenderWebGL()) {
        return;
      }

      // Lazy load HeroCanvas after first paint and idle
      import('./HeroCanvas')
        .then((module) => {
          setCanvasComponent(() => module.default);
          setShouldRender3D(true);
        })
        .catch(() => {
          // Fallback seamlessly retained
        });
    };

    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(attempt3DLoad, { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(attempt3DLoad, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-navy overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 35%, rgba(185, 28, 28, 0.28) 0%, rgba(7, 9, 14, 0.86) 60%, #07090E 100%), url('/assets/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Find your stage at Xpressions – Flagship Fest of XIMB"
    >
      {/* Subtle concert stage dark overlay tint */}
      <div className="absolute inset-0 bg-navy/60 backdrop-brightness-[0.85] pointer-events-none" aria-hidden="true" />

      {/* 3D WebGL Canvas Layer (aria-hidden, purely decorative) */}
      {shouldRender3D && CanvasComponent ? (
        <CanvasComponent containerRef={sectionRef} />
      ) : (
        /* CSS-only decorative fallback */
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25" aria-hidden="true">
          <div className="relative w-72 sm:w-96 h-72 sm:h-96 x-motif-pulse">
            <div
              className="absolute top-1/2 left-0 right-0 h-16 sm:h-20 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, transparent, #B91C1C, transparent)',
                transform: 'translateY(-50%) rotate(-45deg)',
              }}
            />
            <div
              className="absolute top-1/2 left-0 right-0 h-16 sm:h-20 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, transparent, #B91C1C, transparent)',
                transform: 'translateY(-50%) rotate(45deg)',
              }}
            />
          </div>
        </div>
      )}

      {/* Spotlight ambient background accents - deep red & amber */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #B91C1C, transparent 70%)' }} />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #F5B544, transparent 70%)' }} />
      </div>

      {/* HTML Content Overlay: Accessible and instant first paint */}
      <div className="relative z-10 w-full pt-20 pb-12 sm:pt-24">
        <HeroContent />
      </div>
    </section>
  );
}

