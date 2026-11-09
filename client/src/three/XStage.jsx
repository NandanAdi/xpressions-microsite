import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createXShape() {
  const shape1 = new THREE.Shape();
  const w = 0.28;
  const l = 1.35;

  shape1.moveTo(-l, -w);
  shape1.lineTo(-l, w);
  shape1.lineTo(l, w);
  shape1.lineTo(l, -w);
  shape1.closePath();

  const shape2 = new THREE.Shape();
  shape2.moveTo(-w, -l);
  shape2.lineTo(w, -l);
  shape2.lineTo(w, l);
  shape2.lineTo(-w, l);
  shape2.closePath();

  return [shape1, shape2];
}

export default function XStage() {
  const xGroupRef = useRef(null);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    }),
    []
  );

  const [shape1, shape2] = useMemo(() => createXShape(), []);
  const geo1 = useMemo(() => new THREE.ExtrudeGeometry(shape1, extrudeSettings), [shape1, extrudeSettings]);
  const geo2 = useMemo(() => new THREE.ExtrudeGeometry(shape2, extrudeSettings), [shape2, extrudeSettings]);

  useFrame((state, delta) => {
    if (xGroupRef.current) {
      xGroupRef.current.rotation.y += delta * 0.45;
      xGroupRef.current.position.y = 0.25 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Platform Stage Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#0c121e" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* Raised Stage Tier 1 */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[6.5, 0.2, 2.8]} />
        <meshStandardMaterial color="#141c2c" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Raised Stage Tier 2 */}
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[4.2, 0.15, 2.0]} />
        <meshStandardMaterial color="#1a253a" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Floating Extruded X (Centerpiece) */}
      <group ref={xGroupRef} position={[0, 0.3, 0]}>
        <mesh geometry={geo1} position={[0, 0, -0.1]}>
          <meshStandardMaterial
            color="#B91C1C"
            emissive="#7F1D1D"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh geometry={geo2} position={[0, 0, -0.1]}>
          <meshStandardMaterial
            color="#B91C1C"
            emissive="#7F1D1D"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

