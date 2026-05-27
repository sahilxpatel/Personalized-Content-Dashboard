import { ContentItem } from "@/types/content";

interface AnalyticsWidgetsProps {
  items: ContentItem[];
}

export const AnalyticsWidgets = ({ items }: AnalyticsWidgetsProps) => {
  const newsCount = items.filter((item) => item.kind === "news").length;
  const movieCount = items.filter((item) => item.kind === "movie").length;
  const socialCount = items.filter((item) => item.kind === "social").length;

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground/50">News articles</p>
        <p className="mt-2 text-2xl font-semibold">{newsCount}</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground/50">Movie picks</p>
        <p className="mt-2 text-2xl font-semibold">{movieCount}</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground/50">Social insights</p>
        <p className="mt-2 text-2xl font-semibold">{socialCount}</p>
      </div>
    </section>
  );
};
