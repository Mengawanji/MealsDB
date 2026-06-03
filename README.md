# MealsDB

A fast, modern recipe explorer built with React and TypeScript, powered by the [TheMealDB API](https://www.themealdb.com/api.php). Browse meals by name, explore full recipe details, ingredient lists, and watch step-by-step cooking videos on YouTube.

---

## Features

- Search meals by name
- View full recipe details — ingredients, measurements & instructions
- Browse meals by category and cuisine/area
- Direct YouTube links for video walkthroughs
- Fast data fetching and caching with TanStack Query
- Fully responsive — works great on mobile and desktop

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 7](https://vitejs.dev/) | Build tool & dev server |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [TanStack Query v5](https://tanstack.com/query) | Data fetching & caching |
| [ky](https://github.com/sindresorhus/ky) | HTTP client |
| [TheMealDB API](https://www.themealdb.com/api.php) | Meals data source |

---

## 🚀 Getting Started

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:Mengawanji/MealsDB.git
cd mealsdb

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
---



## 🌐 API

This project uses the free tier of **[TheMealDB](https://www.themealdb.com/api.php)** — no API key required.

Example endpoints used:

```
Search meals by name:
GET https://www.themealdb.com/api/json/v1/1/search.php?s={query}

Lookup full meal details by ID:
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
```

---
