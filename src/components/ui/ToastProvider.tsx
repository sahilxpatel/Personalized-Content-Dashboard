"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface ToastContextValue {
  notify: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2500);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-atomic="true"
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-50 flex w-[22rem] max-w-[calc(100vw-2rem)] flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              role="status"
              className={`glass rounded-xl border px-3 py-2 text-sm shadow-glow ${
                toast.type === "success"
                  ? "border-emerald-400/30 bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100"
                  : toast.type === "error"
                    ? "border-rose-400/30 bg-rose-100 text-rose-900 dark:bg-rose-900/60 dark:text-rose-100"
                  : "border-sky-400/30 bg-sky-100 text-sky-900 dark:bg-sky-900/60 dark:text-sky-100"
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
