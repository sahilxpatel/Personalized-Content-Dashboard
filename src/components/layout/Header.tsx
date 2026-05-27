"use client";

import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SearchBar } from "@/components/search/SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "@/components/ui/ToastProvider";

export const Header = () => {
  const router = useRouter();
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (e.target && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onLogoutMock = () => {
    // Mock logout: notify and optionally clear persisted state
    try {
      // Clear persisted Redux store keys used by redux-persist
      // (This is intentionally conservative; avoid clearing full localStorage)
      localStorage.removeItem("persist:root");
    } catch {
      // ignore
    }
    notify("Logged out (mock)", "success");
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/70 px-4 py-3 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3 md:gap-4">
        <SearchBar />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <div className="relative" ref={menuRef}>
            <button
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="User profile"
              className="focus-ring glass rounded-lg p-2 text-foreground/80 hover:bg-muted/60"
              onClick={() => setOpen((s) => !s)}
              type="button"
            >
              <UserCircle2 size={18} />
            </button>

            {open ? (
              <div
                role="menu"
                aria-label="Profile menu"
                className="absolute right-0 mt-2 w-48 rounded-lg border border-border/40 bg-surface p-2 shadow-lg"
              >
                <Link href="/settings">
                  <button
                    role="menuitem"
                    className="w-full text-left rounded px-2 py-2 text-sm hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </button>
                </Link>

                <button
                  role="menuitem"
                  className="w-full text-left rounded px-2 py-2 text-sm hover:bg-muted"
                  onClick={() => {
                    // Toggle theme via the ThemeToggle button logic: emit a click on the visible ThemeToggle
                    const el = document.querySelector('[data-testid="theme-toggle"]') as HTMLButtonElement | null;
                    if (el) el.click();
                    setOpen(false);
                  }}
                >
                  Toggle theme
                </button>

                <button
                  role="menuitem"
                  className="w-full text-left rounded px-2 py-2 text-sm text-rose-600 hover:bg-muted"
                  onClick={onLogoutMock}
                >
                  Logout (mock)
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
