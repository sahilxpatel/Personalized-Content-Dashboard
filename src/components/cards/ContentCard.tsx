"use client";

import { motion } from "framer-motion";
import { GripVertical, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RefObject } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ui/ModalProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { syncFavorite, toggleFavorite } from "@/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ContentItem } from "@/types/content";

interface ContentCardProps {
  item: ContentItem;
  dragHandleRef?: RefObject<HTMLButtonElement>;
  isDragging?: boolean;
}

export const ContentCard = ({ item, dragHandleRef, isDragging = false }: ContentCardProps) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.ids);
  const isFavorite = favorites.includes(item.id);
  const { notify } = useToast();
  const { openModal } = useModal();
  const canOpenExternal = /^https?:\/\//.test(item.url);

  const onFavorite = () => {
    dispatch(toggleFavorite(item.id));
    notify(isFavorite ? "Removed from favorites" : "Added to favorites", "success");

    dispatch(syncFavorite(item.id)).unwrap().catch(() => {
      notify("Failed to sync favorites. Changes will retry.", "error");
    });
  };

  const onViewDetails = () => {
    if (canOpenExternal) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }

    openModal(
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Image alt={item.title} className="h-56 w-full object-cover" height={224} src={item.imageUrl} width={640} />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-foreground/60">{item.source}</p>
          <p className="text-base leading-6 text-foreground/80">{item.description}</p>
        </div>
        {canOpenExternal ? (
          <Button asChild className="w-full" variant="primary">
            <Link href={item.url} rel="noreferrer" target="_blank">
              Open source
            </Link>
          </Button>
        ) : null}
      </div>,
      item.title,
    );
  };

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      animate={isDragging ? { scale: 0.98, rotate: -1, opacity: 0.88 } : { scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      data-dragging={isDragging}
      data-testid={`content-card-${item.id}`}
      className="group overflow-hidden rounded-xl border border-border/60 bg-surface card-gradient shadow-premium transition-[box-shadow,transform,opacity] duration-200 hover:shadow-glow"
    >
      <div className="relative h-44 w-full">
        <Image alt={item.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 33vw" src={item.imageUrl} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <button
          aria-label={`Drag ${item.title}`}
          aria-describedby={`drag-hint-${item.id}`}
          className="focus-ring absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/90 opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-black/50 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0"
          ref={dragHandleRef}
          type="button"
        >
          <GripVertical size={16} />
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Badge compact label={item.category} />
            <span id={`drag-hint-${item.id}`} className="sr-only">
              Drag this card to reorder it.
            </span>
          </div>
          <button
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            data-testid={`favorite-btn-${item.id}`}
            className="rounded-full p-1.5 text-foreground/70 transition-colors hover:bg-muted/60"
            onClick={onFavorite}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onFavorite();
              }
            }}
            type="button"
          >
            <Heart className={isFavorite ? "fill-current text-rose-500" : ""} size={18} />
          </button>
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground/95">{item.title}</h3>
        <p className="mt-1 mb-2 line-clamp-3 text-sm text-foreground/60">{item.description}</p>
        <div className="mb-2 flex items-center justify-between text-xs text-foreground/60">
          <span className="truncate">{item.source}</span>
          <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
        </div>
        {canOpenExternal ? (
          <Button asChild className="w-full" variant="secondary">
            <Link href={item.url} rel="noreferrer" target="_blank">
              {item.ctaLabel}
            </Link>
          </Button>
        ) : (
          <Button className="w-full" onClick={onViewDetails} variant="secondary">
            {item.ctaLabel}
          </Button>
        )}
      </div>
    </motion.article>
  );
};