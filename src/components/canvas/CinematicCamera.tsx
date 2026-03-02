'use client';

import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import gsap from 'gsap';

export const CinematicCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { isPlaying, progress, githubData, isEnding } = useExperienceStore();
  
  // Target position and lookAt
  const targetPos = useRef(new THREE.Vector3(0, 10, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    if (isEnding) {
      // Pull back for epic wide shot
      const time = state.clock.getElapsedTime();
      const radius = 150;
      const x = Math.sin(time * 0.1) * radius;
      const z = Math.cos(time * 0.1) * radius;
      
      targetPos.current.lerp(new THREE.Vector3(x, 80, z), delta * 0.5);
      targetLookAt.current.lerp(new THREE.Vector3(0, 0, -50), delta * 0.5);
    } else if (isPlaying) {
      // Auto-move camera along the timeline
      const currentRepoIndex = Math.floor(progress * (githubData?.length || 1));
      const repo = githubData?.[currentRepoIndex];
      
      if (repo) {
        const repoPos = new THREE.Vector3(Math.sin(currentRepoIndex) * 10, 0, -currentRepoIndex * 20);
        
        // Cinematic drone movement
        const time = state.clock.getElapsedTime();
        const hoverX = Math.sin(time * 0.3) * 8;
        const hoverY = 12 + Math.cos(time * 0.4) * 3;
        const hoverZ = repoPos.z + 30 + Math.sin(time * 0.2) * 8;

        targetPos.current.set(repoPos.x + hoverX, hoverY, hoverZ);
        targetLookAt.current.lerp(repoPos.clone().add(new THREE.Vector3(0, 2, 0)), delta * 2.5);
      }
    }

    // Smoothly interpolate camera position and lookAt
    cameraRef.current.position.lerp(targetPos.current, delta * 2.0);
    cameraRef.current.lookAt(targetLookAt.current);
    
    // Add subtle camera roll
    cameraRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
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
