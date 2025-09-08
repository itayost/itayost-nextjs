// src/components/three/ContactScene.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function ContactScene() {
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
    const networkNodes: any[] = [];
    const networkConnections: any[] = [];
    const communicationWaves: any[] = [];
    let centralHub: any;
    let outerRing: any;
    let signalParticles: any;

    const initScene = async () => {
      try {
        const THREE = await import('three');
        const { createNoise3D } = await import('simplex-noise');

        if (!mounted || !containerRef.current) return;

        const noise3D = createNoise3D();

        // Performance configuration
        const isMobile = window.innerWidth < 768;
        const config = {
          nodeCount: isMobile ? 15 : 30,
          connectionThreshold: isMobile ? 3 : 4,
          waveCount: isMobile ? 3 : 5,
          particleCount: isMobile ? 100 : 300,
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

        // Create central communication hub
        const createCentralHub = () => {
          // Main hub sphere with custom shader
          const hubGeometry = new THREE.SphereGeometry(1, config.complexity * 2, config.complexity);
          
          const hubMaterial = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              noiseStrength: { value: 0.1 },
              glowColor: { value: new THREE.Color(0x00D9FF) },
              mousePosition: { value: new THREE.Vector2(0, 0) }
            },
            vertexShader: `
              uniform float time;
              uniform float noiseStrength;
              varying vec3 vNormal;
              varying vec3 vPosition;
              
              vec3 mod289(vec3 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
              }
              
              vec4 mod289(vec4 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
              }
              
              vec4 permute(vec4 x) {
                return mod289(((x*34.0)+1.0)*x);
              }
              
              vec4 taylorInvSqrt(vec4 r) {
                return 1.79284291400159 - 0.85373472095314 * r;
              }
              
              float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                
                vec3 i = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);
                
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);
                
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;
                
                i = mod289(i);
                vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                
                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;
                
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);
                
                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
                
                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);
                
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
                
                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                
                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);
                
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;
                
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
              }
              
              void main() {
                vNormal = normal;
                vPosition = position;
                
                vec3 pos = position;
                
                // Apply noise distortion
                float noiseValue = snoise(position * 2.0 + time * 0.5);
                pos += normal * noiseValue * noiseStrength;
                
                // Pulse effect
                float pulse = sin(time * 2.0) * 0.05 + 1.0;
                pos *= pulse;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 glowColor;
              uniform float time;
              uniform vec2 mousePosition;
              varying vec3 vNormal;
              varying vec3 vPosition;
              
              void main() {
                // Fresnel effect
                vec3 viewDirection = normalize(cameraPosition - vPosition);
                float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
                
                // Dynamic glow based on mouse
                float mouseInfluence = length(mousePosition) * 0.2;
                
                // Animated glow
                float glow = fresnel * (0.8 + sin(time * 3.0) * 0.2 + mouseInfluence);
                
                gl_FragColor = vec4(glowColor * glow, glow * 0.6);
              }
            `,
            transparent: true,
            side: THREE.DoubleSide
          });

          centralHub = new THREE.Mesh(hubGeometry, hubMaterial);
          scene.add(centralHub);

          // Wireframe overlay
          const wireGeometry = new THREE.IcosahedronGeometry(1.1, 1);
          const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x00E5FF,
            wireframe: true,
            transparent: true,
            opacity: 0.2
          });
          const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
          centralHub.add(wireMesh);
        };

        // Create network nodes around the hub
        const createNetworkNodes = () => {
          const nodeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
          
          for (let i = 0; i < config.nodeCount; i++) {
            // Fibonacci sphere distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / config.nodeCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            
            const radius = 3 + Math.sin(generationSeed * i) * 1.5;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            const nodeMaterial = new THREE.MeshBasicMaterial({
              color: 0x00D9FF,
              transparent: true,
              opacity: 0.6
            });
            
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(x, y, z);
            
            node.userData = {
              originalPosition: new THREE.Vector3(x, y, z),
              oscillationSpeed: Math.random() * 0.5 + 0.5,
              oscillationAmount: Math.random() * 0.2 + 0.1,
              pulseOffset: Math.random() * Math.PI * 2,
              connectionStrength: Math.random()
            };
            
            networkNodes.push(node);
            scene.add(node);
            
            // Add glow sprite
            const spriteMaterial = new THREE.SpriteMaterial({
              map: createGlowTexture(),
              color: 0x00D9FF,
              blending: THREE.AdditiveBlending,
              transparent: true,
              opacity: 0.3
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(0.5, 0.5, 1);
            node.add(sprite);
          }
          
          // Helper function to create glow texture
          function createGlowTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            
            const gradient = ctx!.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(0, 217, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(0, 217, 255, 0.5)');
            gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
            
            ctx!.fillStyle = gradient;
            ctx!.fillRect(0, 0, 64, 64);
            
            return new THREE.CanvasTexture(canvas);
          }
        };

        // Create connections between nodes
        const createNetworkConnections = () => {
          for (let i = 0; i < networkNodes.length; i++) {
            for (let j = i + 1; j < networkNodes.length; j++) {
              const distance = networkNodes[i].position.distanceTo(networkNodes[j].position);
              
              if (distance < config.connectionThreshold) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                  networkNodes[i].position,
                  networkNodes[j].position
                ]);
                
                const material = new THREE.LineBasicMaterial({
                  color: 0x00B8D4,
                  transparent: true,
                  opacity: 0.1 * (1 - distance / config.connectionThreshold)
                });
                
                const connection = new THREE.Line(geometry, material);
                connection.userData = {
                  startNode: networkNodes[i],
                  endNode: networkNodes[j],
                  baseOpacity: material.opacity
                };
                
                networkConnections.push(connection);
                scene.add(connection);
              }
            }
          }
          
          // Connect all nodes to central hub with very faint lines
          networkNodes.forEach(node => {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, 0, 0),
              node.position
            ]);
            
            const material = new THREE.LineBasicMaterial({
              color: 0x00D9FF,
              transparent: true,
              opacity: 0.05
            });
            
            const hubConnection = new THREE.Line(geometry, material);
            hubConnection.userData = {
              node: node,
              isHubConnection: true
            };
            
            networkConnections.push(hubConnection);
            scene.add(hubConnection);
          });
        };

        // Create communication waves
        const createCommunicationWaves = () => {
          for (let i = 0; i < config.waveCount; i++) {
            const waveGeometry = new THREE.RingGeometry(0.1, 0.5, 32);
            const waveMaterial = new THREE.MeshBasicMaterial({
              color: 0x00E5FF,
              transparent: true,
              opacity: 0,
              side: THREE.DoubleSide
            });
            
            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            wave.userData = {
              active: false,
              speed: 0.05,
              maxScale: 10,
              startTime: 0
            };
            
            communicationWaves.push(wave);
            scene.add(wave);
          }
        };

        // Create signal particles
        const createSignalParticles = () => {
          const particleGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array(config.particleCount * 3);
          const colors = new Float32Array(config.particleCount * 3);
          
          for (let i = 0; i < config.particleCount; i++) {
            const i3 = i * 3;
            
            // Random position in sphere
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.acos(Math.random() * 2 - 1);
            const radius = Math.random() * 8;
            
            positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
            positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            positions[i3 + 2] = radius * Math.cos(theta);
            
            // Cyan color variations
            colors[i3] = 0;
            colors[i3 + 1] = 0.7 + Math.random() * 0.3;
            colors[i3 + 2] = 1;
          }
          
          particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          
          const particleMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
          });
          
          signalParticles = new THREE.Points(particleGeometry, particleMaterial);
          scene.add(signalParticles);
        };

        // Create outer ring structure
        const createOuterRing = () => {
          const ringGeometry = new THREE.TorusGeometry(6, 0.05, 4, 64);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00D9FF,
            transparent: true,
            opacity: 0.1
          });
          
          outerRing = new THREE.Mesh(ringGeometry, ringMaterial);
          outerRing.rotation.x = Math.PI / 2;
          scene.add(outerRing);
        };

        // Initialize all components
        createCentralHub();
        createNetworkNodes();
        createNetworkConnections();
        createCommunicationWaves();
        createSignalParticles();
        createOuterRing();

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Trigger wave animation periodically
        let lastWaveTime = 0;
        const waveInterval = 2000; // milliseconds

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);
          
          const time = Date.now() * 0.001;
          const currentTime = Date.now();

          // Update central hub
          if (centralHub) {
            centralHub.rotation.y = time * 0.1;
            centralHub.material.uniforms.time.value = time;
            centralHub.material.uniforms.mousePosition.value.set(mouseX, mouseY);
            
            // Morph hub with noise
            const positions = centralHub.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
              const vertex = new THREE.Vector3(
                positions.array[i * 3],
                positions.array[i * 3 + 1],
                positions.array[i * 3 + 2]
              );
              vertex.normalize();
              
              const noiseValue = noise3D(
                vertex.x * 2 + time * 0.5,
                vertex.y * 2 + time * 0.5,
                vertex.z * 2 + time * 0.5
              );
              
              const scale = 1 + noiseValue * 0.1;
              positions.array[i * 3] = vertex.x * scale;
              positions.array[i * 3 + 1] = vertex.y * scale;
              positions.array[i * 3 + 2] = vertex.z * scale;
            }
            positions.needsUpdate = true;
          }

          // Animate network nodes
          networkNodes.forEach((node, index) => {
            const userData = node.userData;
            
            // Oscillation
            const oscillation = Math.sin(time * userData.oscillationSpeed) * userData.oscillationAmount;
            node.position.copy(userData.originalPosition);
            node.position.multiplyScalar(1 + oscillation);
            
            // Pulse
            const pulse = Math.sin(time * 2 + userData.pulseOffset) * 0.2 + 1;
            node.scale.set(pulse, pulse, pulse);
            
            // Brightness variation
            node.material.opacity = 0.4 + Math.sin(time * 3 + index) * 0.2;
          });

          // Update connections
          networkConnections.forEach(connection => {
            if (connection.userData.isHubConnection) {
              // Update hub connections
              const points = [
                new THREE.Vector3(0, 0, 0),
                connection.userData.node.position
              ];
              connection.geometry.setFromPoints(points);
            } else if (connection.userData.startNode) {
              // Update node-to-node connections
              const points = [
                connection.userData.startNode.position,
                connection.userData.endNode.position
              ];
              connection.geometry.setFromPoints(points);
              
              // Pulse connection opacity
              const pulse = Math.sin(time * 4) * 0.05;
              connection.material.opacity = connection.userData.baseOpacity + pulse;
            }
          });

          // Trigger communication waves
          if (currentTime - lastWaveTime > waveInterval) {
            const inactiveWave = communicationWaves.find(w => !w.userData.active);
            if (inactiveWave) {
              inactiveWave.userData.active = true;
              inactiveWave.userData.startTime = time;
              inactiveWave.position.set(0, 0, 0);
              inactiveWave.scale.set(1, 1, 1);
              inactiveWave.material.opacity = 0.5;
            }
            lastWaveTime = currentTime;
          }

          // Animate communication waves
          communicationWaves.forEach(wave => {
            if (wave.userData.active) {
              const elapsed = time - wave.userData.startTime;
              const progress = elapsed * wave.userData.speed;
              
              wave.scale.set(progress * 10, progress * 10, 1);
              wave.material.opacity = Math.max(0, 0.5 - progress * 0.1);
              
              if (wave.material.opacity <= 0) {
                wave.userData.active = false;
              }
            }
          });

          // Animate signal particles
          if (signalParticles) {
            const positions = signalParticles.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
              // Circular motion
              const angle = time * 0.2 + (i / 3) * 0.1;
              const radius = 5 + Math.sin(time + i) * 2;
              
              positions[i] = Math.cos(angle) * radius + Math.sin(time * 2 + i) * 0.5;
              positions[i + 1] = Math.sin(angle) * radius + Math.cos(time * 2 + i) * 0.5;
              positions[i + 2] += Math.sin(time + i * 0.01) * 0.01;
            }
            
            signalParticles.geometry.attributes.position.needsUpdate = true;
            signalParticles.rotation.y = time * 0.05;
          }

          // Rotate outer ring
          if (outerRing) {
            outerRing.rotation.z = time * 0.05;
            const wobble = Math.sin(time * 0.5) * 0.1;
            outerRing.rotation.x = Math.PI / 2 + wobble;
          }

          // Camera orbit
          camera.position.x = Math.cos(time * 0.1) * 10 + mouseX * 3;
          camera.position.y = Math.sin(time * 0.15) * 3 + mouseY * 3;
          camera.position.z = Math.sin(time * 0.1) * 10 + 5;
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
          networkNodes.forEach(node => {
            if (node.geometry) node.geometry.dispose();
            if (node.material) node.material.dispose();
          });
          
          networkConnections.forEach(connection => {
            if (connection.geometry) connection.geometry.dispose();
            if (connection.material) connection.material.dispose();
          });
          
          communicationWaves.forEach(wave => {
            if (wave.geometry) wave.geometry.dispose();
            if (wave.material) wave.material.dispose();
          });
          
          if (centralHub) {
            if (centralHub.geometry) centralHub.geometry.dispose();
            if (centralHub.material) centralHub.material.dispose();
          }
          
          if (signalParticles) {
            if (signalParticles.geometry) signalParticles.geometry.dispose();
            if (signalParticles.material) signalParticles.material.dispose();
          }
          
          if (outerRing) {
            if (outerRing.geometry) outerRing.geometry.dispose();
            if (outerRing.material) outerRing.material.dispose();
          }
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize Contact 3D scene:', error);
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
            Connecting...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}