// components/ui/Badge.tsx
'use client';

import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-700 border border-slate-200',
        primary: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        secondary: 'bg-lavender-100 text-purple-700 border border-purple-200',
        success: 'bg-green-100 text-green-700 border border-green-200',
        warning: 'bg-amber-100 text-amber-700 border border-amber-200',
        danger: 'bg-red-100 text-red-700 border border-red-200',
        info: 'bg-sky-100 text-sky-700 border border-sky-200',
        glass: 'glass-soft text-slate-700',
        gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0',
      },
      size: {
        xs: 'text-xs px-2 py-0.5 rounded-lg',
        sm: 'text-sm px-2.5 py-1 rounded-xl',
        md: 'text-sm px-3 py-1.5 rounded-2xl',
        lg: 'text-base px-4 py-2 rounded-3xl',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse-soft',
        bounce: 'animate-bounce',
        ping: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      animation: 'none',
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
  count?: number;
}

export default function Badge({
  className,
  variant,
  size,
  animation,
  leftIcon,
  rightIcon,
  removable,
  onRemove,
  dot,
  count,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, animation }), className)}
      {...props}
    >
      {/* Ping animation overlay */}
      {animation === 'ping' && (
        <span className="absolute inset-0 rounded-inherit animate-ping opacity-75 bg-current" />
      )}
      
      {/* Dot indicator */}
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full mr-1.5",
          variant === 'gradient' ? 'bg-white' : 'bg-current'
        )} />
      )}
      
      {/* Left icon */}
      {leftIcon && <span className="mr-1">{leftIcon}</span>}
      
      {/* Content */}
      <span className="relative">{children}</span>
      
      {/* Count */}
      {count !== undefined && (
        <span className={cn(
          "ml-1.5 px-1.5 py-0.5 text-xs rounded-full",
          variant === 'gradient' ? 'bg-white/20' : 'bg-current/10'
        )}>
          {count > 99 ? '99+' : count}
        </span>
      )}
      
      {/* Right icon */}
      {rightIcon && <span className="ml-1">{rightIcon}</span>}
      
      {/* Remove button */}
      {removable && (
        <button
          onClick={onRemove}
          className={cn(
            "ml-1 -mr-1 p-0.5 rounded-full transition-colors",
            variant === 'gradient' 
              ? 'hover:bg-white/20' 
              : 'hover:bg-current/10'
          )}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// Badge Group Component
interface BadgeGroupProps extends HTMLAttributes<HTMLDivElement> {
  gap?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
}

export function BadgeGroup({ 
  children, 
  className,
  gap = 'md',
  wrap = true,
  ...props 
}: BadgeGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        wrap && 'flex-wrap',
        gap === 'sm' && 'gap-1',
        gap === 'md' && 'gap-2',
        gap === 'lg' && 'gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Notification Badge (for icons)
interface NotificationBadgeProps {
  count?: number;
  dot?: boolean;
  color?: 'red' | 'green' | 'amber' | 'blue';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  children: React.ReactNode;
}

export function NotificationBadge({
  count,
  dot,
  color = 'red',
  position = 'top-right',
  children,
}: NotificationBadgeProps) {
  const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    blue: 'bg-blue-500',
  };

  const positionClasses = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  return (
    <div className="relative inline-flex">
      {children}
      {(count !== undefined || dot) && (
        <span
          className={cn(
            'absolute flex items-center justify-center',
            positionClasses[position],
            colorClasses[color],
            'text-white text-xs font-bold',
            dot ? 'w-2 h-2 rounded-full' : 'min-w-[20px] h-5 px-1.5 rounded-full',
            'animate-pulse-soft'
          )}
        >
          {!dot && count !== undefined && (count > 99 ? '99+' : count)}
        </span>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
export type { BadgeProps, BadgeGroupProps, NotificationBadgeProps };
