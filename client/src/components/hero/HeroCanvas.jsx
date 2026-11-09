import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import XStage from '../../three/XStage';
import Spotlights from '../../three/Spotlights';
import Particles from '../../three/Particles';
import CameraRig from '../../three/CameraRig';

export default function HeroCanvas({ containerRef }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [dpr, setDpr] = useState(
    isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2)
  );
  const [isVisible, setIsVisible] = useState(true);

  // Tab visibility check
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // IntersectionObserver check: stop rendering when hero is off-screen
  useEffect(() => {
    if (!containerRef?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  const handleDecline = useCallback(() => {
    setDpr((current) => Math.max(current - 0.25, 0.85));
  }, []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={isVisible ? 'always' : 'never'}
      camera={{ position: [0, 0, 5.5], fov: 48, near: 0.1, far: 50 }}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <PerformanceMonitor
        onDecline={handleDecline}
        flipflops={2}
        threshold={[0.65, 0.9]}
      >
        <Suspense fallback={null}>
          <CameraRig>
            <Spotlights />
            <XStage />
            <Particles />
          </CameraRig>
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}

