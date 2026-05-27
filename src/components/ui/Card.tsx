import { HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

type CardVariant = "default" | "glass";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-3 transition-transform duration-200",
          "border border-border/60 bg-surface card-gradient",
          "shadow-premium",
          variant === "glass" ? "glass-strong" : "",
          interactive && "hover:-translate-y-1 hover:shadow-glow",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";