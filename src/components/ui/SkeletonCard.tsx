interface SkeletonCardProps {
  compact?: boolean;
}

export const SkeletonCard = ({ compact = false }: SkeletonCardProps) => {
  return (
    <div className="glass-strong rounded-xl p-3 shadow-premium" aria-hidden="true">
      <div className="h-36 w-full rounded-lg bg-gradient-to-r from-muted via-slate-200 to-muted bg-[length:220%_100%] animate-shimmer dark:via-slate-700" />
      <div className="mt-3 h-3 w-2/3 rounded bg-muted" />
      <div className="mt-2 h-2 w-full rounded bg-muted/90" />
      <div className="mt-2 h-2 rounded bg-muted/90" style={{ width: compact ? "58%" : "76%" }} />
      {!compact ? <div className="mt-3 h-8 w-full rounded-lg bg-muted" /> : null}
    </div>
  );
};
