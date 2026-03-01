'use client';

import { useExperienceStore } from '@/store/useExperienceStore';
import { Music, Volume2, Radio } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';
import { getTrackForRepo, SpotifyTrack } from '@/lib/spotifyService';

export const SpotifyPlayer = () => {
  const { githubData, progress, isStarted } = useExperienceStore();
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!githubData || !isStarted) return;
    
    const index = Math.floor(progress * githubData.length);
    const repo = githubData[Math.min(index, githubData.length - 1)];
    
    // In a production app, we would cache these to avoid flickering
    getTrackForRepo(repo).then(track => {
      setCurrentTrack(track);
      // If the track is from the repo era, we consider it "Live" (mock logic)
      setIsLive(true); 
    });
  }, [githubData, progress, isStarted]);

  if (!currentTrack) return null;

  return (
    <div className="fixed top-8 right-8 z-20">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right duration-500">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group">
          {isLive ? <Radio className="w-6 h-6 text-green-500" /> : <Music className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />}
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
            {isLive ? 'Live Sync' : 'Liked Songs Fallback'}
          </div>
          <h3 className="text-white font-medium text-sm leading-none truncate max-w-[150px]">
            {currentTrack.name}
          </h3>
          <p className="text-white/40 text-xs font-light">
            {currentTrack.artist} • {currentTrack.bpm} BPM
          </p>
        </div>

        <div className="pl-4 border-l border-white/10 ml-2">
          <Volume2 className="w-4 h-4 text-white/50" />
        </div>
      </div>
    </div>
  );
};
