# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Crypto Dash: a React 19 + Vite single-page app for browsing and searching cryptocurrency data from the CoinGecko API. Plain JavaScript (JSX), no TypeScript.

## Commands

- `npm run dev`: start the Vite dev server
- `npm run build`: production build to `dist/`
- `npm run preview`: serve the production build
- `npm run lint`: ESLint (flat config in `eslint.config.js`, with react-hooks and react-refresh rules)

There is no test framework configured.

## Environment

API endpoints come from `.env` through Vite's `import.meta.env`:

- `VITE_COINS_API_URL`: the CoinGecko markets endpoint with its query string already started. `App.jsx` appends `&order=...&per_page=...`, so this value must already contain a `?`.
- `VITE_COIN_API_URL`: base URL for single coins. Code appends `/${id}` for details and `/${id}/market_chart?...` for chart data.

The names differ only by the `S` in `COINS`, so be careful not to mix them up.

## Architecture

- `main.jsx` wraps `App` in `BrowserRouter`. Routing uses **`react-router` v7** (imported from `react-router`, not `react-router-dom`).
- `App.jsx` owns the coin-list state (`coins`, `limit`, `filter`, `sortBy`, `loading`, `error`) and refetches whenever `limit` changes. It passes this state as props to `pages/home.jsx`.
- Filtering by name or symbol and sorting happen client-side in `pages/home.jsx`, on the coins that have already been fetched.
- `pages/coin-details.jsx` (`/coin/:id`) fetches its own coin data. It renders `components/CoinChart.jsx`, which makes a separate fetch for 7-day price history and draws it with Chart.js (using a time scale with `chartjs-adapter-date-fns`).
- Page files use lowercase-kebab names (`pages/*.jsx`), and component files use PascalCase names (`components/*.jsx`). Components are arrow functions with default exports. All styling is global CSS in `src/index.css`.
