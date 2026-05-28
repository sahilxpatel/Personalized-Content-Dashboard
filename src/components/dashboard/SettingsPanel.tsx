"use client";

import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

import { ALL_NEWS_CATEGORIES } from "@/constants/categories";
import { setLanguage, toggleCategory } from "@/features/preferences/preferencesSlice";
import { setThemeMode } from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Button } from "../ui/Button";

export const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { i18n, t } = useTranslation();
  const { setTheme } = useTheme();
  const categories = useAppSelector((state) => state.preferences.categories);
  const language = useAppSelector((state) => state.preferences.language);
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold">{t("categoriesTitle")}</h2>
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
        <h2 className="text-lg font-semibold">{t("languageTitle")}</h2>
        <div className="mt-4 flex gap-2">
          <Button
            aria-pressed={language === "en"}
            variant={language === "en" ? "primary" : "secondary"}
            onClick={() => {
              dispatch(setLanguage("en"));
              i18n.changeLanguage("en");
            }}
          >
            English
          </Button>
          <Button
            aria-pressed={language === "es"}
            variant={language === "es" ? "primary" : "secondary"}
            onClick={() => {
              dispatch(setLanguage("es"));
              i18n.changeLanguage("es");
            }}
          >
            Espanol
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-lg font-semibold">{t("themeTitle")}</h2>
        <p className="mt-2 text-sm text-foreground/70">
          {t("storedMode")}: {themeMode}
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            aria-pressed={themeMode === "light"}
            variant={themeMode === "light" ? "primary" : "secondary"}
            onClick={() => {
              setTheme("light");
              dispatch(setThemeMode("light"));
            }}
          >
            Light
          </Button>
          <Button
            aria-pressed={themeMode === "dark"}
            variant={themeMode === "dark" ? "primary" : "secondary"}
            onClick={() => {
              setTheme("dark");
              dispatch(setThemeMode("dark"));
            }}
          >
            Dark
          </Button>
          <Button
            aria-pressed={themeMode === "system"}
            variant={themeMode === "system" ? "primary" : "secondary"}
            onClick={() => {
              setTheme("system");
              dispatch(setThemeMode("system"));
            }}
          >
            System
          </Button>
        </div>
      </div>
    </section>
  );
};
