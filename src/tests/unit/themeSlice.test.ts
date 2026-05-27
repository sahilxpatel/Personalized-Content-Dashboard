import themeReducer, { setThemeMode } from "@/features/theme/themeSlice";

describe("themeSlice", () => {
  it("sets theme mode", () => {
    const state = themeReducer(undefined, setThemeMode("dark"));
    expect(state.mode).toBe("dark");
  });
});
