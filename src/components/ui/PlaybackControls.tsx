'use client';

import { useExperienceStore } from '@/store/useExperienceStore';
import { Play, Pause, FastForward, Rewind, SkipForward, SkipBack } from 'lucide-react';

export const PlaybackControls = () => {
  const { isPlaying, setPlaying, progress, setProgress, playbackSpeed, setPlaybackSpeed } = useExperienceStore();

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-8">
      <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 space-y-8 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        {/* Scrub Bar */}
        <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden group cursor-pointer">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300" 
            style={{ width: `${progress * 100}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.0001" 
            value={progress} 
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button className="text-white/20 hover:text-white transition-all duration-500 hover:scale-110">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setPlaying(!isPlaying)}
              className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 active:scale-90 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>
            <button className="text-white/20 hover:text-white transition-all duration-500 hover:scale-110">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-6 bg-white/[0.03] px-6 py-3 rounded-full border border-white/5">
            {[0.5, 1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`text-[10px] font-title tracking-[0.2em] transition-all duration-500 ${playbackSpeed === speed ? 'text-white scale-110' : 'text-white/20 hover:text-white/50'}`}
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
