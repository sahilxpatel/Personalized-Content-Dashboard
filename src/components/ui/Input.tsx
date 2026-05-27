"use client";

import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "focus-ring w-full rounded-xl border border-border bg-surface/95 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/50",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";