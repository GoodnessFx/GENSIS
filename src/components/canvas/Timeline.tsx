'use client';

import { useMemo } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';

export const Timeline = () => {
  const { githubData } = useExperienceStore();
  
  // Memoize geometry to prevent recreation
  const planeArgs = useMemo(() => [2000, 2000] as [number, number], []);
  const gridArgs = useMemo(() => [2000, 200, '#101010', '#050505'] as [number, number, string, string], []);

  return (
    <group>
      {/* Main Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={planeArgs} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512} // Reduced from 1024 for better performance on mid-range GPUs
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
      <gridHelper args={gridArgs} position={[0, 0, 0]} />
    </group>
  );
};
