'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Bloom, Vignette, ChromaticAberration, EffectComposer, Noise, Scanline } from '@react-three/postprocessing';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import { Timeline } from './Timeline';
import { Monument } from './Monument';
import { CinematicCamera } from './CinematicCamera';
import { Aurora } from './Aurora';

import { fetchGithubData } from '@/lib/githubService';

const Scene = () => {
  const { githubData, setGithubData, isStarted, githubUser } = useExperienceStore();

  useEffect(() => {
    if (isStarted && !githubData && githubUser) {
      fetchGithubData(githubUser)
        .then(data => setGithubData(data))
        .catch(err => console.error('Failed to load GitHub data:', err));
    }
  }, [isStarted, githubData, setGithubData, githubUser]);

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      {/* Lights */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      
      {/* Void Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Aurora Borealis */}
      <Aurora />
      
      {/* Timeline Ground */}
      <Timeline />
      
      {/* Monuments */}
      {githubData?.map((repo, index) => (
        <Monument 
          key={repo.id} 
          repo={repo} 
          position={[Math.sin(index) * 10, 0, -index * 20]} 
        />
      ))}
      
      {/* Cinematic Camera */}
      <CinematicCamera />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={1} 
          intensity={2.0} 
          mipmapBlur 
          radius={0.5}
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.003, 0.003)} 
        />
        <Scanline opacity={0.05} density={1.5} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.3} darkness={0.9} />
      </EffectComposer>
    </>
  );
};

export default function Experience() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <Canvas
        shadows
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
