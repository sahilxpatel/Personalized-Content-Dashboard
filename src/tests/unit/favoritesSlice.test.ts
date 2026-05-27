import favoritesReducer, { clearFavorites, toggleFavorite } from "@/features/favorites/favoritesSlice";

describe("favoritesSlice", () => {
  it("adds and removes favorites", () => {
    const added = favoritesReducer(undefined, toggleFavorite("item-1"));
    expect(added.ids).toEqual(["item-1"]);

    const removed = favoritesReducer(added, toggleFavorite("item-1"));
    expect(removed.ids).toEqual([]);
  });

  it("clears all favorites", () => {
    const state = favoritesReducer({ ids: ["a", "b"] }, clearFavorites());
    expect(state.ids).toEqual([]);
  });
});
