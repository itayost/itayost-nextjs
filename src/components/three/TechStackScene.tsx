// src/components/three/TechStackScene.tsx

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechCrystalProps {
  position: [number, number, number];
  size?: number;
  rotationSpeed?: number;
}

function TechCrystal({ position, size = 1, rotationSpeed = 0.01 }: TechCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 0.5;
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={size}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial 
        color="#00D9FF" 
        wireframe 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
}

interface DataFlowProps {
  count?: number;
}

function DataFlow({ count = 50 }: DataFlowProps) {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineArray: THREE.Vector3[][] = [];
    
    for (let i = 0; i < count; i++) {
      const points: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 10;
      const startY = (Math.random() - 0.5) * 10;
      const startZ = (Math.random() - 0.5) * 5;
      
      for (let j = 0; j < 10; j++) {
        points.push(new THREE.Vector3(
          startX + Math.random() * 2 - 1,
          startY + j * 0.5,
          startZ + Math.random() * 2 - 1
        ));
      }
      
      lineArray.push(points);
    }
    
    return lineArray;
  }, [count]);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    linesRef.current.rotation.y = time * 0.1;
  });
  
  return (
    <group ref={linesRef}>
      {lines.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#00D9FF" 
            transparent 
            opacity={0.2}
          />
        </line>
      ))}
    </group>
  );
}

function OrbitalLayers() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    groupRef.current.rotation.y = time * 0.05;
  });
  
  return (
    <group ref={groupRef}>
      {[2, 3, 4].map((radius, i) => (
        <mesh key={i} rotation={[0, 0, i * Math.PI / 3]}>
          <torusGeometry args={[radius, 0.05, 8, 64]} />
          <meshBasicMaterial 
            color="#00D9FF" 
            transparent 
            opacity={0.3 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TechStackScene() {
  const techCrystals = useMemo(() => [
    { position: [2, 0, 0] as [number, number, number], size: 0.8 },
    { position: [-2, 1, 0] as [number, number, number], size: 1 },
    { position: [0, -2, 1] as [number, number, number], size: 0.6 },
    { position: [3, 2, -1] as [number, number, number], size: 0.7 },
    { position: [-3, -1, 0] as [number, number, number], size: 0.9 },
  ], []);
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.1} />
        
        {/* Tech Crystals */}
        {techCrystals.map((crystal, i) => (
          <TechCrystal 
            key={i}
            position={crystal.position}
            size={crystal.size}
            rotationSpeed={0.01 + i * 0.002}
          />
        ))}
        
        {/* Data Flow Lines */}
        <DataFlow count={window.innerWidth < 768 ? 20 : 50} />
        
        {/* Orbital Layers */}
        <OrbitalLayers />
      </Canvas>
    </div>
  );
}