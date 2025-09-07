// components/ui/Input.tsx
'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const inputVariants = cva(
  'w-full transition-all duration-300 ease-out font-medium placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-white border-2 border-slate-200 focus:border-emerald-400 focus:shadow-soft-sm',
        glass: 'bg-white/80 backdrop-blur-xl border border-white/30 focus:border-emerald-400/50 focus:bg-white/90',
        soft: 'bg-slate-50 border-2 border-transparent focus:bg-white focus:border-emerald-400 focus:shadow-soft-sm',
        underline: 'bg-transparent border-b-2 border-slate-200 rounded-none px-0 focus:border-emerald-400',
        filled: 'bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-transparent focus:from-white focus:to-white focus:border-emerald-400',
      },
      size: {
        sm: 'text-sm px-3 py-2 rounded-xl',
        md: 'text-base px-4 py-3 rounded-2xl',
        lg: 'text-lg px-5 py-4 rounded-3xl',
      },
      state: {
        default: '',
        error: 'border-red-400 focus:border-red-500 focus:shadow-red-100',
        success: 'border-green-400 focus:border-green-500 focus:shadow-green-100',
        warning: 'border-amber-400 focus:border-amber-500 focus:shadow-amber-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  warning?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state: stateProp,
      label,
      error,
      success,
      warning,
      hint,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    // Determine state based on error/success/warning props
    const state = error ? 'error' : success ? 'success' : warning ? 'warning' : stateProp;
    const message = error || success || warning || hint;
    
    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password')
      : type;

    return (
      <div className="w-full">
        {label && (
          <label className={cn(
            'block text-sm font-medium mb-2 transition-colors',
            isFocused ? 'text-emerald-600' : 'text-slate-700',
            disabled && 'opacity-50'
          )}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              inputVariants({ variant, size, state }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              showPasswordToggle && type === 'password' && 'pr-10',
              'outline-none focus:outline-none focus:ring-0',
              className
            )}
            onFocus={() => { setIsFocused(true); }}
            onBlur={() => { setIsFocused(false); }}
            {...props}
          />
          
          {/* Password toggle button */}
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => { setShowPassword(!showPassword); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          
          {/* Right icon or state icon */}
          {!showPasswordToggle && (rightIcon || state !== 'default') && (
            <div className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              state === 'error' && 'text-red-500',
              state === 'success' && 'text-green-500',
              state === 'warning' && 'text-amber-500',
              !state && 'text-slate-400'
            )}>
              {rightIcon || (
                <>
                  {state === 'error' && <AlertCircle className="w-5 h-5" />}
                  {state === 'success' && <CheckCircle className="w-5 h-5" />}
                  {state === 'warning' && <AlertCircle className="w-5 h-5" />}
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Message */}
        {message && (
          <p className={cn(
            'text-sm mt-2',
            error && 'text-red-500',
            success && 'text-green-500',
            warning && 'text-amber-500',
            !error && !success && !warning && 'text-slate-500'
          )}>
            {message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component using similar styling
const Textarea = forwardRef<
  HTMLTextAreaElement,
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & 
  Omit<InputProps, 'type' | 'showPasswordToggle'>
>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      state: stateProp,
      label,
      error,
      success,
      warning,
      hint,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const state = error ? 'error' : success ? 'success' : warning ? 'warning' : stateProp;
    const message = error || success || warning || hint;

    return (
      <div className="w-full">
        {label && (
          <label className={cn(
            'block text-sm font-medium mb-2 transition-colors',
            isFocused ? 'text-emerald-600' : 'text-slate-700',
            disabled && 'opacity-50'
          )}>
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            inputVariants({ variant, size, state }),
            'min-h-[100px] resize-y',
            'outline-none focus:outline-none focus:ring-0',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {message && (
          <p className={cn(
            'text-sm mt-2',
            error && 'text-red-500',
            success && 'text-green-500',
            warning && 'text-amber-500',
            !error && !success && !warning && 'text-slate-500'
          )}>
            {message}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;
export { Input, Textarea, inputVariants };
export type { InputProps };