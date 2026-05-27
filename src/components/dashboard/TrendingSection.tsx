import { Flame } from "lucide-react";

import { ContentItem } from "@/types/content";
import { sortByTrendingScore } from "@/utils/content";

interface TrendingSectionProps {
  items: ContentItem[];
}

export const TrendingSection = ({ items }: TrendingSectionProps) => {
  const sorted = sortByTrendingScore(items).slice(0, 5);

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center gap-2">
        <Flame size={18} className="text-accent" />
        <h2 className="text-lg font-semibold">Trending Now</h2>
      </div>
      <ul className="space-y-3">
        {sorted.map((item) => (
          <li key={item.id} className="rounded-lg border border-border bg-background p-3">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-foreground/60">{item.source}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
