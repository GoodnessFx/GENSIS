'use client';

import { useMemo } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';

export const Timeline = () => {
  const { githubData } = useExperienceStore();
  
  // Memoize geometry to prevent recreation
  const planeArgs = useMemo(() => [2000, 2000] as [number, number], []);
  const gridArgs = useMemo(() => [2000, 150, '#202020', '#0a0a0a'] as [number, number, string, string], []);

  return (
    <group>
      {/* Main Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={planeArgs} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={60}
          roughness={1}
          depthScale={1.5}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#020202"
          metalness={0.8}
          mirror={1}
        />
      </mesh>
      
      {/* Grid for depth perception */}
      <gridHelper args={gridArgs} position={[0, 0, 0]} />
      
      {/* Secondary subtle grid */}
      <gridHelper args={[2000, 50, '#111111', 'transparent']} position={[0, -0.05, 0]} />
    </group>
  );
};
