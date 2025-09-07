// components/ui/Button.tsx
'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-soft-md hover:shadow-soft-lg hover:scale-105',
        secondary: 'bg-gradient-to-r from-accent-lavender to-accent-sky text-white shadow-soft-md hover:shadow-soft-lg hover:scale-105',
        soft: 'bg-white text-slate-700 border border-slate-200 shadow-soft-sm hover:shadow-soft-md hover:border-emerald-200 hover:text-emerald-600',
        ghost: 'bg-transparent text-slate-600 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900',
        danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-soft-md hover:shadow-soft-lg hover:scale-105',
        success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-soft-md hover:shadow-soft-lg hover:scale-105',
        warning: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-soft-md hover:shadow-soft-lg hover:scale-105',
        link: 'text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700',
      },
      size: {
        sm: 'text-sm px-4 py-2 rounded-2xl',
        md: 'text-base px-6 py-3 rounded-3xl',
        lg: 'text-lg px-8 py-4 rounded-full',
        xl: 'text-xl px-10 py-5 rounded-full',
        icon: 'h-10 w-10 rounded-full p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shimmer?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      shimmer = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {shimmer && (
          <div className="absolute inset-0 rounded-inherit overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        )}
        
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        
        {children}
        
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export { buttonVariants };
export type { ButtonProps };