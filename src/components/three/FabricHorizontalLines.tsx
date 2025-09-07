// src/components/three/FabricHorizontalLines.tsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface FabricHorizontalLinesProps {
  lineCount?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  color?: string;
  spacing?: number;
}

export default function FabricHorizontalLines({
  lineCount = 8,
  amplitude = 0.3,
  frequency = 0.5,
  speed = 0.3,
  color = '#00D9FF',
  spacing = 0.3
}: FabricHorizontalLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const detectPerformanceLevel = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency || 2;
    
    if (isMobile || cores <= 2) {
      return { 
        segments: 200,
        actualLineCount: Math.min(lineCount, 6),
        quality: 'low'
      };
    } else if (cores <= 4) {
      return { 
        segments: 400,
        actualLineCount: Math.min(lineCount, 10),
        quality: 'medium'
      };
    } else {
      return { 
        segments: 800,
        actualLineCount: lineCount,
        quality: 'high'
      };
    }
  }, [lineCount]);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any;
    let camera: any;
    let renderer: any;
    let lines: any[] = [];

    const initHorizontalLines = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        const config = detectPerformanceLevel();

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 4);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: config.quality !== 'low',
          powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // === HORIZONTAL LINE SHADER ===
        const horizontalLineVertexShader = `
          uniform float time;
          uniform float index;
          uniform float totalLines;
          uniform float amplitude;
          uniform float baseAmplitude;
          uniform float frequency;
          uniform float speed;
          
          attribute float lineT;
          
          varying float vDistortion;
          varying vec3 vPosition;
          
          #define PI 3.14159265359
          
          // Simple 2D noise
          vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)),
                     dot(p, vec2(269.5, 183.3)));
            return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          }
          
          float noise(vec2 p) {
            const float K1 = 0.366025404;
            const float K2 = 0.211324865;
            
            vec2 i = floor(p + (p.x + p.y) * K1);
            vec2 a = p - i + (i.x + i.y) * K2;
            vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec2 b = a - o + K2;
            vec2 c = a - 1.0 + 2.0 * K2;
            
            vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
            vec3 n = h * h * h * h * vec3(dot(a, hash2(i + 0.0)),
                                           dot(b, hash2(i + o)),
                                           dot(c, hash2(i + 1.0)));
            
            return dot(n, vec3(70.0));
          }
          
          void main() {
            float t = lineT;
            float x = (t - 0.5) * 10.0;
            
            // Calculate vertical offset for line stacking
            float verticalOffset = (index - (totalLines - 1.0) / 2.0) * 0.3;
            
            // Time-based animation
            float adjustedTime = time * speed;
            
            // Multiple wave components for complexity
            float wave1 = sin(x * frequency + adjustedTime) * amplitude;
            float wave2 = sin(x * frequency * 2.0 + adjustedTime * 1.5) * amplitude * 0.5;
            float wave3 = cos(x * frequency * 0.5 - adjustedTime * 0.8) * amplitude * 0.3;
            
            // Add noise-based distortion
            float noiseValue = noise(vec2(x * 0.5, index + adjustedTime * 0.1));
            float noiseDistortion = noiseValue * amplitude * 0.2;
            
            // Combine all wave components
            float y = verticalOffset + wave1 + wave2 + wave3 + noiseDistortion;
            
            // Add some movement in Z for depth
            float z = sin(adjustedTime * 0.5 + index * 0.5) * 0.2;
            
            vec3 newPosition = vec3(x, y, z);
            vPosition = newPosition;
            vDistortion = abs(y - verticalOffset);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `;

        const horizontalLineFragmentShader = `
          uniform vec3 color;
          uniform float opacity;
          uniform float time;
          uniform float index;
          uniform float totalLines;
          
          varying float vDistortion;
          varying vec3 vPosition;
          
          void main() {
            // Calculate distance from center for fade effect
            float centerDistance = length(vPosition.xy) / 10.0;
            float fade = 1.0 - smoothstep(0.3, 1.0, centerDistance);
            
            // Create gradient based on distortion
            float gradient = smoothstep(0.0, 0.5, vDistortion);
            
            // Pulse effect
            float pulse = sin(time * 2.0 + index * 0.5) * 0.1 + 0.9;
            
            // Mix colors for variation
            vec3 finalColor = mix(color, vec3(1.0, 1.0, 1.0), gradient * 0.4);
            
            // Calculate final opacity
            float finalOpacity = opacity * fade * pulse * (0.5 + index / totalLines * 0.5);
            
            gl_FragColor = vec4(finalColor, finalOpacity);
          }
        `;

        // === CREATE HORIZONTAL LINES ===
        for (let i = 0; i < config.actualLineCount; i++) {
          const positions = new Float32Array(config.segments * 3);
          const lineT = new Float32Array(config.segments);
          
          // Create line geometry
          for (let j = 0; j < config.segments; j++) {
            const t = j / (config.segments - 1);
            lineT[j] = t;
            
            // Initial positions (will be modified in shader)
            positions[j * 3] = (t - 0.5) * 10;
            positions[j * 3 + 1] = 0;
            positions[j * 3 + 2] = 0;
          }
          
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('lineT', new THREE.BufferAttribute(lineT, 1));
          
          // Create material for each line
          const material = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              color: { value: new THREE.Color(color) },
              opacity: { value: 0.8 },
              index: { value: i },
              totalLines: { value: config.actualLineCount },
              amplitude: { value: amplitude },
              baseAmplitude: { value: 0.05 },
              frequency: { value: frequency },
              speed: { value: speed }
            },
            vertexShader: horizontalLineVertexShader,
            fragmentShader: horizontalLineFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });
          
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          lines.push({ mesh: line, material: material });
        }

        // === ADD FLOATING ORBS (decorative elements) ===
        const orbCount = 5;
        const orbs: any[] = [];
        
        for (let i = 0; i < orbCount; i++) {
          const orbGeometry = new THREE.SphereGeometry(0.05, 16, 16);
          const orbMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
          });
          
          const orb = new THREE.Mesh(orbGeometry, orbMaterial);
          orb.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          );
          
          scene.add(orb);
          orbs.push({
            mesh: orb,
            velocity: {
              x: (Math.random() - 0.5) * 0.01,
              y: (Math.random() - 0.5) * 0.01,
              z: (Math.random() - 0.5) * 0.01
            }
          });
        }

        // === MOUSE INTERACTION ===
        let mouseX = 0, mouseY = 0;
        let targetCameraX = 0, targetCameraY = 0;
        
        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          
          targetCameraX = mouseX * 0.5;
          targetCameraY = mouseY * 0.5;
        };
        
        window.addEventListener('mousemove', handleMouseMove);

        // === ANIMATION LOOP ===
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;
          
          // Update line materials
          lines.forEach((line, index) => {
            line.material.uniforms.time.value = time;
            
            // Add slight rotation to each line for variation
            line.mesh.rotation.z = Math.sin(time * 0.3 + index * 0.5) * 0.02;
          });
          
          // Animate orbs
          orbs.forEach((orb, index) => {
            // Floating motion
            orb.mesh.position.x += orb.velocity.x;
            orb.mesh.position.y += orb.velocity.y + Math.sin(time + index) * 0.001;
            orb.mesh.position.z += orb.velocity.z;
            
            // Wrap around screen
            if (Math.abs(orb.mesh.position.x) > 5) orb.velocity.x *= -1;
            if (Math.abs(orb.mesh.position.y) > 3) orb.velocity.y *= -1;
            if (Math.abs(orb.mesh.position.z) > 2) orb.velocity.z *= -1;
            
            // Pulsing
            const scale = 1 + Math.sin(time * 3 + index) * 0.3;
            orb.mesh.scale.setScalar(scale);
          });
          
          // Smooth camera movement
          camera.position.x += (targetCameraX - camera.position.x) * 0.05;
          camera.position.y += (targetCameraY - camera.position.y) * 0.05;
          camera.lookAt(0, 0, 0);
          
          // Gentle scene rotation
          scene.rotation.y = Math.sin(time * 0.1) * 0.1;
          
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

        // Cleanup
        return () => {
          mounted = false;
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          
          if (animationId) cancelAnimationFrame(animationId);
          
          // Dispose all geometries and materials
          lines.forEach(line => {
            if (line.mesh.geometry) line.mesh.geometry.dispose();
            if (line.material) line.material.dispose();
          });
          
          orbs.forEach(orb => {
            if (orb.mesh.geometry) orb.mesh.geometry.dispose();
            if (orb.mesh.material) orb.mesh.material.dispose();
          });
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize horizontal lines:', error);
        setIsLoading(false);
      }
    };

    initHorizontalLines();

    return () => {
      mounted = false;
    };
  }, [detectPerformanceLevel, lineCount, amplitude, frequency, speed, color, spacing]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse opacity-60">
            Generating waves...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}