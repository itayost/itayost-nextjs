// src/components/ui/Avatar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  border?: boolean;
  gradient?: boolean;
  className?: string;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  variant = 'circle',
  status,
  border = false,
  gradient = false,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-2xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-neutral-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn('relative inline-block', className)}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          sizes[size],
          shapes[variant],
          border && 'ring-2 ring-white/20',
          gradient && 'p-[2px]'
        )}
      >
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple via-accent-pink to-primary-500" />
        )}
        
        <div
          className={cn(
            'relative w-full h-full flex items-center justify-center font-bold',
            shapes[variant],
            gradient ? 'bg-neutral-900' : 'bg-neutral-800',
            !src || imageError ? 'text-white' : ''
          )}
        >
          {src && !imageError ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : name ? (
            <span className="select-none">{getInitials(name)}</span>
          ) : (
            <User className="w-1/2 h-1/2 text-neutral-600" />
          )}
        </div>
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-neutral-950',
            statusColors[status],
            size === 'xs' && 'w-2 h-2',
            size === 'sm' && 'w-2.5 h-2.5',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-4 h-4',
            size === 'xl' && 'w-5 h-5',
            size === '2xl' && 'w-6 h-6',
            status === 'online' && 'animate-pulse'
          )}
        />
      )}
    </motion.div>
  );
}

// Avatar Group Component
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function AvatarGroup({ children, max = 4, size = 'md', className }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={cn('flex -space-x-3', className)}>
      {visibleChildren.map((child, index) => (
        <div key={index} className="relative" style={{ zIndex: max - index }}>
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative flex items-center justify-center bg-neutral-800 text-white font-bold rounded-full ring-2 ring-neutral-950',
            size === 'xs' && 'w-8 h-8 text-xs',
            size === 'sm' && 'w-10 h-10 text-sm',
            size === 'md' && 'w-12 h-12 text-base',
            size === 'lg' && 'w-16 h-16 text-lg',
            size === 'xl' && 'w-20 h-20 text-xl',
            size === '2xl' && 'w-24 h-24 text-2xl'
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

import React from 'react';