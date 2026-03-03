# GENESIS 🎬

**GENESIS** is an immersive 3D cinematic experience that transforms a developer's entire GitHub history into a living time machine, synchronized with a Spotify-powered soundtrack that matches each era of their journey.

## 🌟 Features

### 1. The Visual World
- **Infinite Dark Void**: A minimalist environment that fills with light as your career grows.
- **Cinematic Drone Camera**: Always moving, reacting emotionally to your milestones.
- **Timeline Biomes**: Terrain that evolves from a barren desert (Year 1) to a thriving forest and eventually a massive civilization (Year 5+).
- **Repo Monuments**: Procedural 3D structures whose architecture is determined by the dominant language:
  - **JavaScript**: Glass Skyscraper
  - **TypeScript**: Chrome Tower
  - **Python**: Stone Temple
  - **Rust**: Iron Fortress
  - **Solidity**: Crystal Spire
  - **Go**: White Obelisk
- **Real-time Materialization**: Watch repositories build themselves with floating particles and scrolling code.

### 2. The Music Layer
- **Dynamic Soundtrack**: Syncs with commit frequency, languages used, and time of day.
- **Audio Visualization**: Aurora borealis sky that pulses with the bass and rhythm of the music.

### 3. Subtle HUD & Ending
- **Stats Layer**: Minimalist floating text for dates, repo names, and milestone callouts.
- **Ending Sequence**: A dramatic camera pullback revealing the entire world, followed by a global stats summary and the final prompt: *Keep building.*

## 🛠️ Tech Stack & Architecture

- Frontend: Next.js (App Router), Three.js, React Three Fiber, GSAP, Framer Motion, Tone.js, Tailwind CSS.
- State: Zustand (centralized experience state).
- Auth: NextAuth (GitHub + Spotify), Supabase OAuth for X (Twitter).
- Data: Supabase (Postgres + pgvector), optional Upstash Redis cache.
- Architecture: UI overlays fully decoupled from the 3D canvas. Heavy 3D code dynamically imported to minimize initial JS.

### Architecture Diagram (Mermaid)
```mermaid
flowchart TD
  A[Client UI] -->|Zustand| B[Experience State]
  A --> C[Hero Overlay]
  A --> D[Experience Overlay]
  A -->|dynamic import| E[3D Scene (R3F)]
  E --> F[Repo Monuments]
  E --> G[Postprocessing]
  A --> H[Auth Buttons]
  H --> I[NextAuth (GitHub/Spotify)]
  H --> J[Supabase OAuth (X)]
  I --> K[/api/github/*, /api/spotify/*]
  J --> L[/api/supabase/profile/init]
  M[/api/x/bookmarks] --> N[/api/x/ingest] --> O[(Supabase: items)]
  P[/api/settings/export] & Q[/api/settings/delete] --> O
```

*Note: The architecture diagram in previous versions included high-level infrastructure (Redis/Bull) which is part of the future scalable backend; currently, the app runs as a performant standalone Next.js application.*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/genesis.git
   cd genesis
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Analyze bundle (optional):
   ```bash
   npm run analyze
   ```

### Environment
Copy `.env.example` to `.env.local` and fill:
- GitHub/Spotify (NextAuth), Supabase (public + service role), X/Twitter bearer token, CRON secret, Redis (optional)

### Performance Blueprint
- App Router with dynamic imports for heavy 3D: `src/app/page.tsx` dynamically loads the scene to reduce initial JS.
- Avoid impure work in render; lint/typecheck clean.
- Image optimization via Next; Tailwind v4 with JIT.
- Analyzer ready: `npm run analyze` to inspect bundle and remove bloat.
- Prefer server routes for data; cache with Redis (optional) or route revalidation.
- Use Edge/cron where suitable for auth/rate-limit and background work.

### Supabase Schema
Run the SQL in `docs/schema.sql` inside Supabase. RLS policies are included for owner-only access. pgvector index hints are provided for fast semantic search.



## 🎨 Monetization (Pro Concept - WIP)
- **Free**: 2-minute playback, watermarked export.
- **Pro ($4/month)**: Full playback, 4K wallpaper/video export, no watermark.
- **Teams ($20/month)**: Org-wide team journey visualization.

*Note: These features are part of the long-term vision and are currently in active development.*

---

Built for developers who see code as a form of legacy. 🎬
