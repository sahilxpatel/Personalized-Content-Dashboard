"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { setThemeMode } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      dispatch(setThemeMode(resolvedTheme));
    }
  }, [dispatch, resolvedTheme]);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setTheme(next);
    dispatch(setThemeMode(next));
  };

  return (
    <button
      aria-label="Toggle dark mode"
      data-testid="theme-toggle"
      className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      onClick={toggle}
      type="button"
    >
      {mode === "dark" ? "Light" : "Dark"} mode
    </button>
  );
};
