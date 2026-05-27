import { screen } from "@testing-library/react";

import { FeedSection } from "@/components/dashboard/FeedSection";

import { renderWithProviders } from "../test-utils";

jest.mock("@/services/contentApi", () => ({
  useGetNewsByCategoriesQuery: () => ({
    data: [
      {
        id: "news-1",
        kind: "news",
        title: "Enterprise AI expands",
        description: "desc",
        imageUrl: "https://example.com/a.jpg",
        category: "technology",
        source: "Wire",
        url: "#",
        publishedAt: new Date().toISOString(),
        ctaLabel: "Read",
        trendingScore: 80,
      },
    ],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
  useGetTrendingMoviesQuery: () => ({
    data: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
  useGetMovieRecommendationsQuery: () => ({
    data: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
  useGetSocialPostsQuery: () => ({
    data: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

describe("FeedSection", () => {
  it("renders fetched feed items", async () => {
    renderWithProviders(<FeedSection />);
    expect(await screen.findByTestId("content-card-news-1")).toBeInTheDocument();
  });
});
