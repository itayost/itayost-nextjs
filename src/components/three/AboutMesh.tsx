// src/components/three/AboutMesh.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function AboutMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any;
    let camera: any;
    let renderer: any;
    let particles: any;
    let lines: any[] = [];

    const initScene = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Create particle system
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
          // Random positions in a sphere
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          const radius = 2 + Math.random() * 1;
          
          positions[i] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i + 2] = radius * Math.cos(phi);
          
          // Random velocities
          velocities[i] = (Math.random() - 0.5) * 0.01;
          velocities[i + 1] = (Math.random() - 0.5) * 0.01;
          velocities[i + 2] = (Math.random() - 0.5) * 0.01;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.userData.velocities = velocities;

        const particleMaterial = new THREE.PointsMaterial({
          color: 0x00D9FF,
          size: 0.05,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Create connecting lines between nearby particles
        const createLines = () => {
          // Remove old lines
          lines.forEach(line => {
            scene.remove(line);
            line.geometry.dispose();
            line.material.dispose();
          });
          lines = [];

          const positions = particles.geometry.attributes.position.array;
          const threshold = 1.5; // Distance threshold for connections

          for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
              const x1 = positions[i * 3];
              const y1 = positions[i * 3 + 1];
              const z1 = positions[i * 3 + 2];
              
              const x2 = positions[j * 3];
              const y2 = positions[j * 3 + 1];
              const z2 = positions[j * 3 + 2];
              
              const distance = Math.sqrt(
                Math.pow(x2 - x1, 2) +
                Math.pow(y2 - y1, 2) +
                Math.pow(z2 - z1, 2)
              );
              
              if (distance < threshold) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(x1, y1, z1),
                  new THREE.Vector3(x2, y2, z2)
                ]);
                
                const opacity = 1 - (distance / threshold);
                const lineMaterial = new THREE.LineBasicMaterial({
                  color: 0x00D9FF,
                  transparent: true,
                  opacity: opacity * 0.2
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                lines.push(line);
                scene.add(line);
              }
            }
          }
        };

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;

          // Rotate particle system
          particles.rotation.y = time * 0.1;
          particles.rotation.x = time * 0.05;

          // Update particle positions
          const positions = particles.geometry.attributes.position.array;
          const velocities = particles.geometry.userData.velocities;
          
          for (let i = 0; i < particleCount * 3; i += 3) {
            // Apply velocities
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            
            // Keep particles within bounds
            const radius = Math.sqrt(
              positions[i] * positions[i] +
              positions[i + 1] * positions[i + 1] +
              positions[i + 2] * positions[i + 2]
            );
            
            if (radius > 3 || radius < 1.5) {
              // Reverse velocity if out of bounds
              velocities[i] *= -1;
              velocities[i + 1] *= -1;
              velocities[i + 2] *= -1;
            }
          }
          
          particles.geometry.attributes.position.needsUpdate = true;

          // Update lines every few frames for performance
          if (Math.floor(time * 10) % 5 === 0) {
            createLines();
          }

          renderer.render(scene, camera);
        };

        // Handle resize
        const handleResize = () => {
          if (!containerRef.current) return;
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // Create initial lines
        createLines();

        // Start animation
        setIsLoading(false);
        animate();

        // Cleanup function
        return () => {
          mounted = false;
          window.removeEventListener('resize', handleResize);
          
          if (animationId) cancelAnimationFrame(animationId);
          
          // Clean disposal
          lines.forEach(line => {
            if (line.geometry) line.geometry.dispose();
            if (line.material) line.material.dispose();
          });
          
          if (particles) {
            if (particles.geometry) particles.geometry.dispose();
            if (particles.material) particles.material.dispose();
          }
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize About 3D scene:', error);
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
            Loading...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}