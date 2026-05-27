import { AuthMockCard } from "@/components/dashboard/AuthMockCard";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-premium backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.22em] text-foreground/50">Dashboard settings</p>
          <h1 className="text-2xl font-semibold tracking-tight">Personalize your experience</h1>
          <p className="max-w-2xl text-sm text-foreground/65">
            Control categories, language, theme, and mock account behavior from one place.
          </p>
        </div>
        <Button asChild variant="secondary" size="md">
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <SettingsPanel />
        <AuthMockCard />
      </div>
    </div>
  );
}
