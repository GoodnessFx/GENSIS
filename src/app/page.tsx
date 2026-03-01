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

      {/* Film Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20"></div>
      </div>
    </main>
  );
}
