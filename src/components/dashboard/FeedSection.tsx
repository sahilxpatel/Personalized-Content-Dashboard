"use client";

import { useEffect, useMemo, useRef } from "react";

import {
  incrementVisibleCount,
  resetVisibleCount,
  selectOrderedContent,
  selectVisibleFeed,
  upsertFeed,
} from "@/features/content/contentSlice";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRealtimeSocialUpdates } from "@/hooks/useRealtimeSocialUpdates";
import {
  useGetMovieRecommendationsQuery,
  useGetNewsByCategoriesQuery,
  useGetSocialPostsQuery,
  useGetTrendingMoviesQuery,
} from "@/services/contentApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { DraggableContentCard } from "../cards/DraggableContentCard";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import { SkeletonCard } from "../ui/SkeletonCard";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const AnalyticsWidgets = dynamic(() => import("./AnalyticsWidgets").then((m) => m.AnalyticsWidgets), {
  ssr: false,
});

const TrendingSection = dynamic(() => import("./TrendingSection").then((m) => m.TrendingSection), {
  ssr: false,
});

interface FeedSectionProps {
  mode?: "all" | "favorites" | "trending";
}

export const FeedSection = ({ mode = "all" }: FeedSectionProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.preferences.categories);
  const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const allItems = useAppSelector(selectOrderedContent);
  const visibleFeed = useAppSelector(selectVisibleFeed);
  const searchTerm = useAppSelector((state) => state.content.searchTerm);
  const visibleCount = useAppSelector((state) => state.content.visibleCount);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastSignatureRef = useRef("");

  const newsQuery = useGetNewsByCategoriesQuery(categories);
  const trendingMoviesQuery = useGetTrendingMoviesQuery();
  const recommendationsQuery = useGetMovieRecommendationsQuery(550);
  const socialQuery = useGetSocialPostsQuery();

  useRealtimeSocialUpdates();

  useEffect(() => {
    const aggregated = [
      ...(newsQuery.data ?? []),
      ...(trendingMoviesQuery.data ?? []),
      ...(recommendationsQuery.data ?? []),
      ...(socialQuery.data ?? []),
    ];

    const signature = aggregated.map((item) => item.id).join("|");

    if (aggregated.length > 0 && signature !== lastSignatureRef.current) {
      lastSignatureRef.current = signature;
      dispatch(upsertFeed(aggregated));
    }
  }, [dispatch, newsQuery.data, trendingMoviesQuery.data, recommendationsQuery.data, socialQuery.data]);

  useEffect(() => {
    dispatch(resetVisibleCount());
  }, [dispatch, searchTerm]);

  const filteredFeed = useMemo(() => {
    if (mode === "favorites") {
      return visibleFeed.filter((item) => favoriteIds.includes(item.id));
    }

    if (mode === "trending") {
      return [...visibleFeed].sort((a, b) => b.trendingScore - a.trendingScore);
    }

    return visibleFeed;
  }, [visibleFeed, mode, favoriteIds]);

  const isLoading =
    newsQuery.isLoading ||
    trendingMoviesQuery.isLoading ||
    recommendationsQuery.isLoading ||
    socialQuery.isLoading;

  const hasAnyError =
    newsQuery.isError ||
    trendingMoviesQuery.isError ||
    recommendationsQuery.isError ||
    socialQuery.isError;

  const hasMore = allItems.length > visibleCount;

  useInfiniteScroll({
    sentinelRef,
    hasMore,
    onLoadMore: () => dispatch(incrementVisibleCount()),
  });

  const retryAll = () => {
    newsQuery.refetch();
    trendingMoviesQuery.refetch();
    recommendationsQuery.refetch();
    socialQuery.refetch();
  };

  if (hasAnyError && allItems.length === 0) {
    return <ErrorState description="Feed failed to load." onRetry={retryAll} />;
  }

  return (
    <section className="space-y-6">
      <Suspense fallback={<div />}> 
        <AnalyticsWidgets items={allItems} />
      </Suspense>
      <Suspense fallback={<div />}> 
        <TrendingSection items={allItems} />
      </Suspense>
      {isLoading && allItems.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : null}
      {!isLoading && filteredFeed.length === 0 ? (
        <EmptyState
          title="No content yet"
          description="Try changing your search or category preferences."
        />
      ) : null}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" data-testid="feed-grid">
        {filteredFeed.map((item) => (
          <DraggableContentCard item={item} key={item.id} />
        ))}
      </div>
      <div ref={sentinelRef} className="h-2" />
    </section>
  );
};
