import { filterContentItems } from "@/utils/content";
import { ContentItem } from "@/types/content";

const items: ContentItem[] = [
  {
    id: "1",
    kind: "news",
    title: "AI in enterprise",
    description: "News",
    imageUrl: "https://example.com/1.jpg",
    category: "technology",
    source: "Desk",
    url: "#",
    publishedAt: new Date().toISOString(),
    ctaLabel: "Read",
    trendingScore: 90,
  },
  {
    id: "2",
    kind: "social",
    title: "Sports momentum",
    description: "Community",
    imageUrl: "https://example.com/2.jpg",
    category: "sports",
    source: "Loop",
    url: "#",
    publishedAt: new Date().toISOString(),
    ctaLabel: "Open",
    trendingScore: 60,
  },
];

describe("search utils", () => {
  it("filters items by query", () => {
    const filtered = filterContentItems(items, "enterprise");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("1");
  });

  it("returns all items for empty query", () => {
    const filtered = filterContentItems(items, "");
    expect(filtered).toHaveLength(2);
  });
});
