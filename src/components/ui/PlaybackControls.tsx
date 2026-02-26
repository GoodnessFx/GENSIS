'use client';

import { useExperienceStore } from '@/store/useExperienceStore';
import { Play, Pause, FastForward, Rewind, SkipForward, SkipBack } from 'lucide-react';

export const PlaybackControls = () => {
  const { isPlaying, setPlaying, progress, setProgress, playbackSpeed, setPlaybackSpeed } = useExperienceStore();

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        {/* Scrub Bar */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden group cursor-pointer">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300" 
            style={{ width: `${progress * 100}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.001" 
            value={progress} 
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-white/50 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPlaying(!isPlaying)}
              className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full">
            {[0.5, 1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`text-xs font-bold tracking-widest transition-colors ${playbackSpeed === speed ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                {speed}X
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
