
// components/ui/Loader.tsx
'use client';

import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'orbit';
  color?: 'primary' | 'white' | 'slate';
  className?: string;
}

export function Loader({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  className,
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'text-emerald-500',
    white: 'text-white',
    slate: 'text-slate-500',
  };

  if (variant === 'spinner') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className={cn(
          'absolute inset-0 rounded-full border-2 border-current opacity-25',
          colorClasses[color]
        )} />
        <div className={cn(
          'absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin',
          colorClasses[color]
        )} />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-current animate-pulse',
              colorClasses[color],
              size === 'sm' && 'w-1.5 h-1.5',
              size === 'md' && 'w-2 h-2',
              size === 'lg' && 'w-3 h-3',
              size === 'xl' && 'w-4 h-4'
            )}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className={cn(
          'absolute inset-0 rounded-full bg-current animate-ping',
          colorClasses[color]
        )} />
        <div className={cn(
          'relative rounded-full bg-current',
          colorClasses[color],
          sizeClasses[size]
        )} />
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={cn('flex gap-1', className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'bg-current animate-bounce',
              colorClasses[color],
              size === 'sm' && 'w-1 h-4',
              size === 'md' && 'w-1.5 h-8',
              size === 'lg' && 'w-2 h-12',
              size === 'xl' && 'w-3 h-16'
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'orbit') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className={cn(
          'absolute inset-0 rounded-full border-2 border-current opacity-25',
          colorClasses[color]
        )} />
        <div className={cn(
          'absolute rounded-full bg-current animate-blob-spin',
          colorClasses[color],
          size === 'sm' && 'w-1 h-1',
          size === 'md' && 'w-2 h-2',
          size === 'lg' && 'w-3 h-3',
          size === 'xl' && 'w-4 h-4'
        )} />
      </div>
    );
  }

  return null;
}