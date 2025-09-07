// src/components/three/FabricParametricLines.tsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface FabricParametricLinesProps {
  lineCount?: number;
  complexity?: number;
  speed?: number;
  color?: string;
  opacity?: number;
}

export default function FabricParametricLines({
  lineCount = 24,
  complexity = 1.0,
  speed = 0.3,
  color = '#00D9FF',
  opacity = 0.6
}: FabricParametricLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generationSeed] = useState(() => Date.now() + Math.random());

  const detectPerformanceLevel = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = /Android.*Chrome\/[.0-9]*\s|iPhone\s|iPad\s/.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 2;
    
    if (isMobile || isLowEnd || cores <= 2) {
      return { 
        segments: 100,
        actualLineCount: Math.min(lineCount, 12),
        animationSpeed: speed * 0.5
      };
    } else if (cores <= 4) {
      return { 
        segments: 200,
        actualLineCount: Math.min(lineCount, 18),
        animationSpeed: speed * 0.8
      };
    } else {
      return { 
        segments: 300,
        actualLineCount: lineCount,
        animationSpeed: speed
      };
    }
  }, [lineCount, speed]);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any;
    let camera: any;
    let renderer: any;
    const lines: any[] = [];
    let lineMaterials: any[] = [];

    const initParametricScene = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        const config = detectPerformanceLevel();

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // === PARAMETRIC LINE SHADER ===
        const lineVertexShader = `
          uniform float time;
          uniform float index;
          uniform float totalLines;
          uniform float complexity;
          uniform float noiseStrength;
          
          attribute float linePosition;
          
          varying vec3 vPosition;
          varying float vDistortion;
          
          #define PI 3.14159265359
          
          // Simplex noise function (simplified)
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          
          float noise(vec3 p) {
            vec3 a = floor(p);
            vec3 d = p - a;
            d = d * d * (3.0 - 2.0 * d);
            
            vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
            vec4 k1 = permute(b.xyxy);
            vec4 k2 = permute(k1.xyxy + b.zzww);
            
            vec4 c = k2 + a.zzzz;
            vec4 k3 = permute(c);
            vec4 k4 = permute(c + 1.0);
            
            vec4 o1 = fract(k3 * (1.0 / 41.0));
            vec4 o2 = fract(k4 * (1.0 / 41.0));
            
            vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
            vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
            
            return o4.y * d.y + o4.x * (1.0 - d.y);
          }
          
          // Parametric curve function inspired by Fabric
          vec3 parametricCurve(float t, float lineIndex) {
            float adjustedTime = time;
            
            // Base parametric equations
            float theta = t * PI * 2.0 * complexity + lineIndex * 2.0;
            float phi = sin(t * 3.0 + adjustedTime + lineIndex) * PI * 0.5;
            
            // Add noise-based distortion
            vec3 noisePos = vec3(t * 2.0, lineIndex * 0.5, adjustedTime * 0.1);
            float n = noise(noisePos) * noiseStrength;
            
            // Radius with variation
            float r = 1.0 + n * 0.3 + sin(t * 4.0 + adjustedTime) * 0.2;
            
            // Additional wave patterns
            float wave1 = sin(t * 8.0 + adjustedTime * 2.0) * 0.1;
            float wave2 = cos(t * 5.0 - adjustedTime * 1.5) * 0.15;
            
            // Calculate position
            float x = r * cos(theta) * cos(phi) + wave1;
            float y = r * sin(phi) + sin(adjustedTime + lineIndex * 0.5) * 0.3 + wave2;
            float z = r * sin(theta) * cos(phi);
            
            return vec3(x, y, z) * 1.5;
          }
          
          void main() {
            float t = linePosition;
            vec3 curvePos = parametricCurve(t, index);
            
            vPosition = curvePos;
            vDistortion = length(curvePos) / 2.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(curvePos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `;

        const lineFragmentShader = `
          uniform vec3 color;
          uniform float opacity;
          uniform float time;
          
          varying vec3 vPosition;
          varying float vDistortion;
          
          void main() {
            // Create gradient based on position
            float gradient = smoothstep(0.0, 1.0, vDistortion);
            
            // Add subtle pulsing
            float pulse = sin(time * 2.0 + vDistortion * 3.0) * 0.1 + 0.9;
            
            // Mix colors for depth
            vec3 finalColor = mix(color, vec3(1.0, 1.0, 1.0), gradient * 0.3);
            
            gl_FragColor = vec4(finalColor, opacity * pulse);
          }
        `;

        // === CREATE PARAMETRIC LINES ===
        for (let i = 0; i < config.actualLineCount; i++) {
          // Create geometry for each line
          const positions = new Float32Array(config.segments * 3);
          const linePositions = new Float32Array(config.segments);
          
          for (let j = 0; j < config.segments; j++) {
            const t = j / (config.segments - 1);
            linePositions[j] = t;
            
            // Initialize with straight line (will be animated in shader)
            positions[j * 3] = t * 2 - 1;
            positions[j * 3 + 1] = 0;
            positions[j * 3 + 2] = 0;
          }
          
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('linePosition', new THREE.BufferAttribute(linePositions, 1));
          
          // Create material with unique uniforms for each line
          const material = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              color: { value: new THREE.Color(color) },
              opacity: { value: opacity * (0.5 + (i / config.actualLineCount) * 0.5) },
              index: { value: i / config.actualLineCount },
              totalLines: { value: config.actualLineCount },
              complexity: { value: complexity },
              noiseStrength: { value: 0.5 }
            },
            vertexShader: lineVertexShader,
            fragmentShader: lineFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });
          
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          lines.push(line);
          lineMaterials.push(material);
        }

        // === ADD CENTRAL SPHERE (optional) ===
        const sphereGeometry = new THREE.IcosahedronGeometry(0.6, 2);
        const sphereMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(color) },
            rimColor: { value: new THREE.Color('#00E5FF') }
          },
          vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 color;
            uniform vec3 rimColor;
            
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
              vec3 viewDirection = normalize(cameraPosition - vPosition);
              float fresnel = 1.0 - dot(viewDirection, vNormal);
              fresnel = pow(fresnel, 2.0);
              
              vec3 finalColor = mix(color, rimColor, fresnel);
              float alpha = (fresnel * 0.8 + 0.2) * 0.3;
              
              gl_FragColor = vec4(finalColor, alpha);
            }
          `,
          transparent: true,
          wireframe: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        // === ADD PARTICLES ===
        const particleCount = 100;
        const particlePositions = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          const r = 2 + Math.random() * 2;
          
          particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          particlePositions[i * 3 + 2] = r * Math.cos(phi);
          
          particleSizes[i] = Math.random() * 0.02 + 0.01;
        }
        
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // === MOUSE INTERACTION ===
        let mouseX = 0, mouseY = 0;
        
        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        
        window.addEventListener('mousemove', handleMouseMove);

        // === ANIMATION LOOP ===
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001 * config.animationSpeed;
          
          // Update all line materials
          lineMaterials.forEach((material) => {
            material.uniforms.time.value = time;
          });
          
          // Animate sphere
          if (sphere) {
            sphere.rotation.y = time * 0.1;
            sphere.rotation.x = Math.sin(time * 0.05) * 0.1;
            sphereMaterial.uniforms.time.value = time;
          }
          
          // Animate particles
          if (particles) {
            particles.rotation.y = time * 0.02;
            particles.rotation.x = time * 0.01;
          }
          
          // Camera movement based on mouse
          camera.position.x = 2 + mouseX * 0.5;
          camera.position.y = 1 + mouseY * 0.5;
          camera.lookAt(0, 0, 0);
          
          // Rotate entire scene slowly
          scene.rotation.y = time * 0.05;
          
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
          
          // Dispose geometries and materials
          lines.forEach(line => {
            if (line.geometry) line.geometry.dispose();
            if (line.material) line.material.dispose();
          });
          
          if (sphere) {
            if (sphere.geometry) sphere.geometry.dispose();
            if (sphere.material) sphere.material.dispose();
          }
          
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
        console.error('Failed to initialize parametric scene:', error);
        setIsLoading(false);
      }
    };

    initParametricScene();

    return () => {
      mounted = false;
    };
  }, [generationSeed, detectPerformanceLevel, lineCount, complexity, speed, color, opacity]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 text-sm uppercase tracking-wider animate-pulse opacity-60">
            Generating parametric lines...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}