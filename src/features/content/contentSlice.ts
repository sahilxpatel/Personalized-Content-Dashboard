import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { ContentItem } from "@/types/content";
import { filterContentItems } from "@/utils/content";
import { RootState } from "@/store/store";

interface ContentState {
  entities: Record<string, ContentItem>;
  orderedIds: string[];
  searchTerm: string;
  visibleCount: number;
}

const initialState: ContentState = {
  entities: {},
  orderedIds: [],
  searchTerm: "",
  visibleCount: 12,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    upsertFeed: (state, action: PayloadAction<ContentItem[]>) => {
      const incomingIds = new Set<string>();

      action.payload.forEach((item) => {
        state.entities[item.id] = item;
        incomingIds.add(item.id);
      });

      const existing = state.orderedIds.filter((id) => incomingIds.has(id));
      const incoming = action.payload
        .map((item) => item.id)
        .filter((id) => !existing.includes(id));

      state.orderedIds = [...existing, ...incoming];
    },
    moveContentCard: (state, action: PayloadAction<{ dragId: string; hoverId: string }>) => {
      const { dragId, hoverId } = action.payload;
      const dragIndex = state.orderedIds.indexOf(dragId);
      const hoverIndex = state.orderedIds.indexOf(hoverId);

      if (dragIndex === -1 || hoverIndex === -1 || dragIndex === hoverIndex) {
        return;
      }

      state.orderedIds.splice(dragIndex, 1);
      state.orderedIds.splice(hoverIndex, 0, dragId);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    incrementVisibleCount: (state) => {
      state.visibleCount += 6;
    },
    resetVisibleCount: (state) => {
      state.visibleCount = 12;
    },
    updateSocialSignals: (state) => {
      state.orderedIds.forEach((id) => {
        const entry = state.entities[id];
        if (entry?.kind === "social") {
          const bump = Math.floor(Math.random() * 7) + 1;
          entry.trendingScore += bump;
          entry.publishedAt = new Date().toISOString();
        }
      });
    },
  },
});

const selectContentState = (state: RootState) => state.content;

export const selectOrderedContent = createSelector([selectContentState], (contentState) =>
  contentState.orderedIds.map((id) => contentState.entities[id]).filter(Boolean),
);

export const selectVisibleFeed = createSelector([selectOrderedContent, selectContentState], (items, state) => {
  const filtered = filterContentItems(items, state.searchTerm);
  return filtered.slice(0, state.visibleCount);
});

export const selectSearchSuggestions = createSelector([selectOrderedContent, selectContentState], (items, state) => {
  if (!state.searchTerm.trim()) {
    return [];
  }

  const normalized = state.searchTerm.toLowerCase();
  return items
    .filter((item) => item.title.toLowerCase().includes(normalized))
    .slice(0, 5)
    .map((item) => item.title);
});

export const {
  upsertFeed,
  moveContentCard,
  setSearchTerm,
  incrementVisibleCount,
  resetVisibleCount,
  updateSocialSignals,
} = contentSlice.actions;

export default contentSlice.reducer;
