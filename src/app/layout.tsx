import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AppShell } from "@/components/layout/AppShell";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { env } from "@/lib/env";
import { StoreProvider } from "@/store/provider";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: env.appName,
  description: "A production-ready personalized content dashboard",
  openGraph: {
    title: env.appName,
    description: "A production-ready personalized content dashboard",
    url: env.appUrl,
    siteName: env.appName,
    images: [
      {
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: env.appName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: env.appName,
    description: "A production-ready personalized content dashboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AppShell>{children}</AppShell>
            </Suspense>
          </ErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
}
