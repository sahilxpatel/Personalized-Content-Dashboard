import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { sleep } from "@/utils/async";

import { MOCK_SOCIAL_POSTS } from "@/constants/mockSocialPosts";
import { hasNewsApiKey, hasTmdbApiKey } from "@/lib/env";
import { ContentItem, NewsCategory, NewsResponse, TmdbResponse } from "@/types/content";

import { newsClient, tmdbClient } from "./axiosClients";
import { normalizeMovies, normalizeNews, normalizeSocial } from "./normalizers";

const mockNews = (category: NewsCategory): ContentItem[] => [
  {
    id: `mock-news-${category}-1`,
    kind: "news",
    title: `Top ${category} headlines this week`,
    description: "A curated round-up while external APIs are unavailable.",
    imageUrl:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
    category,
    source: "Mock Newswire",
    url: "#",
    publishedAt: new Date().toISOString(),
    ctaLabel: "Read article",
    trendingScore: 72,
  },
];

const mapCategoryToTopic = (category: NewsCategory) => {
  if (category === "finance") {
    return "business";
  }

  return category;
};

const mockMovies: ContentItem[] = [
  {
    id: "mock-movie-1",
    kind: "movie",
    title: "The Adaptive Mind",
    description: "A sci-fi thriller about decision-making assistants in modern cities.",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    category: "trending",
    source: "TMDB Mock",
    url: "#",
    publishedAt: new Date().toISOString(),
    ctaLabel: "View details",
    trendingScore: 81,
  },
];

async function retryable<T>(fn: () => Promise<T>, attempts = 3, delayMs = 400): Promise<T> {
  let attempt = 0;
  let lastError: unknown;
  while (attempt < attempts) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      attempt += 1;
      await sleep(delayMs * attempt);
    }
  }
  throw lastError;
}

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["News", "Trending", "Recommendations", "Social"],
  endpoints: (builder) => ({
    getNewsByCategories: builder.query<ContentItem[], NewsCategory[]>({
      queryFn: async (categories) => {
        if (!hasNewsApiKey) {
          return { data: categories.flatMap((category) => mockNews(category)) };
        }

        try {
          const responses = await retryable(async () => {
            return await Promise.all(
              categories.map((category) =>
                newsClient.get<NewsResponse>("/top-headlines", {
                  params: {
                    topic: mapCategoryToTopic(category),
                    lang: "en",
                    max: 10,
                    token: process.env.NEXT_PUBLIC_NEWS_API_KEY,
                  },
                }),
              ),
            );
          }, 3, 500);

          const normalized = responses.flatMap((response, index) => normalizeNews(response.data, categories[index]));
          return { data: normalized };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", data: `News API unavailable: ${String(error)}` } };
        }
      },
      providesTags: (result) => (result ? [{ type: "News", id: "LIST" }] : [{ type: "News", id: "LIST" }]),
    }),
    getTrendingMovies: builder.query<ContentItem[], void>({
      queryFn: async () => {
        if (!hasTmdbApiKey) {
          return { data: mockMovies };
        }

        try {
          const response = await retryable(async () =>
            tmdbClient.get<TmdbResponse>("/trending/movie/week", {
              params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              },
            }),
          );

          return { data: normalizeMovies(response.data, "trending") };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", data: `TMDB API unavailable: ${String(error)}` } };
        }
      },
      providesTags: (result) => (result ? [{ type: "Trending", id: "LIST" }] : [{ type: "Trending", id: "LIST" }]),
    }),
    getMovieRecommendations: builder.query<ContentItem[], number | undefined>({
      queryFn: async (movieId) => {
        if (!movieId || !hasTmdbApiKey) {
          return { data: mockMovies };
        }

        try {
          const response = await tmdbClient.get<TmdbResponse>(`/movie/${movieId}/recommendations`, {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            },
          });

          return { data: normalizeMovies(response.data, "recommended") };
        } catch {
          return { data: mockMovies };
        }
      },
      providesTags: (result, _err, movieId) => (movieId ? [{ type: "Recommendations", id: String(movieId) }] : []),
    }),
    getSocialPosts: builder.query<ContentItem[], void>({
      queryFn: async () => {
        return { data: normalizeSocial(MOCK_SOCIAL_POSTS) };
      },
      providesTags: (result) => (result ? [{ type: "Social", id: "LIST" }] : [{ type: "Social", id: "LIST" }]),
    }),
  }),
  refetchOnReconnect: true,
  refetchOnFocus: false,
  keepUnusedDataFor: 60,
});

export const {
  useGetNewsByCategoriesQuery,
  useGetTrendingMoviesQuery,
  useGetMovieRecommendationsQuery,
  useGetSocialPostsQuery,
} = contentApi;
