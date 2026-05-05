# 🎬 FilmQuest

A cinematic movie discovery app built with **Next.js** and **TypeScript**, powered by the [TMDB API](https://www.themoviedb.org/). Browse, search, and explore movies by genre and year — with a full detail page featuring cast, ratings, and trailers.

---

## ✨ Features

- **Movie Discovery** — Browse popular movies with genre and year filters
- **Live Search** — Debounced search powered by TMDB's search endpoint
- **Movie Detail Page** — Full cinematic detail view with backdrop, poster, cast grid, stats, and YouTube trailer modal
- **In-Memory Caching** — API results cached for 5 minutes to minimise TMDB requests
- **Responsive Design** — Mobile-first with hamburger navigation
- **Cinematic UI** — Dark editorial aesthetic with gold accents, film grain, and smooth animations

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Inline Styles |
| API | TMDB (The Movie Database) |
| Images | Next.js Image Optimisation |
| Icons | FontAwesome |

---

## 📁 Project Structure

```
filmquest-app/
├── components/
│   ├── commons/
│   │   ├── Button.tsx          # Reusable button
│   │   ├── Loading.tsx         # Cinematic film reel loader
│   │   └── MovieCard.tsx       # Clickable movie poster card
│   ├── home/
│   │   ├── HeroSection.tsx     # Homepage hero with starfield
│   │   ├── PosterCard.tsx      # Decorative homepage cards
│   │   ├── MovieShowcase.tsx   # Featured movies grid
│   │   ├── MovieTicker.tsx     # Scrolling marquee strip
│   │   ├── JoinCTA.tsx         # Signup call-to-action
│   │   └── globalStyles.ts     # Shared CSS keyframes
│   ├── layout/
│   │   ├── Header.tsx          # Nav with mobile hamburger
│   │   ├── Footer.tsx          # Footer with social links
│   │   └── Layout.tsx          # Page wrapper
│   └── movies/
│       ├── MovieFilters.tsx    # Search, year, genre filters
│       └── MovieGrid.tsx       # Movie grid + pagination
├── constants/
│   └── navigation.ts           # NAV_LINKS, GENRE_OPTIONS, YEAR_OPTIONS
├── data/
│   └── movies.ts               # Static homepage movie data
├── hooks/
│   └── useMovies.ts            # Fetch + filter + cache logic
├── interfaces/
│   └── index.ts                # TypeScript interfaces
├── lib/
│   ├── cache.ts                # In-memory cache (5 min TTL)
│   └── movieDetailCache.ts     # Movie detail fetch + cache
├── pages/
│   ├── api/
│   │   ├── fetch-movies.ts     # Discover + search endpoint
│   │   └── movie-detail.ts     # Detail + credits + videos
│   ├── movies/
│   │   ├── index.tsx           # /movies page
│   │   └── [id].tsx            # /movies/:id dynamic page
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx               # Homepage
└── public/
    └── manifest.json           # PWA manifest
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- A free [TMDB API account](https://www.themoviedb.org/signup)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/filmquest-app.git
cd filmquest-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```dotenv
TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
TMDB_API_KEY=your_tmdb_api_key_here
```

> Get your credentials at [themoviedb.org](https://www.themoviedb.org) → Settings → API

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `TMDB_ACCESS_TOKEN` | TMDB API Read Access Token (Bearer) | ✅ |
| `TMDB_API_KEY` | TMDB API Key | Optional |

> ⚠️ Never commit your `.env.local` file. It is already listed in `.gitignore` by default in Next.js projects.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Gold | `#E2D609` |
| Background Dark | `#0A0C10` |
| Surface | `#171D22` |
| Text Primary | `#FFFFFF` |
| Text Muted | `rgba(255,255,255,0.45)` |

**Fonts used:**
- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — display headings
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — taglines and body
- System sans-serif — UI labels and metadata

---

## 📡 API Reference

FilmQuest uses two internal API routes that proxy TMDB:

### `POST /api/fetch-movies`
Fetches a paginated list of movies.

```json
{
  "page": 1,
  "year": 2024,
  "genre": "28",
  "search": "batman"
}
```

### `GET /api/movie-detail?id={id}`
Fetches full movie details, cast, and trailer key for a given TMDB movie ID.

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🙏 Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data API
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for utility styling
- [FontAwesome](https://fontawesome.com/) for icons

---

> This product uses the TMDB API but is not endorsed or certified by TMDB.
