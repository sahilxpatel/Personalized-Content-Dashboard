import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  description = "We could not load this section.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div
      className="rounded-2xl border border-rose-300/40 bg-rose-100/40 p-6 text-center dark:border-rose-700/40 dark:bg-rose-950/20"
      role="alert"
      aria-live="polite"
    >
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300">
        <AlertTriangle size={18} />
      </div>
      <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-200">{title}</h3>
      <p className="mt-2 text-sm text-rose-800/80 dark:text-rose-300/80">{description}</p>
      {onRetry ? (
        <Button className="mt-4" variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
};
