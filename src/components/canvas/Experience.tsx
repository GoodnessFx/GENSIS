'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Bloom, Noise, Vignette, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import { Timeline } from './Timeline';
import { Monument } from './Monument';
import { CinematicCamera } from './CinematicCamera';
import { Aurora } from './Aurora';

const Scene = () => {
  const { githubData, setGithubData, isStarted } = useExperienceStore();

  // Sample data for testing
  useEffect(() => {
    if (isStarted && !githubData) {
      setGithubData([
        { id: '1', name: 'my-first-repo', language: 'javascript', stars: 10, commits: 50, date: '2019-03-14', abandoned: false },
        { id: '2', name: 'data-science-tool', language: 'python', stars: 150, commits: 200, date: '2020-05-20', abandoned: false },
        { id: '3', name: 'smart-contracts', language: 'solidity', stars: 1200, commits: 80, date: '2021-11-02', abandoned: false },
        { id: '4', name: 'high-perf-engine', language: 'rust', stars: 500, commits: 450, date: '2022-08-15', abandoned: false },
        { id: '5', name: 'web-framework', language: 'typescript', stars: 8500, commits: 1200, date: '2023-01-10', abandoned: false },
        { id: '6', name: 'old-project', language: 'ruby', stars: 5, commits: 10, date: '2018-01-01', abandoned: true },
      ]);
    }
  }, [isStarted, githubData, setGithubData]);

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
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} intensity={1.0} mipmapBlur />
        <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
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
