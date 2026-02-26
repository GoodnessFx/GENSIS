'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const StarStrike = ({ position }: { position: [number, number, number] }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = position[0];
      positions[i * 3 + 1] = position[1] + 10;
      positions[i * 3 + 2] = position[2];
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = -Math.random() * 0.2;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return { positions, velocities };
  }, [position]);

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particles.positions.length / 3; i++) {
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
        if (positions[i * 3 + 1] < position[1]) {
          positions[i * 3 + 1] = position[1] + 10;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles.positions}>
      <PointMaterial
        transparent
        color="#ffcc00"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export const Fireworks = ({ position }: { position: [number, number, number] }) => {
  // Simple fireworks implementation
  return (
    <group position={position}>
      <pointLight color="#ff00ff" intensity={10} distance={20} />
      <StarStrike position={position} />
    </group>
  );
};
