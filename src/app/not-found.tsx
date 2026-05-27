import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center py-16">
      <div className="space-y-4">
        <ErrorState
          description="The page you requested does not exist or has moved."
          title="Page not found"
        />
        <Button asChild className="w-full">
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}