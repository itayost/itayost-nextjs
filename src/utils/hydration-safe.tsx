// src/utils/hydration-safe.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';

/**
 * Component that only renders children on client side
 * Prevents hydration mismatches for dynamic content
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Hook to check if component is mounted (client-side)
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Generate stable random values based on seed
 * Useful for generating consistent "random" values
 */
export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate deterministic positions for particles/elements
 * Based on index rather than Math.random()
 */
export function getDeterministicPosition(index: number, max: number = 100) {
  // Use golden ratio for better distribution
  const phi = 1.618033988749895;
  const x = (index * phi * 31) % max;
  const y = (index * phi * 53) % max;
  
  return { x, y };
}

/**
 * Generate stable particle configurations
 */
export function getStableParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const pos = getDeterministicPosition(i);
    return {
      id: i,
      x: pos.x,
      y: pos.y,
      size: 0.5 + (i % 3) * 0.5, // Vary size deterministically
      delay: (i % 5) * 0.2, // Vary animation delay
      duration: 3 + (i % 3), // Vary animation duration
    };
  });
}

/**
 * Safe date/time display that prevents hydration mismatches
 */
export function SafeDate({ date }: { date: Date }) {
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    setDateString(date.toLocaleDateString());
  }, [date]);

  if (!dateString) {
    // Return placeholder during SSR
    return <span>Loading...</span>;
  }

  return <span>{dateString}</span>;
}

/**
 * Wrapper for animations that should only run on client
 */
export function ClientAnimation({ 
  children, 
  fallback = null 
}: { 
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const mounted = useIsMounted();

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}