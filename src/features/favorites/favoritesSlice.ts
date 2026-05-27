import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: [],
};

export const syncFavorite = createAsyncThunk("favorites/sync", async (id: string) => {
  // placeholder for server-side sync; returns id on success
  return id;
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favoriteId) => favoriteId !== id);
        return;
      }
      state.ids.push(id);
    },
    clearFavorites: (state) => {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
