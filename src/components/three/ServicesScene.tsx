// src/components/three/ServicesScene.tsx

"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GridMeshProps {
  size?: number;
  divisions?: number;
}

function GridMesh({ size = 10, divisions = 10 }: GridMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Wave animation
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const x = i % divisions;
        const y = Math.floor(i / divisions);
        const waveHeight = Math.sin(time + x * 0.5) * Math.cos(time + y * 0.5) * 0.3;
        mesh.position.z = waveHeight;
      }
    });
    
    // Slow rotation
    groupRef.current.rotation.z = time * 0.05;
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: divisions * divisions }).map((_, i) => {
        const x = (i % divisions) - divisions / 2;
        const y = Math.floor(i / divisions) - divisions / 2;
        
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) meshRefs.current[i] = el;
            }}
            position={[x * (size / divisions), y * (size / divisions), 0]}
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#00D9FF" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ServicesScene() {
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <GridMesh size={20} divisions={15} />
      </Canvas>
    </div>
  );
}