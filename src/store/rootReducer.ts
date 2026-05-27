import { combineReducers } from "@reduxjs/toolkit";

import contentReducer from "@/features/content/contentSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import preferencesReducer from "@/features/preferences/preferencesSlice";
import themeReducer from "@/features/theme/themeSlice";
import { contentApi } from "@/services/contentApi";

export const rootReducer = combineReducers({
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  content: contentReducer,
  theme: themeReducer,
  [contentApi.reducerPath]: contentApi.reducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
