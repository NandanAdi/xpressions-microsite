import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 220; // Well within 250-300 budget

export default function Particles() {
  const pointsRef = useRef(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.0025 + 0.0008; // upward drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    const t = clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      array[idx] += velocities[idx] + Math.sin(t * 0.4 + i) * 0.0006;
      array[idx + 1] += velocities[idx + 1];
      array[idx + 2] += velocities[idx + 2] + Math.cos(t * 0.3 + i) * 0.0006;

      // Wrap around
      if (array[idx + 1] > 4.5) array[idx + 1] = -2.5;
      if (Math.abs(array[idx]) > 6.5) array[idx] *= -0.95;
      if (Math.abs(array[idx + 2]) > 3.5) array[idx + 2] *= -0.95;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F7F5F0"
        size={0.035}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

