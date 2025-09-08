// src/components/ui/Toggle.tsx

import React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    className, 
    pressed = false, 
    onPressedChange, 
    variant = "default",
    size = "md",
    children,
    onClick,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onPressedChange?.(!pressed);
      onClick?.(e);
    };

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    };

    const variantClasses = {
      default: pressed 
        ? "bg-cyan-400 text-black" 
        : "bg-gray-900 text-gray-400 hover:text-white",
      outline: pressed
        ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
        : "border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400",
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        className={cn(
          "inline-flex items-center justify-center rounded transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black",
          sizeClasses[size],
          variantClasses[variant],
          variant === "outline" && "border",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
