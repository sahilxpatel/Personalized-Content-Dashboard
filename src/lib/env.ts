export const env = {
  newsApiUrl: process.env.NEXT_PUBLIC_NEWS_API_URL ?? "https://gnews.io/api/v4",
  newsApiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY ?? "",
  tmdbApiUrl: process.env.NEXT_PUBLIC_TMDB_API_URL ?? "https://api.themoviedb.org/3",
  tmdbApiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "",
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Personalized Content Dashboard",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://example.com",
};

export const hasNewsApiKey = Boolean(env.newsApiKey);
export const hasTmdbApiKey = Boolean(env.tmdbApiKey);
