"use client";

import { useTranslation } from "react-i18next";

import { ALL_NEWS_CATEGORIES } from "@/constants/categories";
import { toggleCategory } from "@/features/preferences/preferencesSlice";
import { setThemeMode } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Button } from "../ui/Button";

export const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const categories = useAppSelector((state) => state.preferences.categories);
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold">Personalization categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_NEWS_CATEGORIES.map((category) => {
            const active = categories.includes(category);
            return (
              <button
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-sm capitalize ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-foreground"
                }`}
                key={category}
                onClick={() => dispatch(toggleCategory(category))}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold">Language</h2>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" onClick={() => i18n.changeLanguage("en")}>
            English
          </Button>
          <Button variant="secondary" onClick={() => i18n.changeLanguage("es")}>
            Espanol
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold">Theme preference</h2>
        <p className="mt-2 text-sm text-foreground/70">Stored mode: {themeMode}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" onClick={() => dispatch(setThemeMode("light"))}>
            Light
          </Button>
          <Button variant="secondary" onClick={() => dispatch(setThemeMode("dark"))}>
            Dark
          </Button>
          <Button variant="secondary" onClick={() => dispatch(setThemeMode("system"))}>
            System
          </Button>
        </div>
      </div>
    </section>
  );
};
