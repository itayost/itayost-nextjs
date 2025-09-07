// src/components/three/ThreeScene.tsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generationSeed] = useState(() => Date.now() + Math.random());

  const detectPerformanceLevel = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = /Android.*Chrome\/[.0-9]*\s|iPhone\s|iPad\s/.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 2;
    
    if (isMobile || isLowEnd || cores <= 2) {
      return { complexity: 0, speed: 0.5, interactivity: 0.3 };
    } else if (cores <= 4) {
      return { complexity: 1, speed: 0.8, interactivity: 0.5 };
    } else {
      return { complexity: 2, speed: 1.0, interactivity: 0.7 };
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any;
    let camera: any;
    let renderer: any;
    let mainMesh: any;

    const initScene = async () => {
      try {
        const THREE = await import('three');
        const { createNoise3D } = await import('simplex-noise');

        if (!mounted || !containerRef.current) return;

        const config = detectPerformanceLevel();
        const noise3D = createNoise3D();

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 6);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Create unique geometry
        const createUniqueGeometry = () => {
          const geometries = [
            new THREE.IcosahedronGeometry(2.8, config.complexity),
            new THREE.OctahedronGeometry(2.8, config.complexity),
            new THREE.DodecahedronGeometry(2.5, config.complexity),
            new THREE.TorusGeometry(2.2, 0.8, 16, 32),
            new THREE.TorusKnotGeometry(1.8, 0.6, 64, 16)
          ];
          
          const selectedIndex = Math.floor(generationSeed * geometries.length) % geometries.length;
          const geometry = geometries[selectedIndex];
          
          // Store original positions for morphing
          const originalPositions = new Float32Array(geometry.attributes.position.array);
          geometry.userData.originalPositions = originalPositions;
          
          return geometry;
        };

        const geometry = createUniqueGeometry();
        
        // Cyan colored material with glow effect
        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            glowColor: { value: new THREE.Color(0x00D9FF) }, // Cyan color
            opacity: { value: 0.4 },
            mouseX: { value: 0 },
            mouseY: { value: 0 }
          },
          vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec3 vWorldPosition;
            uniform float time;
            uniform float mouseX;
            uniform float mouseY;
            
            void main() {
              vPosition = position;
              vNormal = normal;
              
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vWorldPosition = worldPosition.xyz;
              
              vec3 pos = position;
              
              // Subtle wave distortion
              float wave1 = sin(position.x * 1.5 + time * 0.8) * 0.08;
              float wave2 = sin(position.y * 1.2 + time * 0.6) * 0.06;
              
              pos += normal * (wave1 + wave2);
              
              // Subtle mouse influence
              float mouseInfluence = (mouseX + mouseY) * 0.1;
              pos += normal * mouseInfluence * 0.05;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 glowColor;
            uniform float opacity;
            uniform float time;
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec3 vWorldPosition;
            
            void main() {
              // Fresnel effect for glow
              vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
              float fresnel = 1.0 - abs(dot(viewDirection, vNormal));
              
              // Subtle pulsing
              float pulse = sin(time * 1.2) * 0.1 + 0.9;
              
              // Glow calculation
              float glow = pow(fresnel, 1.8) * pulse;
              
              // Final color with cyan glow
              gl_FragColor = vec4(glowColor, opacity * glow * 0.8);
            }
          `,
          transparent: true,
          wireframe: false,
          side: THREE.DoubleSide
        });

        mainMesh = new THREE.Mesh(geometry, material);
        
        // Position slightly off-center for dynamic composition
        mainMesh.position.set(0.5, -0.3, 0);
        scene.add(mainMesh);

        // Add wireframe overlay for tech aesthetic
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00D9FF,
          wireframe: true,
          transparent: true,
          opacity: 0.1
        });
        const wireframeMesh = new THREE.Mesh(geometry.clone(), wireframeMaterial);
        wireframeMesh.position.copy(mainMesh.position);
        scene.add(wireframeMesh);

        // Interaction system
        let mouseX = 0, mouseY = 0;
        let targetRotationX = 0, targetRotationY = 0;
        let currentRotationX = 0, currentRotationY = 0;

        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          
          targetRotationX = mouseY * 0.1 * config.interactivity;
          targetRotationY = mouseX * 0.1 * config.interactivity;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001 * config.speed;

          // Smooth rotation interpolation
          currentRotationX += (targetRotationX - currentRotationX) * 0.03;
          currentRotationY += (targetRotationY - currentRotationY) * 0.03;

          // Main mesh animation
          if (mainMesh) {
            // Very slow rotation
            mainMesh.rotation.x = time * 0.0008 + currentRotationX;
            mainMesh.rotation.y = time * 0.0012 + currentRotationY;
            mainMesh.rotation.z = time * 0.0005;

            // Sync wireframe rotation
            if (wireframeMesh) {
              wireframeMesh.rotation.copy(mainMesh.rotation);
            }

            // Update shader uniforms
            material.uniforms.time.value = time;
            material.uniforms.mouseX.value = mouseX * 0.5;
            material.uniforms.mouseY.value = mouseY * 0.5;

            // Subtle morphing with noise
            const positions = mainMesh.geometry.attributes.position;
            const originalPositions = mainMesh.geometry.userData.originalPositions;
            
            for (let i = 0; i < positions.count; i++) {
              const i3 = i * 3;
              const x = originalPositions[i3];
              const y = originalPositions[i3 + 1];
              const z = originalPositions[i3 + 2];

              // Very subtle noise-based morphing
              const noise = noise3D(x * 0.4, y * 0.4, time * 0.08);
              const scale = 1 + noise * 0.04;

              positions.array[i3] = x * scale;
              positions.array[i3 + 1] = y * scale;
              positions.array[i3 + 2] = z * scale;
            }
            positions.needsUpdate = true;
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
          if (mainMesh) {
            if (mainMesh.geometry) mainMesh.geometry.dispose();
            if (mainMesh.material) mainMesh.material.dispose();
          }
          
          if (wireframeMesh) {
            if (wireframeMesh.geometry) wireframeMesh.geometry.dispose();
            if (wireframeMesh.material) wireframeMesh.material.dispose();
          }
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize 3D scene:', error);
        setIsLoading(false);
      }
    };

    initScene();

    return () => {
      mounted = false;
    };
  }, [generationSeed, detectPerformanceLevel]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse opacity-60">
            Generating...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}