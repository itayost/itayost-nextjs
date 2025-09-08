// src/components/three/ThreeScene.tsx - Fixed with proper TypeScript types

"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

// Props interface for ThreeScene
interface ThreeSceneProps {
  width?: number;
  height?: number;
  meshColor?: string;
  rotationSpeed?: number;
}

export function ThreeScene({ 
  width = 800, 
  height = 600, 
  meshColor = "#00D9FF",
  rotationSpeed = 0.01 
}: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Generate unique mesh geometry
    const generateUniqueGeometry = (): THREE.BufferGeometry => {
      const complexity = Math.floor(Math.random() * 3) + 1;
      
      const geometries: THREE.BufferGeometry[] = [
        new THREE.IcosahedronGeometry(2, complexity),
        new THREE.OctahedronGeometry(2, complexity),
        new THREE.TetrahedronGeometry(2, complexity),
        new THREE.DodecahedronGeometry(2, complexity),
      ];
      
      return geometries[Math.floor(Math.random() * geometries.length)];
    };

    // Create generative mesh
    const geometry = generateUniqueGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(meshColor),
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Add to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = (): void => {
      if (!meshRef.current || !rendererRef.current || !cameraRef.current) return;

      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.5;
      meshRef.current.rotation.z += rotationSpeed * 0.3;

      rendererRef.current.render(sceneRef.current!, cameraRef.current);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = (): void => {
      if (!cameraRef.current || !rendererRef.current || !mountRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener("resize", handleResize);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (meshRef.current) {
        if (meshRef.current.geometry) {
          meshRef.current.geometry.dispose();
        }
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [width, height, meshColor, rotationSpeed]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ width, height }}
    />
  );
}

// Additional component for mobile-optimized mesh
interface MobileMeshProps {
  isMobile?: boolean;
}

export function ResponsiveMesh({ isMobile = false }: MobileMeshProps) {
  const config = {
    width: isMobile ? 300 : 800,
    height: isMobile ? 300 : 600,
    rotationSpeed: isMobile ? 0.005 : 0.01,
    meshColor: "#00D9FF"
  };

  return <ThreeScene {...config} />;
}