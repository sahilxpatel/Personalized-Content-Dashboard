"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { moveContentCard } from "@/features/content/contentSlice";
import { ContentItem } from "@/types/content";
import { useAppDispatch } from "@/store/hooks";

import { ContentCard } from "./ContentCard";

interface DraggableContentCardProps {
  item: ContentItem;
}

export const DraggableContentCard = ({ item }: DraggableContentCardProps) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  const [, drop] = useDrop<{ id: string }>({
    accept: "CONTENT_CARD",
    hover: (dragItem) => {
      if (dragItem.id !== item.id) {
        dispatch(moveContentCard({ dragId: dragItem.id, hoverId: item.id }));
        dragItem.id = item.id;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CONTENT_CARD",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(ref);
  drag(handleRef);

  return (
    <div
      ref={ref}
      className={isDragging ? "cursor-grabbing opacity-90 transition-all duration-200" : "cursor-grab opacity-100 transition-all duration-200"}
    >
      <ContentCard item={item} dragHandleRef={handleRef} isDragging={isDragging} />
    </div>
  );
};
