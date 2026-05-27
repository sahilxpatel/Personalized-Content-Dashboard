export type ContentKind = "news" | "movie" | "social";

export type NewsCategory = "technology" | "sports" | "finance" | "entertainment";

export interface ContentItem {
  id: string;
  kind: ContentKind;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  source: string;
  url: string;
  publishedAt: string;
  ctaLabel: string;
  trendingScore: number;
}

export interface NewsArticle {
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  image?: string;
  publishedAt: string;
  source: {
    name: string;
    url?: string;
  };
}

export interface NewsResponse {
  totalArticles?: number;
  articles: NewsArticle[];
}

export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
}

export interface TmdbResponse {
  page: number;
  total_pages: number;
  results: TmdbMovie[];
}

export interface SocialPost {
  id: string;
  author: string;
  title: string;
  body: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  likes: number;
}
