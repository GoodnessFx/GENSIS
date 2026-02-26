'use client';

import { useMemo } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';

export const Timeline = () => {
  const { githubData } = useExperienceStore();
  
  // Create a long floor that changes color/texture based on distance (time)
  return (
    <group>
      {/* Main Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={1}
        />
      </mesh>
      
      {/* Grid for depth perception */}
      <gridHelper args={[1000, 100, '#101010', '#050505']} position={[0, 0, 0]} />
      
      {/* Biome-specific elements would be added here based on position along the Z axis */}
    </group>
  );
};
