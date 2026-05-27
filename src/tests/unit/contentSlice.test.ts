import contentReducer, {
  incrementVisibleCount,
  moveContentCard,
  setSearchTerm,
  upsertFeed,
} from "@/features/content/contentSlice";
import { ContentItem } from "@/types/content";

const items: ContentItem[] = [
  {
    id: "a",
    kind: "news",
    title: "A",
    description: "A",
    imageUrl: "https://example.com/a.jpg",
    category: "technology",
    source: "source",
    url: "#",
    publishedAt: new Date().toISOString(),
    ctaLabel: "Read",
    trendingScore: 4,
  },
  {
    id: "b",
    kind: "movie",
    title: "B",
    description: "B",
    imageUrl: "https://example.com/b.jpg",
    category: "movies",
    source: "source",
    url: "#",
    publishedAt: new Date().toISOString(),
    ctaLabel: "Watch",
    trendingScore: 3,
  },
];

describe("contentSlice", () => {
  it("upserts feed items", () => {
    const state = contentReducer(undefined, upsertFeed(items));
    expect(state.orderedIds).toEqual(["a", "b"]);
  });

  it("moves cards", () => {
    const seeded = contentReducer(undefined, upsertFeed(items));
    const moved = contentReducer(seeded, moveContentCard({ dragId: "a", hoverId: "b" }));
    expect(moved.orderedIds).toEqual(["b", "a"]);
  });

  it("updates search and visible count", () => {
    const searched = contentReducer(undefined, setSearchTerm("ai"));
    expect(searched.searchTerm).toBe("ai");

    const paged = contentReducer(searched, incrementVisibleCount());
    expect(paged.visibleCount).toBe(18);
  });
});
