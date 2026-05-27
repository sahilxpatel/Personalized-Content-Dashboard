import { ReactNode } from "react";

export const DndProvider = ({ children }: { children: ReactNode }) => children;

export const useDrag = () => [{ isDragging: false }, () => null] as const;

export const useDrop = () => [null, () => null] as const;
