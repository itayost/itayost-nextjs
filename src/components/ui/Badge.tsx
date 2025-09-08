// src/components/ui/Badge.tsx

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20",
        secondary: "bg-gray-900 text-gray-300 border border-gray-700",
        success: "bg-green-500/10 text-green-500 border border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
        error: "bg-red-500/10 text-red-500 border border-red-500/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export default function Badge({
  className,
  variant,
  size,
  animation,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, animation }), className)}
      {...props}
    />
  );
}

