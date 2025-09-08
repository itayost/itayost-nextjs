// src/components/three/TechStackScene.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function TechStackScene() {
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
    let techCrystals: any[] = [];
    let dataFlow: any[] = [];
    let centralMatrix: any;
    let orbitalLayers: any[] = [];
    let energyField: any;

    const initScene = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        // Performance configuration
        const isMobile = window.innerWidth < 768;
        const config = {
          crystalCount: isMobile ? 6 : 12,
          layerCount: isMobile ? 2 : 3,
          particleCount: isMobile ? 500 : 1500,
          complexity: isMobile ? 4 : 8
        };

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 8, 12);
        camera.lookAt(0, 0, 0);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Technology stack data
        const technologies = [
          { name: 'React', tier: 1 },
          { name: 'Next.js', tier: 1 },
          { name: 'TypeScript', tier: 1 },
          { name: 'Three.js', tier: 2 },
          { name: 'Node.js', tier: 2 },
          { name: 'GraphQL', tier: 2 },
          { name: 'PostgreSQL', tier: 3 },
          { name: 'Redis', tier: 3 },
          { name: 'Docker', tier: 3 },
          { name: 'AWS', tier: 3 },
          { name: 'Kubernetes', tier: 3 },
          { name: 'TensorFlow', tier: 2 }
        ];

        // Create central matrix core
        const createCentralMatrix = () => {
          // Custom geometry for tech core
          const coreGeometry = new THREE.OctahedronGeometry(2, 2);
          
          // Shader material for matrix effect
          const coreMaterial = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
              color1: { value: new THREE.Color(0x00D9FF) },
              color2: { value: new THREE.Color(0x00B8D4) }
            },
            vertexShader: `
              varying vec2 vUv;
              varying vec3 vPosition;
              varying vec3 vNormal;
              uniform float time;
              
              void main() {
                vUv = uv;
                vPosition = position;
                vNormal = normal;
                
                vec3 pos = position;
                
                // Vertex displacement
                float displacement = sin(position.x * 2.0 + time) * 0.1;
                displacement += cos(position.y * 2.0 + time * 1.5) * 0.1;
                displacement += sin(position.z * 2.0 + time * 0.7) * 0.1;
                
                pos += normal * displacement;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
            fragmentShader: `
              uniform float time;
              uniform vec2 resolution;
              uniform vec3 color1;
              uniform vec3 color2;
              varying vec2 vUv;
              varying vec3 vPosition;
              varying vec3 vNormal;
              
              float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
              }
              
              void main() {
                // Matrix rain effect
                vec2 st = gl_FragCoord.xy / resolution.xy;
                float rnd = random(vec2(floor(st.x * 20.0), time));
                
                // Color gradient based on position
                vec3 color = mix(color1, color2, vPosition.y * 0.5 + 0.5);
                
                // Add digital noise
                float noise = random(vPosition.xy + time) * 0.1;
                color += vec3(noise);
                
                // Fresnel effect
                vec3 viewDirection = normalize(cameraPosition - vPosition);
                float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
                
                // Combine effects
                color *= fresnel * 2.0;
                
                // Matrix rain overlay
                if (rnd > 0.98) {
                  color += vec3(0.0, 1.0, 1.0) * 0.5;
                }
                
                gl_FragColor = vec4(color, 0.7);
              }
            `,
            transparent: true,
            side: THREE.DoubleSide
          });

          centralMatrix = new THREE.Mesh(coreGeometry, coreMaterial);
          scene.add(centralMatrix);

          // Add wireframe overlay
          const wireframe = new THREE.WireframeGeometry(coreGeometry);
          const wireLine = new THREE.LineSegments(
            wireframe,
            new THREE.LineBasicMaterial({
              color: 0x00E5FF,
              transparent: true,
              opacity: 0.3
            })
          );
          centralMatrix.add(wireLine);
        };

        // Create tech crystals representing different technologies
        const createTechCrystals = () => {
          technologies.forEach((tech, index) => {
            // Different crystal shapes for variety
            const crystalGeometries = [
              new THREE.TetrahedronGeometry(0.5, 0),
              new THREE.OctahedronGeometry(0.5, 0),
              new THREE.IcosahedronGeometry(0.5, 0),
              new THREE.BoxGeometry(0.6, 0.8, 0.6),
              new THREE.ConeGeometry(0.4, 1, 4),
              new THREE.DodecahedronGeometry(0.5, 0)
            ];

            const geometryIndex = Math.floor((generationSeed * (index + 1)) % crystalGeometries.length);
            const geometry = crystalGeometries[geometryIndex];

            // Crystal material with glow
            const material = new THREE.MeshBasicMaterial({
              color: 0x00D9FF,
              transparent: true,
              opacity: 0.5,
              wireframe: false
            });

            const crystal = new THREE.Mesh(geometry, material);

            // Position crystals in tiers
            const tierRadius = 3 + tech.tier * 1.5;
            const angle = (index / technologies.filter(t => t.tier === tech.tier).length) * Math.PI * 2;
            
            crystal.position.x = Math.cos(angle + generationSeed) * tierRadius;
            crystal.position.y = tech.tier - 1.5;
            crystal.position.z = Math.sin(angle + generationSeed) * tierRadius;

            // Add wireframe edges
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({
              color: 0x00E5FF,
              linewidth: 2
            });
            const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
            crystal.add(edgeMesh);

            // Store tech data
            crystal.userData = {
              technology: tech.name,
              tier: tech.tier,
              rotationSpeed: {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.001
              },
              floatSpeed: Math.random() * 0.5 + 0.5,
              floatAmount: Math.random() * 0.3 + 0.2,
              angle: angle,
              tierRadius: tierRadius
            };

            techCrystals.push(crystal);
            scene.add(crystal);

            // Add glowing point light for each crystal
            const light = new THREE.PointLight(0x00D9FF, 0.3, 2);
            light.position.copy(crystal.position);
            crystal.userData.light = light;
            scene.add(light);
          });
        };

        // Create orbital layers representing architecture tiers
        const createOrbitalLayers = () => {
          for (let i = 0; i < config.layerCount; i++) {
            const layerRadius = 4 + i * 2;
            const layerGeometry = new THREE.TorusGeometry(layerRadius, 0.05, 8, 64);
            const layerMaterial = new THREE.MeshBasicMaterial({
              color: 0x00B8D4,
              transparent: true,
              opacity: 0.1 + i * 0.05
            });

            const layer = new THREE.Mesh(layerGeometry, layerMaterial);
            layer.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.2;
            layer.userData = {
              rotationSpeed: (0.0005 + Math.random() * 0.0005) * (i % 2 ? 1 : -1),
              tiltSpeed: 0.0002
            };

            orbitalLayers.push(layer);
            scene.add(layer);
          }
        };

        // Create data flow particles
        const createDataFlow = () => {
          const flowGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array(config.particleCount * 3);
          const colors = new Float32Array(config.particleCount * 3);
          const sizes = new Float32Array(config.particleCount);

          for (let i = 0; i < config.particleCount; i++) {
            const i3 = i * 3;
            
            // Create particles in cylindrical distribution
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 8;
            const height = (Math.random() - 0.5) * 10;

            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = height;
            positions[i3 + 2] = Math.sin(angle) * radius;

            // Cyan color spectrum
            colors[i3] = 0;
            colors[i3 + 1] = 0.7 + Math.random() * 0.3;
            colors[i3 + 2] = 1;

            sizes[i] = Math.random() * 2;
          }

          flowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          flowGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          flowGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

          const flowMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
          });

          const flow = new THREE.Points(flowGeometry, flowMaterial);
          flow.userData = {
            speeds: new Float32Array(config.particleCount).fill(0).map(() => Math.random() * 0.02 + 0.01)
          };
          
          dataFlow.push(flow);
          scene.add(flow);
        };

        // Create energy field effect
        const createEnergyField = () => {
          const fieldGeometry = new THREE.SphereGeometry(10, 32, 32);
          const fieldMaterial = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              color: { value: new THREE.Color(0x00D9FF) }
            },
            vertexShader: `
              varying vec3 vPosition;
              varying vec3 vNormal;
              
              void main() {
                vPosition = position;
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform float time;
              uniform vec3 color;
              varying vec3 vPosition;
              varying vec3 vNormal;
              
              void main() {
                float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
                float pulse = sin(time * 2.0 + vPosition.y * 0.5) * 0.5 + 0.5;
                
                gl_FragColor = vec4(color * intensity * pulse, intensity * 0.1);
              }
            `,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
          });

          energyField = new THREE.Mesh(fieldGeometry, fieldMaterial);
          scene.add(energyField);
        };

        // Initialize all components
        createCentralMatrix();
        createTechCrystals();
        createOrbitalLayers();
        createDataFlow();
        createEnergyField();

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;

          // Animate central matrix
          if (centralMatrix) {
            centralMatrix.rotation.x = time * 0.1;
            centralMatrix.rotation.y = time * 0.15;
            centralMatrix.material.uniforms.time.value = time;
            
            // Scale pulse
            const pulse = Math.sin(time * 2) * 0.1 + 1;
            centralMatrix.scale.set(pulse, pulse, pulse);
          }

          // Animate tech crystals
          techCrystals.forEach((crystal, index) => {
            const userData = crystal.userData;
            
            // Individual rotation
            crystal.rotation.x += userData.rotationSpeed.x;
            crystal.rotation.y += userData.rotationSpeed.y;
            crystal.rotation.z += userData.rotationSpeed.z;
            
            // Floating motion
            const floatY = Math.sin(time * userData.floatSpeed + index) * userData.floatAmount;
            crystal.position.y = userData.tier - 1.5 + floatY;
            
            // Orbit around center
            const orbitAngle = userData.angle + time * 0.1;
            crystal.position.x = Math.cos(orbitAngle) * userData.tierRadius;
            crystal.position.z = Math.sin(orbitAngle) * userData.tierRadius;
            
            // Update light position
            if (userData.light) {
              userData.light.position.copy(crystal.position);
              userData.light.intensity = 0.3 + Math.sin(time * 3 + index) * 0.1;
            }
            
            // Scale on mouse proximity
            const distToMouse = Math.sqrt(
              Math.pow(crystal.position.x - mouseX * 5, 2) +
              Math.pow(crystal.position.z - mouseY * 5, 2)
            );
            const scale = 1 + Math.max(0, 1 - distToMouse / 10) * 0.3;
            crystal.scale.set(scale, scale, scale);
          });

          // Animate orbital layers
          orbitalLayers.forEach((layer, index) => {
            layer.rotation.z += layer.userData.rotationSpeed;
            layer.rotation.x += layer.userData.tiltSpeed;
            
            // Wobble effect
            const wobble = Math.sin(time * 0.5 + index) * 0.05;
            layer.rotation.y = wobble;
          });

          // Animate data flow particles
          dataFlow.forEach(flow => {
            const positions = flow.geometry.attributes.position.array;
            const speeds = flow.userData.speeds;
            
            for (let i = 0; i < positions.length; i += 3) {
              // Spiral upward motion
              positions[i + 1] += speeds[i / 3];
              
              // Reset at top
              if (positions[i + 1] > 5) {
                positions[i + 1] = -5;
              }
              
              // Rotate around center
              const x = positions[i];
              const z = positions[i + 2];
              const angle = speeds[i / 3] * 0.5;
              positions[i] = x * Math.cos(angle) - z * Math.sin(angle);
              positions[i + 2] = x * Math.sin(angle) + z * Math.cos(angle);
            }
            
            flow.geometry.attributes.position.needsUpdate = true;
            flow.rotation.y = time * 0.05;
          });

          // Animate energy field
          if (energyField) {
            energyField.material.uniforms.time.value = time;
            energyField.rotation.y = time * 0.02;
          }

          // Camera movement
          camera.position.x = Math.cos(time * 0.1) * 12 + mouseX * 4;
          camera.position.z = Math.sin(time * 0.1) * 12 + mouseY * 4;
          camera.position.y = 8 + Math.sin(time * 0.2) * 2;
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
          
          if (centralMatrix) {
            centralMatrix.material.uniforms.resolution.value.set(width, height);
          }
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
          
          // Dispose all resources
          techCrystals.forEach(crystal => {
            if (crystal.geometry) crystal.geometry.dispose();
            if (crystal.material) crystal.material.dispose();
            if (crystal.userData.light) {
              scene.remove(crystal.userData.light);
              crystal.userData.light.dispose();
            }
          });
          
          orbitalLayers.forEach(layer => {
            if (layer.geometry) layer.geometry.dispose();
            if (layer.material) layer.material.dispose();
          });
          
          dataFlow.forEach(flow => {
            if (flow.geometry) flow.geometry.dispose();
            if (flow.material) flow.material.dispose();
          });
          
          if (centralMatrix) {
            if (centralMatrix.geometry) centralMatrix.geometry.dispose();
            if (centralMatrix.material) centralMatrix.material.dispose();
          }
          
          if (energyField) {
            if (energyField.geometry) energyField.geometry.dispose();
            if (energyField.material) energyField.material.dispose();
          }
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize Tech Stack 3D scene:', error);
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
            Building Stack...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}