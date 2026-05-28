# Personalized Content Dashboard — Project Document

Live demo: https://personalized-content-dashboard-alpha.vercel.app/

This repository contains a production-ready, single-page dashboard application that aggregates personalized content (news, movie recommendations, and social signals) and provides a lightweight UX for curation, ordering and discovery.

This document explains: quick setup, developer workflows, architecture, key files and decisions, testing and deployment guidance.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Copy environment template and add API keys

```bash
copy .env.example .env.local
# then edit .env.local and add your keys
```

Required env vars (minimum):

- Client-side (development/demo):
  - `NEXT_PUBLIC_NEWS_API_URL` (e.g. https://gnews.io/api/v4)
  - `NEXT_PUBLIC_NEWS_API_KEY` (GNews token — only for demo; rotate for production)
  - `NEXT_PUBLIC_TMDB_API_URL` (e.g. https://api.themoviedb.org/3)
  - `NEXT_PUBLIC_TMDB_API_KEY`

- Server-side (recommended — keep these private and set in your hosting provider):
  - `NEWS_API_KEY` — GNews API token (server-only)
  - `TMDB_API_KEY` — TMDB API key (server-only)

Notes:
- `.env.local` was removed from the repository to avoid accidental exposure of real keys. If you previously committed keys, rotate them immediately.
- This project includes example server-side proxy endpoints:
  - `/api/proxy/news` — forwards requests to the GNews API using `NEWS_API_KEY` (server-only)
  - `/api/proxy/tmdb` — forwards requests to the TMDB API using `TMDB_API_KEY` (server-only)

Use those proxy endpoints in production to avoid shipping secrets to the client.

3. Run locally

```bash
npm run dev
```

Build for production

```bash
npm run build
npm run start
```

Run tests

```bash
npm run test       # unit + integration (Jest)
npx playwright install && npm run test:e2e  # E2E (Playwright)
```

## What this project includes (summary)

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with design tokens and utility enhancements
- Redux Toolkit + RTK Query for data fetching and cache management
- redux-persist (client-side persisted preferences/favorites)
- framer-motion for animation; react-dnd for drag-and-drop ordering
- Mocked social feed (local JSON) — NO real Twitter/Instagram APIs
- Jest + React Testing Library (unit + integration) and Playwright (E2E)

## High-level architecture

Data flow (simplified):

1. UI components dispatch actions or call RTK Query hooks.
2. `src/services/contentApi.ts` (RTK Query) fetches from external APIs (GNews, TMDB) or local mock data for social posts and normalizes responses.
3. Normalizers (`src/services/normalizers.ts`) convert heterogeneous source shapes into a single `ContentItem` shape used by the UI and store.
4. `src/features/content/contentSlice.ts` maintains the canonical feed order, pagination cursor, and search/filter state. Reordering (drag-and-drop) updates the slice and persists order via `redux-persist`.
5. UI reads from the store (selectors) and renders `ContentCard`/`DraggableContentCard` components.

Visual layout and providers:

- `src/app/layout.tsx` composes global providers and the `AppShell` layout.
- `src/store/provider.tsx` wires `Redux Provider`, `PersistGate`, `DndProvider`, theme provider, modal and toast providers.
- UI primitives live under `src/components/ui` (Card, Button, Input, ModalProvider, ToastProvider).

Key responsibilities (selected files)

- `src/services/contentApi.ts` — RTK Query endpoints for `news`, `trending`, `recommendations`, `social` (mock).
- `src/services/normalizers.ts` — source-specific normalizers → `ContentItem`.
- `src/features/content/contentSlice.ts` — feed ordering, optimistic updates, and tag invalidation.
- `src/components/cards/ContentCard.tsx` — presentational card with CTA, favorite toggle and drag handle.
- `src/components/cards/DraggableContentCard.tsx` — drag source/drop target wrapper (react-dnd).
- `src/app/settings/page.tsx` — settings UI: categories, language, theme and Back button.
- `src/constants/socialPosts.json` — local social posts mock (used instead of external social APIs).

Folder map (short):

- `src/app` — Next.js App Router routes and top-level layout
- `src/components` — UI components, layout, and dashboard pieces
- `src/features` — Redux slices (content, preferences, favorites, theme)
- `src/services` — RTK Query APIs, axios clients and normalizers
- `src/store` — store configuration and provider composition
- `src/tests` — unit, integration and E2E specs + test helpers and mocks

## Design & UX decisions

- Single canonical `ContentItem` model for the feed simplifies rendering and ordering.
- Local JSON social mock prevents third-party API usage and speeds CI.
- Client-side `NEXT_PUBLIC_*` keys are used for speed in this sample; for production, move keys to a server-side proxy or API route to avoid exposing secrets.
- Drag-and-drop uses a visible handle with keyboard focus styles for accessibility.
- RTK Query tagTypes and normalized cache allow efficient invalidation and refetching.

## Environment & secrets

This repo uses `NEXT_PUBLIC_` env variables for demonstration. For production:

- Never commit private API keys. Use server-side environment variables or a proxy API to keep secrets off the client.

## Testing

- Unit tests run with Jest (see `jest.config.ts` and `src/tests`).
- Integration tests use React Testing Library helpers in `src/tests/test-utils.tsx` which mount global providers.
- E2E tests use Playwright (`playwright.config.ts`). Install browsers with `npx playwright install`.

## Deployment

- Vercel: `vercel.json` included; add env vars in project settings.
- Docker: `Dockerfile` included for containerized runs.
- CI: GitHub Actions flows are in `.github/workflows/ci.yml`.

## Proposed cleanup (files that look like generated/report artifacts)

I recommend removing the following developer artifacts to keep the repo tidy (I will not delete them until you confirm):

- `playwright-report/` — generated Playwright HTML report and data
- `test-results/.last-run.json` — CI/test artifact

Optional (keep if you rely on them):

- `package-lock.json` — lockfile for npm (keep for reproducible installs) — do not remove unless you prefer Yarn/PNPM

If you approve, I will remove the `playwright-report/` and `test-results/.last-run.json` files now.

## Contribution / Next steps

- Run `npm run lint` and `npm run test` before opening PRs.
- If you'd like, I can also:
  - Remove the proposed files now.
  - Add a small CONTRIBUTING.md and PR checklist.
  - Add a server-side proxy example to hide API keys.

---
