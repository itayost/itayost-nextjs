// src/components/ui/Navigation.tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

// Breadcrumb Component
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  variant?: 'default' | 'slash' | 'arrow' | 'dots';
  className?: string;
}

export function Breadcrumb({
  items,
  separator,
  variant = 'default',
  className,
}: BreadcrumbProps) {
  const separators = {
    default: <ChevronRight className="w-4 h-4 text-white/30" />,
    slash: <span className="text-white/30">/</span>,
    arrow: <span className="text-white/30">→</span>,
    dots: <span className="text-white/30">•</span>,
  };

  const currentSeparator = separator || separators[variant];

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && currentSeparator}
            
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span
                className={cn(
                  'flex items-center gap-2',
                  isLast ? 'text-white font-medium' : 'text-white/60'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirst?: boolean;
  showLast?: boolean;
  siblingCount?: number;
  variant?: 'default' | 'rounded' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirst = true,
  showLast = true,
  siblingCount = 1,
  variant = 'default',
  size = 'md',
  className,
}: PaginationProps) {
  const sizes = {
    sm: 'h-8 min-w-[32px] text-sm',
    md: 'h-10 min-w-[40px] text-base',
    lg: 'h-12 min-w-[48px] text-lg',
  };

  const variants = {
    default: {
      button: 'rounded-lg',
      active: 'bg-gradient-to-r from-accent-purple to-accent-pink text-white',
      inactive: 'bg-neutral-800 text-white/60 hover:bg-neutral-700 hover:text-white',
    },
    rounded: {
      button: 'rounded-full',
      active: 'bg-primary-500 text-white shadow-lg',
      inactive: 'bg-transparent text-white/60 hover:bg-white/10 hover:text-white',
    },
    minimal: {
      button: 'rounded-lg',
      active: 'text-white font-bold',
      inactive: 'text-white/40 hover:text-white',
    },
  };

  const currentVariant = variants[variant];

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    // Add first page and ellipsis
    if (leftSibling > 2) {
      pages.push(1);
      if (leftSibling > 3) pages.push('...');
    } else if (leftSibling === 2) {
      pages.push(1);
    }

    // Add sibling pages
    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page
    if (rightSibling < totalPages - 1) {
      if (rightSibling < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    } else if (rightSibling === totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={cn('flex items-center gap-2', className)}>
      {/* First & Previous */}
      {showFirst && (
        <button
          onClick={() => { onPageChange(1); }}
          disabled={currentPage === 1}
          className={cn(
            'px-3 transition-all',
            sizes[size],
            currentVariant.button,
            currentVariant.inactive,
            currentPage === 1 && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <ChevronLeft className="w-4 h-4 -ml-2" />
        </button>
      )}
      
      <button
        onClick={() => { onPageChange(Math.max(1, currentPage - 1)); }}
        disabled={currentPage === 1}
        className={cn(
          'px-3 transition-all',
          sizes[size],
          currentVariant.button,
          currentVariant.inactive,
          currentPage === 1 && 'opacity-30 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-white/30">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <motion.button
            key={pageNumber}
            onClick={() => { onPageChange(pageNumber); }}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'font-medium transition-all',
              sizes[size],
              currentVariant.button,
              isActive ? currentVariant.active : currentVariant.inactive
            )}
          >
            {pageNumber}
          </motion.button>
        );
      })}

      {/* Next & Last */}
      <button
        onClick={() => { onPageChange(Math.min(totalPages, currentPage + 1)); }}
        disabled={currentPage === totalPages}
        className={cn(
          'px-3 transition-all',
          sizes[size],
          currentVariant.button,
          currentVariant.inactive,
          currentPage === totalPages && 'opacity-30 cursor-not-allowed'
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {showLast && (
        <button
          onClick={() => { onPageChange(totalPages); }}
          disabled={currentPage === totalPages}
          className={cn(
            'px-3 transition-all',
            sizes[size],
            currentVariant.button,
            currentVariant.inactive,
            currentPage === totalPages && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronRight className="w-4 h-4" />
          <ChevronRight className="w-4 h-4 -ml-2" />
        </button>
      )}
    </nav>
  );
}

// Divider Component
interface DividerProps {
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient' | 'glow';
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  icon?: ReactNode;
  className?: string;
}

export function Divider({
  variant = 'solid',
  orientation = 'horizontal',
  thickness = 'thin',
  spacing = 'md',
  label,
  icon,
  className,
}: DividerProps) {
  const thicknesses = {
    thin: orientation === 'horizontal' ? 'h-px' : 'w-px',
    medium: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
    thick: orientation === 'horizontal' ? 'h-1' : 'w-1',
  };

  const spacings = {
    none: '',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
  };

  const variants = {
    solid: 'bg-white/10',
    dashed: 'border-white/10 border-dashed',
    dotted: 'border-white/10 border-dotted',
    gradient: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
    glow: 'bg-white/10 shadow-glow',
  };

  if (label || icon) {
    return (
      <div
        className={cn(
          'flex items-center',
          spacings[spacing],
          orientation === 'vertical' && 'flex-col',
          className
        )}
      >
        <div
          className={cn(
            'flex-1',
            thicknesses[thickness],
            variants[variant],
            variant === 'dashed' || variant === 'dotted' ? `border-t ${orientation === 'vertical' && 'border-l border-t-0'}` : ''
          )}
        />
        {(label || icon) && (
          <div className="px-4 flex items-center gap-2 text-white/50 text-sm">
            {icon}
            {label && <span>{label}</span>}
          </div>
        )}
        <div
          className={cn(
            'flex-1',
            thicknesses[thickness],
            variants[variant],
            variant === 'dashed' || variant === 'dotted' ? `border-t ${orientation === 'vertical' && 'border-l border-t-0'}` : ''
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        thicknesses[thickness],
        spacings[spacing],
        variants[variant],
        variant === 'dashed' || variant === 'dotted' 
          ? `border-t ${orientation === 'vertical' && 'border-l border-t-0 h-full'}` 
          : orientation === 'vertical' && 'h-full',
        className
      )}
    />
  );
}

// Stepper Component
interface StepperItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface StepperProps {
  steps: StepperItem[];
  currentStep: number;
  variant?: 'default' | 'dots' | 'numbers';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  variant = 'default',
  orientation = 'horizontal',
  className,
}: StepperProps) {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center',
              orientation === 'vertical' ? 'flex-row mb-8' : 'flex-1'
            )}
          >
            {/* Step Indicator */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                className={cn(
                  'flex items-center justify-center rounded-full transition-all',
                  variant === 'dots' ? 'w-3 h-3' : 'w-10 h-10',
                  isCompleted
                    ? 'bg-gradient-to-r from-accent-purple to-accent-pink'
                    : isActive
                    ? 'bg-primary-500 shadow-lg shadow-primary-500/30'
                    : 'bg-neutral-800 border-2 border-neutral-700'
                )}
              >
                {variant === 'numbers' && (
                  <span className="text-sm font-bold text-white">
                    {isCompleted ? '✓' : index + 1}
                  </span>
                )}
                {variant === 'default' && step.icon && (
                  <span className="text-white">{step.icon}</span>
                )}
              </motion.div>
              
              {/* Label */}
              {variant !== 'dots' && (
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isActive ? 'text-white' : 'text-white/60'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-white/40 mt-1">{step.description}</p>
                  )}
                </div>
              )}
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className={cn(
                  'flex-1 mx-4',
                  orientation === 'vertical' ? 'w-px h-16 ml-5' : 'h-px',
                  isCompleted ? 'bg-primary-500' : 'bg-neutral-800'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}