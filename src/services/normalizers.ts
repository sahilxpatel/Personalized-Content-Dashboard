import { ContentItem, NewsResponse, SocialPost, TmdbResponse } from "@/types/content";

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

export const normalizeNews = (response: NewsResponse, category: string): ContentItem[] => {
  return response.articles.slice(0, 10).map((article, index) => ({
    id: `news-${category}-${index}-${article.title}`,
    kind: "news",
    title: article.title,
    description: article.description ?? article.content ?? "No description available.",
    imageUrl: article.urlToImage ?? article.image ?? fallbackImage,
    category,
    source: article.source.name,
    url: article.url,
    publishedAt: article.publishedAt,
    ctaLabel: "Read article",
    trendingScore: Math.max(1, 100 - index * 4),
  }));
};

export const normalizeMovies = (response: TmdbResponse, category = "movies"): ContentItem[] => {
  return response.results.slice(0, 10).map((movie, index) => ({
    id: `movie-${movie.id}`,
    kind: "movie",
    title: movie.title,
    description: movie.overview || "No overview available.",
    imageUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : fallbackImage,
    category,
    source: "TMDB",
    url: `https://www.themoviedb.org/movie/${movie.id}`,
    publishedAt: movie.release_date || new Date().toISOString(),
    ctaLabel: "View details",
    trendingScore: Math.round(movie.vote_average * 10) - index,
  }));
};

export const normalizeSocial = (posts: SocialPost[]): ContentItem[] => {
  return posts.map((post) => ({
    id: post.id,
    kind: "social",
    title: post.title,
    description: post.body,
    imageUrl: post.imageUrl,
    category: post.tags[0] ?? "social",
    source: post.author,
    url: "#",
    publishedAt: post.createdAt,
    ctaLabel: "Open thread",
    trendingScore: post.likes,
  }));
};
