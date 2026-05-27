"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { SIDEBAR_NAVIGATION } from "@/constants/navigation";
import { env } from "@/lib/env";

export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Toggle menu"
        className="focus-ring glass fixed left-4 top-4 z-40 rounded-lg p-2 md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <motion.aside
        animate={open ? { x: 0 } : { x: -280 }}
        className="glass fixed inset-y-0 left-0 z-30 w-72 border-r border-border/60 p-4 md:sticky md:top-0 md:block md:h-screen md:translate-x-0"
        initial={false}
      >
        <div className="mb-8 mt-10 md:mt-2">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Control Center</p>
          <h1 className="mt-1 text-lg font-semibold text-foreground">{env.appName}</h1>
        </div>
        <nav aria-label="Main navigation" className="space-y-1">
          {SIDEBAR_NAVIGATION.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={`focus-ring flex rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "text-foreground/80 hover:bg-muted/75 hover:text-foreground"
                }`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </motion.aside>
      {open ? (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          type="button"
        />
      ) : null}
    </>
  );
};
