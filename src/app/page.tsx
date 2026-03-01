'use client';

import Experience from '@/components/canvas/Experience';
import { useExperienceStore } from '@/store/useExperienceStore';
import { usePlayback } from '@/hooks/usePlayback';
import { HeroOverlay } from '@/components/ui/HeroOverlay';
import { ExperienceOverlay } from '@/components/ui/ExperienceOverlay';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function Home() {
  const { isStarted } = useExperienceStore();
  usePlayback();

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      <ErrorBoundary>
        {/* 3D Scene */}
        <Experience />

        {/* UI Overlays */}
        {!isStarted ? <HeroOverlay /> : <ExperienceOverlay />}
      </ErrorBoundary>

      {/* Cinematic Overlays */}
      <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
        {/* Subtle Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
        {/* Animated Grain */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat animate-grain" />
      </div>
    </main>
  );
}
