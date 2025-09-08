// Minimal Specialized Generative Components - Fabric.vc Style
"use client";

import { useRef, useEffect } from "react";

/**
export function MinimalServicesIcon({ className = "", serviceIndex = 0 }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any, camera: any, renderer: any, mesh: any;

    const initMinimalIcon = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        // Simple scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 3;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(160, 160);
        containerRef.current.appendChild(renderer.domElement);

        // Different simple geometry for each service
        const geometries = [
          new THREE.IcosahedronGeometry(0.8, 0),      // Web Development
          new THREE.OctahedronGeometry(0.8, 0),       // Mobile Apps
          new THREE.TetrahedronGeometry(0.9, 0),      // UI/UX Design
          new THREE.DodecahedronGeometry(0.7, 0),     // E-commerce
          new THREE.TorusGeometry(0.6, 0.25, 8, 16),  // SEO/Marketing
          new THREE.BoxGeometry(1, 1, 1)              // Consulting
        ];

        const geometry = geometries[serviceIndex % geometries.length];

        // Clean, minimal material
        const material = new THREE.MeshBasicMaterial({
          color: 0x00D9FF,
          wireframe: true,
          transparent: true,
          opacity: 0.4 // Balanced visibility
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Simple hover interaction
        let hoverIntensity = 0;
        let targetIntensity = 0;
        
        const handleMouseEnter = () => {
          targetIntensity = 0.7;
        };
        const handleMouseLeave = () => {
          targetIntensity = 0.4;
        };

        containerRef.current.addEventListener('mouseenter', handleMouseEnter);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);

        // Minimal animation
        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);

          const time = Date.now() * 0.001;
          
          // Smooth hover transition
          hoverIntensity += (targetIntensity - hoverIntensity) * 0.1;
          
          // Gentle rotation
          mesh.rotation.x = time * 0.003;
          mesh.rotation.y = time * 0.005;
          
          // Update opacity
          mesh.material.opacity = hoverIntensity;

          renderer.render(scene, camera);
        };

        animate();

        return () => {
          mounted = false;
          containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
          containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
          if (animationId) cancelAnimationFrame(animationId);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      } catch (error) {
        console.error('Failed to initialize minimal service icon:', error);
      }
    };

    initMinimalIcon();
  }, [serviceIndex]);

  return <div ref={containerRef} className={`w-[160px] h-[160px] ${className}`} />;
}

// === MINIMAL PORTFOLIO BORDER ===
export function MinimalPortfolioBorder({ active = false, className = "" }) {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mounted = true;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!mounted) return;
      animationId = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.002;
      const intensity = active ? 0.6 : 0;

      // Minimal animated border - only show on hover
      if (intensity > 0) {
        ctx.strokeStyle = `rgba(0, 217, 255, ${intensity})`;
        ctx.lineWidth = 1;

        // Simple animated border
        ctx.beginPath();
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();

        // Subtle corner dots
        const corners = [
          [0, 0], [canvas.width, 0], 
          [canvas.width, canvas.height], [0, canvas.height]
        ];

        corners.forEach(([x, y]) => {
          const pulse = Math.sin(time * 2) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(0, 217, 255, ${intensity * pulse})`;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };

    animate();

    return () => {
      mounted = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [active]);

  return (
    <canvas 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 10 }}
    />
  );
}

// === MINIMAL FLOATING ELEMENTS (Very few, very subtle) ===
export function MinimalFloatingElements({ className = "" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationId: number;
    let scene: any, camera: any, renderer: any;
    const elements: any[] = [];

    const initMinimalFloating = async () => {
      try {
        const THREE = await import('three');

        if (!mounted || !containerRef.current) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Only 5-6 very subtle floating elements
        for (let i = 0; i < 6; i++) {
          const geometry = new THREE.OctahedronGeometry(0.1, 0);
          const material = new THREE.MeshBasicMaterial({
            color: 0x00D9FF,
            wireframe: true,
            transparent: true,
            opacity: 0.15 // Very subtle
          });

          const element = new THREE.Mesh(geometry, material);
          
          // Spread them far apart
          element.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
          );

          element.userData = {
            basePosition: element.position.clone(),
            speed: 0.001 + Math.random() * 0.001,
            rotationSpeed: 0.002 + Math.random() * 0.003
          };

          elements.push(element);
          scene.add(element);
        }

        const animate = () => {
          if (!mounted) return;
          animationId = requestAnimationFrame(animate);

          const time = Date.now() * 0.001;

          elements.forEach((element, index) => {
            const userData = element.userData;
            
            // Very gentle floating
            element.position.y = userData.basePosition.y + Math.sin(time * userData.speed + index) * 2;
            element.rotation.y += userData.rotationSpeed;
            
            // Fade based on distance
            const distance = element.position.length();
            element.material.opacity = Math.max(0.05, 0.2 - distance * 0.003);
          });

          renderer.render(scene, camera);
        };

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
          mounted = false;
          window.removeEventListener('resize', handleResize);
          if (animationId) cancelAnimationFrame(animationId);
          elements.forEach(element => {
            element.geometry.dispose();
            element.material.dispose();
          });
          renderer.dispose();
        };
      } catch (error) {
        console.error('Failed to initialize minimal floating elements:', error);
      }
    };

    initMinimalFloating();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

export default {
  MinimalServicesIcon,
  MinimalPortfolioBorder,
  MinimalFloatingElements
};