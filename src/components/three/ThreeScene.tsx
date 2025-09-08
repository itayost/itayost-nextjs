// src/components/three/ThreeScene.tsx

"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    
    // Add to DOM
    const currentMount = mountRef.current;
    currentMount.appendChild(renderer.domElement);

    // Create generative mesh
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate mesh
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;

      // Morph vertices
      const time = Date.now() * 0.001;
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        const noise = Math.sin(x * 2 + time) * 0.1;
        const vector = new THREE.Vector3(x, y, z);
        vector.normalize().multiplyScalar(2 + noise);
        
        positions.setXYZ(i, vector.x, vector.y, vector.z);
      }
      
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      
      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      // Remove from DOM
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}