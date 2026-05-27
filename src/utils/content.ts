import { ContentItem } from "@/types/content";

export const buildSearchIndex = (items: ContentItem[]) => {
  return items.map((item) => ({
    id: item.id,
    searchable: `${item.title} ${item.description} ${item.category} ${item.source}`.toLowerCase(),
  }));
};

export const filterContentItems = (items: ContentItem[], query: string) => {
  if (!query.trim()) {
    return items;
  }

  const normalized = query.trim().toLowerCase();
  const indexed = buildSearchIndex(items);
  const allowed = new Set(
    indexed.filter((entry) => entry.searchable.includes(normalized)).map((entry) => entry.id),
  );

  return items.filter((item) => allowed.has(item.id));
};

export const sortByTrendingScore = (items: ContentItem[]) => {
  return [...items].sort((a, b) => b.trendingScore - a.trendingScore);
};
