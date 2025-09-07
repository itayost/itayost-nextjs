// components/ui/Card.tsx
'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'relative overflow-hidden transition-all duration-500 ease-out',
  {
    variants: {
      variant: {
        organic: 'bg-white rounded-3xl p-8 border border-white/50 shadow-soft-lg hover:shadow-soft-xl',
        glass: 'rounded-3xl p-6 backdrop-blur-xl bg-white/80 border border-white/30 shadow-soft-md',
        soft: 'bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-soft-sm hover:shadow-soft-md',
        bordered: 'bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-emerald-200',
        elevated: 'bg-white rounded-3xl p-6 shadow-soft-xl hover:shadow-soft-2xl hover:-translate-y-1',
        colored: 'rounded-3xl p-6 shadow-soft-lg',
        code: 'bg-slate-800 text-slate-200 rounded-2xl p-6 font-mono text-sm shadow-soft-xl',
      },
      color: {
        default: '',
        emerald: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200',
        lavender: 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200',
        coral: 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200',
        amber: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
        sky: 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-2',
        glow: 'hover:shadow-glow-emerald',
        scale: 'hover:scale-105',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'organic',
      color: 'default',
      hover: 'none',
      padding: 'md',
    },
  }
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  gradient?: boolean;
  blob?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, color, hover, padding, gradient, blob, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, color, hover, padding }),
          variant === 'organic' && 'group',
          className
        )}
        {...props}
      >
        {/* Gradient overlay for organic variant */}
        {variant === 'organic' && gradient && (
          <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-emerald-500/5 to-lavender-500/5" />
        )}
        
        {/* Blob decoration */}
        {blob && (
          <div className="absolute -top-10 -right-10 w-40 h-40 blob-gradient blob-shape opacity-30" />
        )}
        
        {/* Code card window controls */}
        {variant === 'code' && (
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        )}
        
        <div className={cn(variant === 'code' && 'pt-8', 'relative z-10')}>
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

// Sub-components
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold text-slate-900', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-slate-600 mt-2 leading-relaxed', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-6 pt-6 border-t border-slate-100', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
export type { CardProps };