// src/components/three/PortfolioScene.tsx

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Add props interface
interface PortfolioSceneProps {
  mousePosition?: { x: number; y: number };
}

interface ParticleFieldProps {
  count?: number;
  mousePosition?: { x: number; y: number };
}

function ParticleField({ count = 1000, mousePosition }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const intensity = 0.5 + Math.random() * 0.5;
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 0.85 * intensity;
      colors[i * 3 + 2] = 1 * intensity;
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.x = time * 0.05;
    pointsRef.current.rotation.y = time * 0.075;
    
    // React to mouse position if provided
    if (mousePosition) {
      pointsRef.current.rotation.x += mousePosition.y * 0.001;
      pointsRef.current.rotation.y += mousePosition.x * 0.001;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function PortfolioScene({ mousePosition = { x: 0, y: 0 } }: PortfolioSceneProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
      >
        <ParticleField 
          count={typeof window !== "undefined" && window.innerWidth < 768 ? 500 : 1000} 
          mousePosition={mousePosition}
        />
      </Canvas>
    </div>
  );
}