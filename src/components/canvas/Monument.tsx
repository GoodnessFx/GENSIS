'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';

interface MonumentProps {
  repo: {
    id: string;
    name: string;
    language: string;
    stars: number;
    commits: number;
    date: string;
    abandoned: boolean;
    codeSnippet?: string;
  };
  position: [number, number, number];
}

const CodeScroll = ({ height, width, codeSnippet }: { height: number; width: number; codeSnippet?: string }) => {
  const textRef = useRef<THREE.Group>(null);
  const codeLines = useMemo(() => {
    if (codeSnippet) return codeSnippet.split('\n');
    return [
      'function genesis() {',
      '  const history = fetchGithub();',
      '  const music = fetchSpotify();',
      '  return history.map(h => ({',
      '    ...h,',
      '    track: music.match(h.date)',
      '  }));',
      '}',
    ];
  }, [codeSnippet]);

  const fontUrl = "https://fonts.gstatic.com/s/robotomono/v22/L0tkDFo6GF1D6C1KnS7dfRLXv5b2Eg.ttf";

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = (state.clock.getElapsedTime() % 10) - 5;
    }
  });

  return (
    <group ref={textRef} position={[0, 0, width / 2 + 0.01]}>
      {codeLines.map((line, i) => (
        <Text
          key={i}
          position={[0, -i * 0.4, 0]}
          fontSize={0.2}
          color="#00ff88"
          fillOpacity={0.5}
          maxWidth={width * 0.8}
          anchorX="center"
          font={fontUrl}
        >
          {line}
        </Text>
      ))}
    </group>
  );
};

export const Monument = ({ repo, position }: MonumentProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { progress, githubData, addMilestone } = useExperienceStore();
  
  // Calculate if this monument is "building"
  const myIndex = useMemo(() => {
    return githubData?.findIndex(r => r.id === repo.id) ?? 0;
  }, [githubData, repo.id]);

  const totalRepos = githubData?.length ?? 1;
  const myProgress = myIndex / totalRepos;
  const isBuilding = progress >= myProgress && progress < (myIndex + 1) / totalRepos;
  const isBuilt = progress >= (myIndex + 1) / totalRepos;
  
  // Calculate scale based on stars
  const height = useMemo(() => Math.max(2, Math.log10(repo.stars + 1) * 5), [repo.stars]);
  const width = useMemo(() => Math.max(1.5, Math.log10(repo.commits + 1) * 2), [repo.commits]);
  
  const [scale, setScale] = useState(0);
  const milestoneAdded = useRef(false);

  // Milestone tracking
  useEffect(() => {
    if (isBuilding && !milestoneAdded.current) {
      if (myIndex === 0) {
        addMilestone(`First commit — ${repo.date}`);
        milestoneAdded.current = true;
      }
      if (repo.stars >= 1000) {
        addMilestone(`Major Milestone: ${repo.name} hit ${repo.stars} stars`);
        milestoneAdded.current = true;
      }
      if (repo.commits >= 1000) {
        addMilestone(`Legendary activity: 1,000 commits in ${repo.name}`);
        milestoneAdded.current = true;
      }
    }
  }, [isBuilding, myIndex, repo.name, repo.stars, repo.commits, addMilestone, repo.date]);

  useFrame((state, delta) => {
    if (isBuilding || isBuilt) {
      setScale(s => THREE.MathUtils.lerp(s, 1, delta * 2.5));
    } else {
      setScale(s => THREE.MathUtils.lerp(s, 0, delta * 3.5));
    }
    
    if (meshRef.current && (isBuilding || isBuilt)) {
      // Subtle float and rotation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  // Determine style based on language
  const languageStyle = useMemo(() => {
    const lang = repo.language?.toLowerCase() || 'other';
    switch (lang) {
      case 'javascript':
      case 'js':
        return { color: '#f7df1e', material: 'glass', type: 'skyscraper' };
      case 'typescript':
      case 'ts':
        return { color: '#3178c6', material: 'chrome', type: 'tower' };
      case 'python':
      case 'py':
        return { color: '#3776ab', material: 'stone', type: 'temple' };
      case 'rust':
      case 'rs':
        return { color: '#dea584', material: 'iron', type: 'fortress' };
      case 'go':
      case 'golang':
        return { color: '#00add8', material: 'white', type: 'obelisk' };
      case 'solidity':
      case 'sol':
        return { color: '#363636', material: 'crystal', type: 'spire' };
      case 'cpp':
      case 'c++':
        return { color: '#00599c', material: 'ancient', type: 'colosseum' };
      case 'ruby':
      case 'rb':
        return { color: '#cc342d', material: 'sandstone', type: 'pyramid' };
      default:
        return { color: '#ffffff', material: 'default', type: 'monolith' };
    }
  }, [repo.language]);

  if (scale <= 0) return null;

  return (
    <group position={position} ref={meshRef} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main structure based on type */}
        {languageStyle.type === 'skyscraper' && (
          <mesh position={[0, height / 2, 0]}>
            <boxGeometry args={[width, height, width]} />
            <meshPhysicalMaterial 
              color={languageStyle.color} 
              transmission={0.8} 
              thickness={1} 
              roughness={0.1} 
              metalness={0.9} 
              emissive={languageStyle.color}
              emissiveIntensity={repo.stars > 100 ? 2 : 0.5}
            />
          </mesh>
        )}
        
        {languageStyle.type === 'tower' && (
          <mesh position={[0, height / 2, 0]}>
            <cylinderGeometry args={[width * 0.5, width, height, 32]} />
            <meshStandardMaterial 
              color={languageStyle.color} 
              metalness={1} 
              roughness={0.05} 
              emissive={languageStyle.color}
              emissiveIntensity={repo.stars > 100 ? 1 : 0.2}
            />
          </mesh>
        )}

        {languageStyle.type === 'spire' && (
          <mesh position={[0, height / 2, 0]}>
            <coneGeometry args={[width, height, 4]} />
            <meshStandardMaterial 
              color={languageStyle.color} 
              emissive={languageStyle.color}
              emissiveIntensity={2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        )}

        {/* Fallback Monolith */}
        {!['skyscraper', 'tower', 'spire'].includes(languageStyle.type) && (
          <mesh position={[0, height / 2, 0]}>
            <boxGeometry args={[width, height, width]} />
            <meshStandardMaterial color={languageStyle.color} />
          </mesh>
        )}

        {/* Floating Code Hologram for all types */}
        {(isBuilding || isBuilt) && (
          <CodeScroll height={height} width={width} codeSnippet={repo.codeSnippet} />
        )}

        {/* Repo Name */}
        <Text
          position={[0, height + 1.5, 0]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
          visible={isBuilt || isBuilding}
        >
          {repo.name.toUpperCase()}
        </Text>
      </Float>
      
      {/* Glow at base - only when active or built */}
      {(isBuilding || isBuilt) && (
        <>
          <pointLight 
            position={[0, 0.5, 0]} 
            color={languageStyle.color} 
            intensity={repo.stars > 0 ? 15 : 2} 
            distance={20} 
            decay={2}
          />
          {/* Base Glow Mesh for visual depth */}
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[width * 1.5, 32]} />
            <meshBasicMaterial 
              color={languageStyle.color} 
              transparent 
              opacity={isBuilding ? 0.3 : 0.1} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>
        </>
      )}
    </group>
  );
};
