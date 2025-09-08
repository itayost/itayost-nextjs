// src/components/ui/Loader.tsx

import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "bars";
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", variant = "spinner", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };

    if (variant === "dots") {
      return (
        <div ref={ref} className={cn("flex gap-1", className)} {...props}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "bg-cyan-400 rounded-full animate-pulse",
                size === "sm" && "w-1 h-1",
                size === "md" && "w-2 h-2",
                size === "lg" && "w-3 h-3"
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      );
    }

    if (variant === "bars") {
      return (
        <div ref={ref} className={cn("flex gap-1", className)} {...props}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "bg-cyan-400 animate-pulse",
                size === "sm" && "w-0.5 h-3",
                size === "md" && "w-1 h-6",
                size === "lg" && "w-1.5 h-9"
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      );
    }

    // Default spinner
    return (
      <div
        ref={ref}
        className={cn(
          "border-2 border-gray-700 border-t-cyan-400 rounded-full animate-spin",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Loader.displayName = "Loader";

export default Loader;