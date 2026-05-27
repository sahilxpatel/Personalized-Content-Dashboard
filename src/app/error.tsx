"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      description={error.message || "An unexpected error occurred."}
      onRetry={reset}
      title="App error"
    />
  );
}
