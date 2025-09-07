// src/components/ui/Dropdown.tsx
'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  position?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  variant?: 'default' | 'glass' | 'gradient';
  className?: string;
}

export default function Dropdown({
  trigger,
  items,
  position = 'bottom',
  align = 'start',
  variant = 'default',
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positions = {
    bottom: 'top-full mt-2',
    top: 'bottom-full mb-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignments = {
    start: position === 'bottom' || position === 'top' ? 'left-0' : 'top-0',
    center: position === 'bottom' || position === 'top' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
    end: position === 'bottom' || position === 'top' ? 'right-0' : 'bottom-0',
  };

  const variants = {
    default: 'bg-neutral-900 border border-neutral-800',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
    gradient: 'bg-gradient-to-br from-neutral-900 to-neutral-800 border border-transparent before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-accent-purple before:via-accent-pink before:to-primary-500 before:-z-10',
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'bottom' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'bottom' ? -10 : 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-50 min-w-[200px] rounded-xl shadow-2xl py-2',
              positions[position],
              alignments[align],
              variants[variant]
            )}
          >
            {items.map((item) => (
              <div key={item.id}>
                {item.divider ? (
                  <div className="my-2 h-px bg-white/10" />
                ) : (
                  <button
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setIsOpen(false);
                      }
                    }}
                    disabled={item.disabled}
                    className={cn(
                      'w-full px-4 py-2 flex items-center gap-3 text-left transition-colors',
                      'hover:bg-white/10 text-white/80 hover:text-white',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Tooltip Component
interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  variant?: 'default' | 'glass' | 'gradient';
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 0,
  variant = 'default',
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positions = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white/10',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white/10',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white/10',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white/10',
  };

  const variants = {
    default: 'bg-neutral-900 border border-neutral-800',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
    gradient: 'bg-gradient-to-br from-accent-purple to-accent-pink',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-3 py-2 rounded-lg text-sm text-white whitespace-nowrap pointer-events-none',
              positions[position],
              variants[variant],
              className
            )}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-transparent',
                arrows[position]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}