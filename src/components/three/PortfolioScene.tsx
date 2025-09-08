// src/components/three/PortfolioScene.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function PortfolioScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generationSeed] = useState(() => Date.now() + Math.random());

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any;
    let camera: any;
    let renderer: any;
    const projectCards: any[] = [];
    let frameGeometry: any;
    const connections: any[] = [];
    let particles: any;

    const initScene = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        // Detect performance level
        const isMobile = window.innerWidth < 768;
        const performanceConfig = {
          cardCount: isMobile ? 4 : 8,
          particleCount: isMobile ? 200 : 500,
          connectionThreshold: isMobile ? 3 : 4,
          complexity: isMobile ? 8 : 16
        };

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 15);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Create portfolio cards in 3D space
        const createPortfolioCards = () => {
          const cardGeometries = [
            new THREE.BoxGeometry(2.5, 3.5, 0.1),
            new THREE.PlaneGeometry(2.5, 3.5),
            new THREE.RingGeometry(1.2, 1.8, performanceConfig.complexity),
            new THREE.CircleGeometry(1.5, performanceConfig.complexity)
          ];

          // Wireframe material for cards
          const cardMaterial = new THREE.MeshBasicMaterial({
            color: 0x00D9FF,
            wireframe: true,
            transparent: true,
            opacity: 0.3
          });

          // Edge glow material
          const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0x00E5FF,
            transparent: true,
            opacity: 0.6,
            linewidth: 2
          });

          // Create project cards
          for (let i = 0; i < performanceConfig.cardCount; i++) {
            // Random geometry for each card
            const geometryIndex = Math.floor((generationSeed * (i + 1)) % cardGeometries.length);
            const geometry = cardGeometries[geometryIndex].clone();

            // Main card mesh
            const card = new THREE.Mesh(geometry, cardMaterial.clone());
            
            // Position cards in a circular pattern with depth
            const angle = (i / performanceConfig.cardCount) * Math.PI * 2;
            const radius = 5 + Math.sin(generationSeed * i) * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle * 2) * 2;
            const z = Math.sin(angle) * radius * 0.5;
            
            card.position.set(x, y, z);
            card.rotation.x = Math.random() * 0.5;
            card.rotation.y = Math.random() * 0.5;
            
            // Store initial position for animation
            card.userData = {
              initialPosition: card.position.clone(),
              rotationSpeed: {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.001
              },
              floatOffset: Math.random() * Math.PI * 2,
              floatSpeed: 0.5 + Math.random() * 0.5,
              index: i
            };

            projectCards.push(card);
            scene.add(card);

            // Add edge highlights
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, edgeMaterial);
            line.position.copy(card.position);
            line.rotation.copy(card.rotation);
            card.userData.edges = line;
            scene.add(line);
          }
        };

        // Create connecting lines between nearby cards
        const createConnections = () => {
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.1
          });

          for (let i = 0; i < projectCards.length; i++) {
            for (let j = i + 1; j < projectCards.length; j++) {
              const distance = projectCards[i].position.distanceTo(projectCards[j].position);
              
              if (distance < performanceConfig.connectionThreshold) {
                const points = [
                  projectCards[i].position,
                  projectCards[j].position
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, lineMaterial.clone());
                
                line.userData = {
                  card1: projectCards[i],
                  card2: projectCards[j],
                  baseOpacity: 0.1
                };
                
                connections.push(line);
                scene.add(line);
              }
            }
          }
        };

        // Create background particles
        const createParticles = () => {
          const particleGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array(performanceConfig.particleCount * 3);
          const sizes = new Float32Array(performanceConfig.particleCount);
          
          for (let i = 0; i < performanceConfig.particleCount * 3; i += 3) {
            // Spread particles in 3D space
            positions[i] = (Math.random() - 0.5) * 30;
            positions[i + 1] = (Math.random() - 0.5) * 30;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            sizes[i / 3] = Math.random() * 2;
          }
          
          particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
          
          const particleMaterial = new THREE.PointsMaterial({
            color: 0x00D9FF,
            size: 0.05,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
          });
          
          particles = new THREE.Points(particleGeometry, particleMaterial);
          scene.add(particles);
        };

        // Create frame structure
        const createFrameStructure = () => {
          // Create a wireframe box that contains the scene
          frameGeometry = new THREE.BoxGeometry(20, 15, 15);
          const frameMaterial = new THREE.MeshBasicMaterial({
            color: 0x00B8D4,
            wireframe: true,
            transparent: true,
            opacity: 0.05
          });
          
          const frame = new THREE.Mesh(frameGeometry, frameMaterial);
          scene.add(frame);
        };

        // Initialize all elements
        createPortfolioCards();
        createConnections();
        createParticles();
        createFrameStructure();

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          
          targetX = mouseX * 0.1;
          targetY = mouseY * 0.1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;

          // Smooth camera movement based on mouse
          camera.position.x += (targetX * 2 - camera.position.x) * 0.02;
          camera.position.y += (targetY * 2 - camera.position.y) * 0.02;
          camera.lookAt(0, 0, 0);

          // Animate project cards
          projectCards.forEach((card) => {
            const userData = card.userData;
            
            // Slow rotation
            card.rotation.x += userData.rotationSpeed.x;
            card.rotation.y += userData.rotationSpeed.y;
            card.rotation.z += userData.rotationSpeed.z;
            
            // Gentle floating motion
            const floatY = Math.sin(time * userData.floatSpeed + userData.floatOffset) * 0.2;
            card.position.y = userData.initialPosition.y + floatY;
            
            // Sync edge highlights
            if (userData.edges) {
              userData.edges.position.copy(card.position);
              userData.edges.rotation.copy(card.rotation);
            }
            
            // Pulse effect on hover proximity (based on camera position)
            const distanceToCamera = card.position.distanceTo(camera.position);
            const scale = 1 + Math.max(0, 1 - distanceToCamera / 20) * 0.1;
            card.scale.set(scale, scale, scale);
            
            // Update material opacity based on distance
            card.material.opacity = 0.3 + Math.max(0, 1 - distanceToCamera / 25) * 0.3;
          });

          // Update connections opacity based on card proximity
          connections.forEach(connection => {
            
            // Update line position if cards moved
            const points = [
              connection.userData.card1.position,
              connection.userData.card2.position
            ];
            connection.geometry.setFromPoints(points);
            
            // Pulse connection opacity
            const pulse = Math.sin(time * 2) * 0.05;
            connection.material.opacity = connection.userData.baseOpacity + pulse;
          });

          // Rotate particles slowly
          if (particles) {
            particles.rotation.y = time * 0.05;
            particles.rotation.x = time * 0.02;
            
            // Subtle particle movement
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
              positions[i + 1] += Math.sin(time + i) * 0.001;
            }
            particles.geometry.attributes.position.needsUpdate = true;
          }

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

        // Start animation
        setIsLoading(false);
        animate();

        // Cleanup function
        return () => {
          mounted = false;
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          
          if (animationId) cancelAnimationFrame(animationId);
          
          // Clean disposal
          projectCards.forEach(card => {
            if (card.geometry) card.geometry.dispose();
            if (card.material) card.material.dispose();
            if (card.userData.edges) {
              card.userData.edges.geometry.dispose();
              card.userData.edges.material.dispose();
            }
          });
          
          connections.forEach(connection => {
            if (connection.geometry) connection.geometry.dispose();
            if (connection.material) connection.material.dispose();
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
        console.error('Failed to initialize Portfolio 3D scene:', error);
        setIsLoading(false);
      }
    };

    initScene();

    return () => {
      mounted = false;
    };
  }, [generationSeed]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse opacity-40">
            Loading Portfolio...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}