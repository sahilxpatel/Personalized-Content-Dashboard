import { normalizeMovies, normalizeNews, normalizeSocial } from "@/services/normalizers";
import { NewsResponse, SocialPost, TmdbResponse } from "@/types/content";

describe("normalizers", () => {
  test("normalizeNews maps articles to ContentItem[]", () => {
    const response: NewsResponse = {
      articles: [
        {
          source: { name: "Test" },
          title: "Breaking news",
          description: "Desc",
          url: "https://example.com",
          publishedAt: new Date().toISOString(),
        },
      ],
    };

    const items = normalizeNews(response, "general");
    expect(items).toHaveLength(1);
    expect(items[0].kind).toBe("news");
    expect(items[0].category).toBe("general");
  });

  test("normalizeMovies maps results to ContentItem[]", () => {
    const response: TmdbResponse = {
      page: 1,
      total_pages: 1,
      results: [
        {
          id: 1,
          title: "Movie",
          overview: "O",
          vote_average: 7.8,
          release_date: "2020-01-01",
        },
      ],
    };
    const items = normalizeMovies(response, "trending");
    expect(items[0].kind).toBe("movie");
    expect(items[0].source).toBe("TMDB");
  });

  test("normalizeSocial maps posts to ContentItem[]", () => {
    const posts: SocialPost[] = [
      {
        id: "s1",
        title: "Post",
        body: "b",
        imageUrl: "https://example.com/image.png",
        tags: ["tech"],
        author: "Alice",
        createdAt: new Date().toISOString(),
        likes: 5,
      },
    ];
    const items = normalizeSocial(posts);
    expect(items[0].kind).toBe("social");
    expect(items[0].trendingScore).toBe(5);
  });
});
