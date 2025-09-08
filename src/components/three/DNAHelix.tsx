// src/components/three/DNAHelix.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function DNAHelix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any;
    let camera: any;
    let renderer: any;
    let helix1: any[] = [];
    let helix2: any[] = [];
    let connections: any[] = [];

    const initScene = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 10);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Create DNA Helix
        const createDNAHelix = () => {
          const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
          const connectionGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
          
          const material1 = new THREE.MeshBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.8
          });
          
          const material2 = new THREE.MeshBasicMaterial({
            color: 0x00B8D4,
            transparent: true,
            opacity: 0.8
          });
          
          const connectionMaterial = new THREE.MeshBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.3
          });

          const numPairs = 30;
          const helixHeight = 8;
          const radius = 2;

          for (let i = 0; i < numPairs; i++) {
            const t = i / numPairs;
            const angle = t * Math.PI * 4; // Two full rotations
            const y = (t - 0.5) * helixHeight;

            // First helix strand
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;
            const sphere1 = new THREE.Mesh(sphereGeometry, material1);
            sphere1.position.set(x1, y, z1);
            helix1.push(sphere1);
            scene.add(sphere1);

            // Second helix strand (180 degrees offset)
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;
            const sphere2 = new THREE.Mesh(sphereGeometry, material2);
            sphere2.position.set(x2, y, z2);
            helix2.push(sphere2);
            scene.add(sphere2);

            // Connection between strands
            if (i % 2 === 0) { // Connect every other pair
              const connection = new THREE.Mesh(connectionGeometry.clone(), connectionMaterial);
              
              // Position at midpoint
              connection.position.set(
                (x1 + x2) / 2,
                y,
                (z1 + z2) / 2
              );
              
              // Calculate rotation to align cylinder between points
              const direction = new THREE.Vector3(x2 - x1, 0, z2 - z1);
              const length = direction.length();
              connection.scale.y = length;
              
              // Rotate to align with direction
              const axis = new THREE.Vector3(0, 1, 0);
              const quaternion = new THREE.Quaternion().setFromUnitVectors(
                axis,
                direction.normalize()
              );
              connection.rotation.setFromQuaternion(quaternion);
              connection.rotateX(Math.PI / 2);
              
              connections.push(connection);
              scene.add(connection);
            }
          }

          // Add connecting lines between adjacent spheres
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.2
          });

          // Connect helix 1
          for (let i = 0; i < helix1.length - 1; i++) {
            const points = [
              helix1[i].position,
              helix1[i + 1].position
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
          }

          // Connect helix 2
          for (let i = 0; i < helix2.length - 1; i++) {
            const points = [
              helix2[i].position,
              helix2[i + 1].position
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
          }
        };

        createDNAHelix();

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;

          // Rotate the entire helix
          helix1.forEach((sphere, i) => {
            const t = i / helix1.length;
            const baseY = (t - 0.5) * 8;
            
            // Add wave motion
            sphere.position.y = baseY + Math.sin(time * 2 + i * 0.3) * 0.1;
            
            // Pulse effect
            const scale = 1 + Math.sin(time * 3 + i * 0.5) * 0.1;
            sphere.scale.set(scale, scale, scale);
          });

          helix2.forEach((sphere, i) => {
            const t = i / helix2.length;
            const baseY = (t - 0.5) * 8;
            
            // Add wave motion (opposite phase)
            sphere.position.y = baseY + Math.sin(time * 2 + i * 0.3 + Math.PI) * 0.1;
            
            // Pulse effect (opposite phase)
            const scale = 1 + Math.sin(time * 3 + i * 0.5 + Math.PI) * 0.1;
            sphere.scale.set(scale, scale, scale);
          });

          // Rotate camera around helix
          camera.position.x = Math.cos(time * 0.2) * 10;
          camera.position.z = Math.sin(time * 0.2) * 10;
          camera.position.y = Math.sin(time * 0.3) * 2;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        };

        // Handle resize
        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        setIsLoading(false);
        animate();

        // Cleanup function
        return () => {
          mounted = false;
          window.removeEventListener('resize', handleResize);
          
          if (animationId) cancelAnimationFrame(animationId);
          
          // Clean disposal
          helix1.forEach(sphere => {
            if (sphere.geometry) sphere.geometry.dispose();
            if (sphere.material) sphere.material.dispose();
          });
          
          helix2.forEach(sphere => {
            if (sphere.geometry) sphere.geometry.dispose();
            if (sphere.material) sphere.material.dispose();
          });
          
          connections.forEach(connection => {
            if (connection.geometry) connection.geometry.dispose();
            if (connection.material) connection.material.dispose();
          });
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize DNA Helix scene:', error);
        setIsLoading(false);
      }
    };

    initScene();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse opacity-40">
            Generating DNA...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}