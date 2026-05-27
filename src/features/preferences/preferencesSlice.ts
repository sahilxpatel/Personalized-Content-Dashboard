import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ALL_NEWS_CATEGORIES } from "@/constants/categories";
import { NewsCategory } from "@/types/content";

export interface PreferencesState {
  categories: NewsCategory[];
  language: "en" | "es";
}

const initialState: PreferencesState = {
  categories: ALL_NEWS_CATEGORIES,
  language: "en",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<NewsCategory[]>) => {
      state.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<NewsCategory>) => {
      const exists = state.categories.includes(action.payload);
      if (exists) {
        state.categories = state.categories.filter((category) => category !== action.payload);
        return;
      }
      state.categories.push(action.payload);
    },
    setLanguage: (state, action: PayloadAction<"en" | "es">) => {
      state.language = action.payload;
    },
  },
});

export const { setCategories, toggleCategory, setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;
