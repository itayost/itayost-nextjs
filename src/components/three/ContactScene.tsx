// src/components/three/ContactScene.tsx

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import alea from "alea";

// Type definitions
interface MeshProps {
  position?: [number, number, number];
  scale?: number;
  seed?: string;
}

function GenerativeMesh({ position = [0, 0, 0], scale = 1, seed = "default" }: MeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);
  
  // Create noise function with seed
  const noise3D = useMemo(() => createNoise3D(alea(seed)), [seed]);
  
  // Store original positions
  const originalPositions = useRef<Float32Array | null>(null);
  
  useFrame((state) => {
    if (!meshRef.current || !geometryRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Rotation animation
    meshRef.current.rotation.x = time * 0.001;
    meshRef.current.rotation.y = time * 0.002;
    
    // Vertex morphing
    const positions = geometryRef.current.attributes.position;
    
    // Store original positions on first frame
    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(positions.array);
    }
    
    for (let i = 0; i < positions.count; i++) {
      const x = originalPositions.current[i * 3];
      const y = originalPositions.current[i * 3 + 1];
      const z = originalPositions.current[i * 3 + 2];
      
      const noise = noise3D(
        x * 0.5 + time * 0.1,
        y * 0.5,
        z * 0.5
      );
      
      const vector = new THREE.Vector3(x, y, z);
      vector.normalize().multiplyScalar(2 + noise * 0.2);
      
      positions.setXYZ(i, vector.x, vector.y, vector.z);
    }
    
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry ref={geometryRef} args={[2, 2]} />
      <meshBasicMaterial 
        color="#00D9FF" 
        wireframe 
        transparent 
        opacity={0.3}
      />
    </mesh>
  );
}

export default function ContactScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.1} />
        <GenerativeMesh position={[3, 0, 0]} seed="mesh1" />
        <GenerativeMesh position={[-3, 0, 0]} scale={0.7} seed="mesh2" />
        <GenerativeMesh position={[0, 2, -2]} scale={0.5} seed="mesh3" />
      </Canvas>
    </div>
  );
}