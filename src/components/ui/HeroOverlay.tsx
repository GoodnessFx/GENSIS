'use client';

import { Github, Music, Play } from 'lucide-react';
import { useExperienceStore } from '@/store/useExperienceStore';

export const HeroOverlay = () => {
  const { setStarted } = useExperienceStore();

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="max-w-4xl px-8 text-center space-y-12 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-8xl font-bold tracking-[0.15em] text-white sm:text-9xl md:text-[12rem] font-title professional-spacing">
          GENESIS
        </h1>
        <p className="text-xl text-zinc-300 font-light tracking-[0.1em] max-w-2xl mx-auto leading-relaxed opacity-80 professional-spacing">
          An immersive 3D cinematic journey through your developer history, 
          synced to the soundtrack of your life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
          <button 
            onClick={() => setStarted(true)}
            className="group relative flex items-center justify-center gap-6 bg-white text-black px-16 py-6 rounded-full font-title font-bold text-xs tracking-[0.3em] transition-all hover:scale-105 active:scale-95 hover:bg-zinc-100 shadow-[0_0_60px_rgba(255,255,255,0.3)] whitespace-normal text-center max-w-[300px] leading-relaxed"
          >
            <Play className="w-5 h-5 fill-current shrink-0 group-hover:scale-110 transition-transform" />
            <span>BEGIN EXPERIENCE</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 pt-20 opacity-40">
          <div className="flex items-center gap-3 text-zinc-400 group">
            <Github className="w-5 h-5 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">GitHub History</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400 group">
            <Music className="w-5 h-5 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Spotify Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};
