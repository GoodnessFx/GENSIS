'use client';

import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import gsap from 'gsap';

export const CinematicCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { isPlaying, progress, githubData, isEnding, playbackSpeed } = useExperienceStore();
  
  // Target position and lookAt
  const targetPos = useRef(new THREE.Vector3(0, 10, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    if (isEnding) {
      // Pull back for epic wide shot
      const time = state.clock.getElapsedTime();
      const radius = 200; // Increased radius for more scale
      const x = Math.sin(time * 0.05) * radius;
      const z = Math.cos(time * 0.05) * radius;
      
      targetPos.current.lerp(new THREE.Vector3(x, 120, z), delta * 0.3);
      targetLookAt.current.lerp(new THREE.Vector3(0, 0, -100), delta * 0.3);
    } else if (isPlaying) {
      // Auto-move camera along the timeline
      const currentRepoIndex = Math.floor(progress * (githubData?.length || 1));
      const repo = githubData?.[currentRepoIndex];
      
      if (repo) {
        const repoPos = new THREE.Vector3(Math.sin(currentRepoIndex) * 10, 0, -currentRepoIndex * 20);
        
        // Dynamic Designer-Level Camera Paths
        const time = state.clock.getElapsedTime();
        
        // Every 3rd repo, do a low-angle sweep
        if (currentRepoIndex % 3 === 0) {
          const sweepX = Math.cos(time * 0.5) * 15;
          targetPos.current.set(repoPos.x + sweepX, 2, repoPos.z + 15);
        } else {
          // Default cinematic drone
          const hoverX = Math.sin(time * 0.3) * 12;
          const hoverY = 15 + Math.cos(time * 0.4) * 4;
          const hoverZ = repoPos.z + 35 + Math.sin(time * 0.2) * 10;
          targetPos.current.set(repoPos.x + hoverX, hoverY, hoverZ);
        }
        
        targetLookAt.current.lerp(repoPos.clone().add(new THREE.Vector3(0, 4, 0)), delta * 3);
      }
    }

    // High-precision interpolation
    cameraRef.current.position.lerp(targetPos.current, delta * 2.5);
    cameraRef.current.lookAt(targetLookAt.current);
    
    // Designer touch: Dynamic FOV based on speed
    const velocity = isPlaying ? playbackSpeed : 1;
    cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, 50 + velocity * 5, delta * 2);
    cameraRef.current.updateProjectionMatrix();
    
    // Dynamic Roll
    cameraRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.08;
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={50}
      near={0.1}
      far={2000}
    />
  );
};
