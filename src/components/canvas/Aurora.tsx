'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    // Center-based gradient
    float dist = distance(vUv, vec2(0.5, 0.5));
    float strength = 1.0 - dist;
    strength = pow(strength, 3.0);

    // Aurora wave logic
    float wave = sin(vUv.x * 10.0 + uTime) * 0.1;
    wave += sin(vUv.x * 20.0 - uTime * 0.5) * 0.05;

    float alpha = strength * (0.2 + wave);
    
    // Ensure alpha is within bounds
    alpha = clamp(alpha, 0.0, 1.0);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export const Aurora = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#44ff88') }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 50, -100]} rotation={[0, 0, 0]}>
      <planeGeometry args={[500, 100, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};
