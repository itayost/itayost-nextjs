// src/components/ui/Card.tsx

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        organic: "rounded-none border border-cyan-400/20",
        glass: "backdrop-blur-md bg-gray-900/30 border border-cyan-400/10",
        soft: "bg-gray-900/50",
        bordered: "border border-gray-800",
        elevated: "shadow-xl shadow-cyan-400/5",
        colored: "",
        code: "font-mono bg-gray-900 border border-gray-800",
      },
      cardColor: {  // Rename from 'color' to 'cardColor' to avoid conflict
        default: "",
        emerald: "bg-emerald-500/10 border-emerald-500/20",
        lavender: "bg-purple-500/10 border-purple-500/20",
        coral: "bg-red-500/10 border-red-500/20",
        amber: "bg-amber-500/10 border-amber-500/20",
        sky: "bg-sky-500/10 border-sky-500/20",
      },
      hover: {
        none: "",
        lift: "hover:transform hover:-translate-y-1",
        glow: "hover:shadow-lg hover:shadow-cyan-400/20",
        scale: "hover:scale-105",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
    },
    defaultVariants: {
      variant: "organic",
      cardColor: "default",
      hover: "none",
      padding: "md",
    },
  }
);

// Rename the color prop in the interface
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof cardVariants>, 'cardColor'> {
  gradient?: boolean;
  blob?: boolean;
  cardColor?: "default" | "emerald" | "lavender" | "coral" | "amber" | "sky";  // Explicitly define the type
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, cardColor = "default", hover, padding, gradient, blob, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, cardColor, hover, padding }),
          gradient && "bg-gradient-to-br from-gray-900 to-black",
          className
        )}
        {...props}
      >
        {blob && (
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

