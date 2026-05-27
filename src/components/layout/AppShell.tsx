import { ReactNode } from "react";

import { Header } from "./Header";
import { PageTransition } from "./PageTransition";
import { Sidebar } from "./Sidebar";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar />
        <div className="w-full pb-8 md:pl-0">
          <Header />
          <main className="px-4 py-5 md:px-8">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </div>
  );
};
