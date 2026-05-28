"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { selectOrderedContent } from "@/features/content/contentSlice";

export const FavoritesPanel = () => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const allItems = useAppSelector(selectOrderedContent);

  const favorites = allItems.filter((i) => favoriteIds.includes(i.id));

  if (!favorites || favorites.length === 0) {
    return (
      <section className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="text-lg font-semibold">Favorites</h3>
        <div className="mt-4">
          <EmptyState title="No favorites yet" description="Mark items as favorites to manage them here." />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold">Favorites</h3>
      <div className="mt-4 space-y-3">
        {favorites.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background p-3">
            <div>
              <p className="text-sm font-medium text-foreground/95">{item.title}</p>
              <p className="text-xs text-foreground/60 truncate">{item.source}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => dispatch(toggleFavorite(item.id))}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
