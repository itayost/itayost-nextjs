// src/components/ui/Toggle.tsx
'use client';

import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'neon';
  label?: string;
  labelPosition?: 'left' | 'right';
  className?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({
    checked = false,
    onChange,
    disabled = false,
    size = 'md',
    variant = 'default',
    label,
    labelPosition = 'right',
    className,
  }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
      if (!disabled) {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
      }
    };

    const sizes = {
      sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
      md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
      lg: { track: 'w-16 h-8', thumb: 'w-7 h-7', translate: 'translate-x-8' },
    };

    const variants = {
      default: {
        track: isChecked ? 'bg-primary-500' : 'bg-neutral-700',
        thumb: 'bg-white',
      },
      gradient: {
        track: isChecked
          ? 'bg-gradient-to-r from-accent-purple to-accent-pink'
          : 'bg-neutral-700',
        thumb: 'bg-white',
      },
      neon: {
        track: isChecked ? 'bg-accent-pink shadow-neon-pink' : 'bg-neutral-700',
        thumb: isChecked ? 'bg-white shadow-neon-white' : 'bg-white',
      },
    };

    const currentSize = sizes[size];
    const currentVariant = variants[variant];

    return (
      <div className={cn('flex items-center gap-3', className)}>
        {label && labelPosition === 'left' && (
          <span className="text-white/80 select-none">{label}</span>
        )}
        
        <button
          ref={ref}
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            'relative rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            currentSize.track,
            currentVariant.track,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <motion.span
            className={cn(
              'absolute top-0.5 left-0.5 rounded-full transition-colors',
              currentSize.thumb,
              currentVariant.thumb
            )}
            animate={{
              x: isChecked ? currentSize.translate.replace('translate-x-', '') : '0',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>

        {label && labelPosition === 'right' && (
          <span className="text-white/80 select-none">{label}</span>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// Alert Component
interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = 'default',
  title,
  description,
  icon,
  closable = false,
  onClose,
  action,
  className,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const variants = {
    default: 'bg-neutral-800 border-neutral-700 text-white',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  const iconColors = {
    default: 'text-white',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'relative flex gap-3 p-4 rounded-xl border',
        variants[variant],
        className
      )}
    >
      {icon && (
        <div className={cn('flex-shrink-0', iconColors[variant])}>
          {icon}
        </div>
      )}

      <div className="flex-1">
        {title && (
          <h4 className="font-semibold mb-1">{title}</h4>
        )}
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
        {action && (
          <div className="mt-3">{action}</div>
        )}
      </div>

      {closable && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

// Toast Component
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import React from 'react';

interface ToastProps {
  id?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  variant = 'default',
  title,
  description,
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    default: {
      bg: 'bg-neutral-900',
      border: 'border-neutral-800',
      icon: <Info className="w-5 h-5 text-white" />,
    },
    success: {
      bg: 'bg-neutral-900',
      border: 'border-green-500/30',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    },
    warning: {
      bg: 'bg-neutral-900',
      border: 'border-yellow-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    },
    error: {
      bg: 'bg-neutral-900',
      border: 'border-red-500/30',
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
    },
    info: {
      bg: 'bg-neutral-900',
      border: 'border-blue-500/30',
      icon: <Info className="w-5 h-5 text-blue-400" />,
    },
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-sm min-w-[300px] max-w-md',
        currentVariant.bg,
        currentVariant.border
      )}
    >
      <div className="flex-shrink-0">
        {currentVariant.icon}
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-white">{title}</h4>
        {description && (
          <p className="text-sm text-white/60 mt-1">{description}</p>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      )}
    </motion.div>
  );
}

import { useEffect } from 'react';