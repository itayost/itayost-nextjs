// src/components/ui/ProjectImage.tsx
'use client';

import { useEffect, useRef } from 'react';

interface ProjectImageProps {
  projectId: number;
  color: string;
  title: string;
}

export default function ProjectImage({ projectId, color }: ProjectImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `${color}20`);
    gradient.addColorStop(1, `${color}05`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate unique pattern based on project ID
    ctx.strokeStyle = `${color}30`;
    ctx.lineWidth = 1;

    // Create generative pattern
    const seed = projectId * 137.5; // Prime number for better distribution
    const lines = 20 + (projectId % 10) * 5;

    for (let i = 0; i < lines; i++) {
      const angle = (seed + i * 137.5) % 360;
      const radius = 100 + (i * 10);
      const x1 = canvas.width / 2 + Math.cos(angle * Math.PI / 180) * radius;
      const y1 = canvas.height / 2 + Math.sin(angle * Math.PI / 180) * radius;
      const x2 = canvas.width / 2 + Math.cos((angle + 120) * Math.PI / 180) * radius;
      const y2 = canvas.height / 2 + Math.sin((angle + 120) * Math.PI / 180) * radius;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Add grid pattern
    ctx.strokeStyle = `${color}10`;
    ctx.lineWidth = 0.5;
    const gridSize = 50;

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Add project number
    ctx.font = 'bold 120px monospace';
    ctx.fillStyle = `${color}15`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      projectId.toString().padStart(2, '0'), 
      canvas.width / 2, 
      canvas.height / 2
    );

    // Add decorative elements
    ctx.strokeStyle = `${color}40`;
    ctx.lineWidth = 2;
    
    // Top left corner
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(100, 100);
    ctx.lineTo(100, 0);
    ctx.stroke();

    // Bottom right corner
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height - 100);
    ctx.lineTo(canvas.width - 100, canvas.height - 100);
    ctx.lineTo(canvas.width - 100, canvas.height);
    ctx.stroke();

  }, [projectId, color]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}