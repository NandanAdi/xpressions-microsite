import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export default function CameraRig({ children }) {
  const { camera } = useThree();
  const targetPos = useRef({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!isTouchRef.current) {
      const handlePointerMove = (e) => {
        targetPos.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 1.5,
          y: -(e.clientY / window.innerHeight - 0.5) * 0.8,
        };
      };
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      return () => window.removeEventListener('mousemove', handlePointerMove);
    }
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    let targetX, targetY;

    if (isTouchRef.current) {
      // Gentle auto-drift for mobile / touch
      targetX = Math.sin(t * 0.2) * 0.35;
      targetY = Math.cos(t * 0.15) * 0.15;
    } else {
      targetX = targetPos.current.x;
      targetY = targetPos.current.y;
    }

    // Smooth dampening
    const factor = Math.min(delta * 2.5, 0.12);
    camera.position.x += (targetX - camera.position.x) * factor;
    camera.position.y += (targetY - camera.position.y) * factor;
    camera.position.z = 5.5;
    camera.lookAt(0, 0, 0);
  });

  return <>{children}</>;
}

