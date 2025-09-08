// src/components/three/ServicesScene.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function ServicesScene() {
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
    const serviceNodes: any[] = [];
    let centralCore: any;
    const orbitalRings: any[] = [];
    const dataStreams: any[] = [];
    let gridPlane: any;

    const initScene = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        // Performance detection
        const isMobile = window.innerWidth < 768;
        const config = {
          nodeCount: isMobile ? 4 : 6,
          streamCount: isMobile ? 20 : 40,
          gridSize: isMobile ? 10 : 20,
          complexity: isMobile ? 16 : 32
        };

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 5, 12);
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

        // Service categories
        const services = [
          'Web Development',
          'Mobile Apps',
          'UI/UX Design',
          'Cloud Architecture',
          'AI Integration',
          'Digital Strategy'
        ];

        // Create central core (main hub)
        const createCentralCore = () => {
          // Core geometry - dynamic polyhedron
          const coreGeometry = new THREE.IcosahedronGeometry(1.5, 1);
          
          // Shader material for glowing effect
          const coreMaterial = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              color: { value: new THREE.Color(0x00D9FF) }
            },
            vertexShader: `
              varying vec3 vNormal;
              varying vec3 vPosition;
              uniform float time;
              
              void main() {
                vNormal = normal;
                vPosition = position;
                
                vec3 pos = position;
                float pulse = sin(time * 2.0) * 0.05;
                pos *= 1.0 + pulse;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 color;
              uniform float time;
              varying vec3 vNormal;
              varying vec3 vPosition;
              
              void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                vec3 glowColor = color * intensity * 2.0;
                
                float pulse = sin(time * 3.0) * 0.2 + 0.8;
                
                gl_FragColor = vec4(glowColor * pulse, 0.6);
              }
            `,
            transparent: true,
            wireframe: true
          });

          centralCore = new THREE.Mesh(coreGeometry, coreMaterial);
          scene.add(centralCore);

          // Core wireframe overlay
          const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x00E5FF,
            transparent: true,
            opacity: 0.3
          });
          
          const wireframeGeometry = new THREE.EdgesGeometry(coreGeometry);
          const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
          centralCore.add(wireframe);
        };

        // Create service nodes orbiting the core
        const createServiceNodes = () => {
          const nodeGeometries = [
            new THREE.TetrahedronGeometry(0.8, 0),
            new THREE.OctahedronGeometry(0.8, 0),
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.ConeGeometry(0.7, 1.2, 4),
            new THREE.DodecahedronGeometry(0.8, 0),
            new THREE.SphereGeometry(0.8, 8, 6)
          ];

          for (let i = 0; i < config.nodeCount; i++) {
            const angle = (i / config.nodeCount) * Math.PI * 2;
            const radius = 4 + Math.sin(generationSeed * i) * 0.5;
            
            // Select geometry based on seed
            const geometryIndex = Math.floor((generationSeed * (i + 1)) % nodeGeometries.length);
            const geometry = nodeGeometries[geometryIndex];
            
            // Node material
            const material = new THREE.MeshBasicMaterial({
              color: 0x00D9FF,
              wireframe: true,
              transparent: true,
              opacity: 0.4
            });
            
            const node = new THREE.Mesh(geometry, material);
            
            // Position in orbit
            node.position.x = Math.cos(angle) * radius;
            node.position.z = Math.sin(angle) * radius;
            node.position.y = Math.sin(angle * 2) * 0.5;
            
            // Store service data
            node.userData = {
              service: services[i % services.length],
              angle: angle,
              radius: radius,
              orbitSpeed: 0.0005 + Math.random() * 0.0005,
              rotationSpeed: {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.001
              },
              pulseOffset: Math.random() * Math.PI * 2
            };
            
            serviceNodes.push(node);
            scene.add(node);
            
            // Add glowing edges
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({
              color: 0x00E5FF,
              transparent: true,
              opacity: 0.6
            });
            const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
            node.add(edgeLines);
            
            // Create connection to core
            const connectionPoints = [
              new THREE.Vector3(0, 0, 0),
              node.position
            ];
            const connectionGeometry = new THREE.BufferGeometry().setFromPoints(connectionPoints);
            const connectionMaterial = new THREE.LineBasicMaterial({
              color: 0x00B8D4,
              transparent: true,
              opacity: 0.2
            });
            const connection = new THREE.Line(connectionGeometry, connectionMaterial);
            connection.userData = { node: node };
            dataStreams.push(connection);
            scene.add(connection);
          }
        };

        // Create orbital rings
        const createOrbitalRings = () => {
          const ringRadii = [3, 4.5, 6];
          
          ringRadii.forEach((radius, index) => {
            const ringGeometry = new THREE.TorusGeometry(radius, 0.02, 4, config.complexity * 2);
            const ringMaterial = new THREE.MeshBasicMaterial({
              color: 0x00D9FF,
              transparent: true,
              opacity: 0.1 + index * 0.05,
              wireframe: true
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.userData = {
              rotationSpeed: 0.0002 * (index + 1),
              baseRadius: radius
            };
            
            orbitalRings.push(ring);
            scene.add(ring);
          });
        };

        // Create data streams (particles flowing between nodes)
        const createDataStreams = () => {
          const streamGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array(config.streamCount * 3);
          const colors = new Float32Array(config.streamCount * 3);
          const sizes = new Float32Array(config.streamCount);
          
          for (let i = 0; i < config.streamCount; i++) {
            const i3 = i * 3;
            
            // Random position along connections
            const nodeIndex = Math.floor(Math.random() * serviceNodes.length);
            const t = Math.random();
            
            if (serviceNodes[nodeIndex]) {
              positions[i3] = serviceNodes[nodeIndex].position.x * t;
              positions[i3 + 1] = serviceNodes[nodeIndex].position.y * t;
              positions[i3 + 2] = serviceNodes[nodeIndex].position.z * t;
            } else {
              positions[i3] = (Math.random() - 0.5) * 10;
              positions[i3 + 1] = (Math.random() - 0.5) * 10;
              positions[i3 + 2] = (Math.random() - 0.5) * 10;
            }
            
            // Cyan color with variation
            colors[i3] = 0;
            colors[i3 + 1] = 0.85 + Math.random() * 0.15;
            colors[i3 + 2] = 1;
            
            sizes[i] = Math.random() * 2 + 1;
          }
          
          streamGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          streamGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          streamGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
          
          const streamMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
          });
          
          const streamParticles = new THREE.Points(streamGeometry, streamMaterial);
          streamParticles.userData = { speeds: new Float32Array(config.streamCount).fill(0).map(() => Math.random() * 0.02 + 0.01) };
          dataStreams.push(streamParticles);
          scene.add(streamParticles);
        };

        // Create grid plane for depth
        const createGridPlane = () => {
          const gridHelper = new THREE.GridHelper(config.gridSize, config.gridSize, 0x00B8D4, 0x00D9FF);
          gridHelper.material.opacity = 0.05;
          gridHelper.material.transparent = true;
          gridHelper.position.y = -3;
          scene.add(gridHelper);
          gridPlane = gridHelper;
        };

        // Initialize all elements
        createCentralCore();
        createServiceNodes();
        createOrbitalRings();
        createDataStreams();
        createGridPlane();

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

          // Update central core
          if (centralCore) {
            centralCore.rotation.x = time * 0.1;
            centralCore.rotation.y = time * 0.15;
            centralCore.material.uniforms.time.value = time;
          }

          // Animate service nodes
          serviceNodes.forEach((node) => {
            // Orbit around center
            const userData = node.userData;
            const newAngle = userData.angle + time * userData.orbitSpeed;
            node.position.x = Math.cos(newAngle) * userData.radius;
            node.position.z = Math.sin(newAngle) * userData.radius;
            node.position.y = Math.sin(newAngle * 2) * 0.5;
            
            // Individual rotation
            node.rotation.x += userData.rotationSpeed.x;
            node.rotation.y += userData.rotationSpeed.y;
            node.rotation.z += userData.rotationSpeed.z;
            
            // Pulse effect
            const pulse = Math.sin(time * 2 + userData.pulseOffset) * 0.1 + 1;
            node.scale.set(pulse, pulse, pulse);
            
            // Update connection lines
            const connection = dataStreams.find(s => s.userData.node === node);
            if (connection && connection.geometry) {
              const points = [
                new THREE.Vector3(0, 0, 0),
                node.position
              ];
              connection.geometry.setFromPoints(points);
            }
          });

          // Animate orbital rings
          orbitalRings.forEach(ring => {
            ring.rotation.z += ring.userData.rotationSpeed;
            const wobble = Math.sin(time * 0.5) * 0.1;
            ring.rotation.x = Math.PI / 2 + wobble;
          });

          // Animate data stream particles
          dataStreams.forEach(stream => {
            if (stream.isPoints) {
              const positions = stream.geometry.attributes.position.array;
              const speeds = stream.userData.speeds;
              
              for (let i = 0; i < positions.length; i += 3) {
                // Move particles along paths
                const nodeIndex = Math.floor((i / 3) % serviceNodes.length);
                if (serviceNodes[nodeIndex]) {
                  const t = (time * speeds[i / 3]) % 1;
                  positions[i] = serviceNodes[nodeIndex].position.x * t;
                  positions[i + 1] = serviceNodes[nodeIndex].position.y * t;
                  positions[i + 2] = serviceNodes[nodeIndex].position.z * t;
                }
              }
              stream.geometry.attributes.position.needsUpdate = true;
            }
          });

          // Camera movement based on mouse
          camera.position.x = Math.sin(time * 0.1) * 8 + mouseX * 2;
          camera.position.z = Math.cos(time * 0.1) * 8 + mouseY * 2;
          camera.position.y = 5 + Math.sin(time * 0.2) * 2;
          camera.lookAt(0, 0, 0);

          // Subtle grid animation
          if (gridPlane) {
            gridPlane.rotation.y = time * 0.01;
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

        // Cleanup
        return () => {
          mounted = false;
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          
          if (animationId) cancelAnimationFrame(animationId);
          
          // Dispose resources
          serviceNodes.forEach(node => {
            if (node.geometry) node.geometry.dispose();
            if (node.material) node.material.dispose();
          });
          
          orbitalRings.forEach(ring => {
            if (ring.geometry) ring.geometry.dispose();
            if (ring.material) ring.material.dispose();
          });
          
          dataStreams.forEach(stream => {
            if (stream.geometry) stream.geometry.dispose();
            if (stream.material) stream.material.dispose();
          });
          
          if (centralCore) {
            if (centralCore.geometry) centralCore.geometry.dispose();
            if (centralCore.material) centralCore.material.dispose();
          }
          
          if (renderer) {
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
              containerRef.current.removeChild(renderer.domElement);
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize Services 3D scene:', error);
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
            Initializing Services...
          </div>
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}