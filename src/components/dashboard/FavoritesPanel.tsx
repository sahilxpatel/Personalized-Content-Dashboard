"use client";

import Image from "next/image";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite, clearFavorites } from "@/features/favorites/favoritesSlice";
import { selectOrderedContent } from "@/features/content/contentSlice";
import { useModal } from "@/components/ui/ModalProvider";
import Link from "next/link";

export const FavoritesPanel = () => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const allItems = useAppSelector(selectOrderedContent);
  const { openModal } = useModal();

  const favorites = allItems.filter((i) => favoriteIds.includes(i.id));

  const onClear = () => {
    openModal(
      <div className="space-y-4">
        <p className="text-sm text-foreground/75">Are you sure you want to remove all favorites? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(clearFavorites());
              closeModal();
            }}
          >
            Clear all
          </Button>
        </div>
      </div>,
      "Confirm clear all",
    );
  };

  const onView = (item: any) => {
    openModal(
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Image alt={item.title} className="h-40 w-full object-cover" height={160} src={item.imageUrl} width={320} />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-foreground/60">{item.source}</p>
          <p className="text-base leading-6 text-foreground/80">{item.description}</p>
        </div>
        {item.url ? (
          <div className="mt-2">
            <Button asChild className="w-full" variant="primary">
              <Link href={item.url} rel="noreferrer" target="_blank">
                Open source
              </Link>
            </Button>
          </div>
        ) : null}
      </div>,
      item.title,
    );
  };

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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Favorites</h3>
        <Button variant="ghost" onClick={onClear} size="sm">
          Clear all
        </Button>
      </div>
      <div className="mt-4 space-y-3">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-background p-3"
            role="group"
            tabIndex={0}
            aria-label={`Favorite: ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") onView(item);
              if (e.key === "Delete") dispatch(toggleFavorite(item.id));
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-20 overflow-hidden rounded">
                <Image alt={item.title} className="object-cover" fill sizes="80px" src={item.imageUrl} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/95">{item.title}</p>
                <p className="text-xs text-foreground/60 truncate">{item.source}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => onView(item)}>
                View
              </Button>
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
