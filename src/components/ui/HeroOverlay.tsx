'use client';

import { Github, Music, Play } from 'lucide-react';
import { useExperienceStore } from '@/store/useExperienceStore';

export const HeroOverlay = () => {
  const { setStarted } = useExperienceStore();

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xl transition-all duration-1000">
      <div className="max-w-6xl px-8 text-center space-y-16 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-4">
          <span className="text-xs font-title tracking-[0.8em] text-white/40 uppercase animate-pulse">A Visual Legacy</span>
          <h1 className="text-[10rem] font-bold tracking-[-0.02em] text-white sm:text-[12rem] md:text-[16rem] font-accent leading-none glow-text">
            GENESIS
          </h1>
        </div>
        
        <p className="text-2xl text-zinc-400 font-light tracking-wide max-w-3xl mx-auto leading-relaxed professional-spacing font-sans">
          A symphonic journey through your developer history, 
          woven from the threads of your code and the rhythm of your soundtrack.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
          <button 
            onClick={() => setStarted(true)}
            className="glow-button group relative flex items-center justify-center gap-6 bg-white text-black px-20 py-8 rounded-full font-title font-bold text-sm tracking-[0.4em] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="w-6 h-6 fill-current shrink-0 group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10">INITIATE SEQUENCE</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16 pt-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-700">
          <div className="flex items-center gap-4 text-white group cursor-default">
            <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-title tracking-[0.4em] uppercase">Archive Sync</span>
          </div>
          <div className="flex items-center gap-4 text-white group cursor-default">
            <Music className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-title tracking-[0.4em] uppercase">Audio Mapping</span>
          </div>
        </div>
      </div>
    </div>
  );
};
