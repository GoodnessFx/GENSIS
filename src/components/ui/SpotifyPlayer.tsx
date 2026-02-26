'use client';

import { useExperienceStore } from '@/store/useExperienceStore';
import { Music, Volume2 } from 'lucide-react';
import { useMemo } from 'react';
import { getMockTrack } from '@/lib/spotifyMock';

export const SpotifyPlayer = () => {
  const { githubData, progress, isStarted } = useExperienceStore();

  const currentTrack = useMemo(() => {
    if (!githubData || !isStarted) return null;
    const index = Math.floor(progress * githubData.length);
    const repo = githubData[Math.min(index, githubData.length - 1)];
    return getMockTrack(repo);
  }, [githubData, progress, isStarted]);

  if (!currentTrack) return null;

  return (
    <div className="fixed top-8 right-8 z-20">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right duration-500">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group">
          <Music className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          {/* Simulated Visualizer Bars */}
          <div className="absolute bottom-0 left-0 w-full flex items-end justify-center gap-0.5 px-1 h-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-1 bg-green-500 animate-pulse" 
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`
                }} 
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs font-bold text-green-500 uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Now Playing
          </div>
          <h3 className="text-white font-medium text-sm leading-none truncate max-w-[150px]">
            {currentTrack.name}
          </h3>
          <p className="text-white/40 text-xs font-light">
            {currentTrack.genre} • {currentTrack.bpm} BPM
          </p>
        </div>

        <div className="pl-4 border-l border-white/10 ml-2">
          <Volume2 className="w-4 h-4 text-white/50" />
        </div>
      </div>
    </div>
  );
};
