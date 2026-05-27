"use client";

import { RefObject, useEffect } from "react";

interface UseInfiniteScrollOptions {
  sentinelRef: RefObject<HTMLDivElement>;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ sentinelRef, hasMore, onLoadMore }: UseInfiniteScrollOptions) => {
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [sentinelRef, hasMore, onLoadMore]);
};
