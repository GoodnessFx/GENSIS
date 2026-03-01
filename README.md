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

- **Frontend**: Next.js (App Router), Three.js, React Three Fiber, GSAP, Framer Motion, Tone.js, Tailwind CSS.
- **State Management**: Zustand (Centralized experience state).
- **Architecture**: Decoupled UI overlays from the 3D Canvas engine for high performance.

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



## 🎨 Monetization (Pro Concept - WIP)
- **Free**: 2-minute playback, watermarked export.
- **Pro ($4/month)**: Full playback, 4K wallpaper/video export, no watermark.
- **Teams ($20/month)**: Org-wide team journey visualization.

*Note: These features are part of the long-term vision and are currently in active development.*

---

Built for developers who see code as a form of legacy. 🎬
