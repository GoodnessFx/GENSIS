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
    // Advanced aurora math
    vec2 uv = vUv;
    float time = uTime * 0.5;
    
    float noise = sin(uv.x * 12.0 + time) * 0.1;
    noise += sin(uv.x * 24.0 - time * 0.8) * 0.05;
    noise += sin(uv.y * 8.0 + time * 1.2) * 0.02;

    float gradient = 1.0 - distance(uv.y, 0.5 + noise);
    gradient = pow(gradient, 4.0);

    float flow = sin(uv.x * 12.0 + uv.y * 6.0 + time) * 0.5 + 0.5;
    float alpha = gradient * flow * 0.9;
    
    vec3 color = mix(uColor, vec3(0.0, 1.0, 0.9), flow * 0.6);
    color += vec3(0.3, 0.0, 0.6) * (1.0 - flow);
    
    gl_FragColor = vec4(color, alpha * clamp(sin(time * 0.2) * 0.5 + 0.5, 0.4, 1.0));
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
