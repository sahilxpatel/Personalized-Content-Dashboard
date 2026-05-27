import { cn } from "@/lib/cn";

interface BadgeProps {
  label: string;
  className?: string;
  compact?: boolean;
}

export const Badge = ({ label, className, compact = false }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-border bg-muted font-semibold capitalize text-foreground/80",
        compact ? "px-2 py-0.5 text-[10px] tracking-wide" : "px-2.5 py-1 text-xs",
        className,
      )}
    >
      {label}
    </span>
  );
};
