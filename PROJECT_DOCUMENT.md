# Personalized Content Dashboard

Project Document

## Paste URL

Deployed project URL: **************\_\_\_\_**************

## Overview

Personalized Content Dashboard is a production-style Next.js application that aggregates personalized news, movie recommendations, and mocked social content into one responsive interface. The goal is to help users discover, reorder, favorite, and filter content while keeping the experience fast, accessible, and visually polished.

## Tech Stack

- Next.js 14 App Router
- React and TypeScript
- Tailwind CSS
- Redux Toolkit and RTK Query
- redux-persist
- Framer Motion
- React DnD
- Axios
- next-themes
- Jest and React Testing Library
- Playwright

## Architecture

The app uses a feature-first architecture with a single normalized content model.

1. Data fetching lives in `src/services/contentApi.ts`.
2. Response shaping and source normalization live in `src/services/normalizers.ts`.
3. Feed state, ordering, favorites, and search state live in Redux slices under `src/features`.
4. Shared UI is composed from reusable components in `src/components`.
5. App routes and layout composition live under `src/app`.

This structure keeps API logic, state logic, and presentation separate so the dashboard is easier to test and extend.

## Key Behaviors

- Personalized categories and content preferences
- Unified feed from GNews, TMDB, and local social mock data
- Drag-and-drop reordering with persisted order
- Favorites saved locally
- Dark mode and theme persistence
- Search with suggestions
- Loading, empty, and error states
- Responsive dashboard navigation and settings

## Data Sources

- News content comes from GNews.
- Movie recommendations and trending items come from TMDB.
- Social content uses local JSON mock data in `src/constants/socialPosts.json` so the app does not depend on real Twitter or Instagram APIs.

## Folder Structure

- `src/app` - application routes and global layout
- `src/components` - dashboard, layout, search, cards, and UI primitives
- `src/features` - Redux slices for content, favorites, preferences, and theme
- `src/services` - API clients and normalizers
- `src/store` - Redux store and providers
- `src/hooks` - reusable hooks
- `src/constants` - static config and mock data
- `src/tests` - unit, integration, and E2E tests

## Setup

```bash
npm install
npm run dev
```

Create a local environment file with API keys before running the app in full mode.

## Testing

- Unit and integration tests: `npm run test`
- E2E tests: `npm run test:e2e`
- Production build: `npm run build`

## Deployment

The project includes support files for Vercel, Docker, and GitHub Actions CI.

## Notes

- This project is designed to be production-ready but uses client-visible environment variables for simplicity.
- For a real deployment, move secret API handling behind a server-side proxy.
- The README contains the longer project document; this file is a compact submission-ready version with a URL placeholder.
