import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CONE_CONFIGS = [
  { color: '#B91C1C', pos: [-2.8, 3.8, -1.2], speed: 0.5, phase: 0, opacity: 0.14 },
  { color: '#F5B544', pos: [2.8, 3.8, -1.2], speed: 0.42, phase: Math.PI / 2, opacity: 0.1 },
  { color: '#991B1B', pos: [-1.2, 4.2, 0.8], speed: 0.36, phase: Math.PI, opacity: 0.13 },
  { color: '#F7F5F0', pos: [1.2, 4.2, 0.8], speed: 0.48, phase: Math.PI * 1.5, opacity: 0.08 },
];

function SpotCone({ color, pos, speed, phase, opacity }) {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * speed + phase) * 0.28;
    groupRef.current.rotation.x = -Math.PI / 7 + Math.sin(t * speed * 0.8 + phase) * 0.1;
  });

  return (
    <group ref={groupRef} position={pos}>
      {/* Outer Volumetric Beam */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.35, 4.5, 12, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Core Beam */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 4.2, 8, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 1.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Spotlights() {
  return (
    <group>
      {CONE_CONFIGS.map((cfg, i) => (
        <SpotCone
          key={i}
          color={cfg.color}
          pos={cfg.pos}
          speed={cfg.speed}
          phase={cfg.phase}
          opacity={cfg.opacity}
        />
      ))}
      <ambientLight color="#07090e" intensity={0.6} />
      <pointLight color="#B91C1C" intensity={1.8} position={[0, 2.5, 1]} distance={9} decay={2} />
      <pointLight color="#F5B544" intensity={0.9} position={[-2, 1.5, 2]} distance={7} decay={2} />
    </group>
  );
}

