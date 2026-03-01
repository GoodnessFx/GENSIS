'use client';

import { PlaybackControls } from '@/components/ui/PlaybackControls';
import { SpotifyPlayer } from '@/components/ui/SpotifyPlayer';
import { StatsHUD } from '@/components/ui/StatsHUD';
import { EndingSequence } from '@/components/ui/EndingSequence';
import { useExperienceStore } from '@/store/useExperienceStore';

export const ExperienceOverlay = () => {
  const { isEnding } = useExperienceStore();

  return (
    <>
      {!isEnding && (
        <>
          <PlaybackControls />
          <SpotifyPlayer />
          <StatsHUD />
          
          {/* Legend Overlay */}
          <div className="fixed top-8 left-8 z-20 pointer-events-none opacity-40">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 border-b border-white/10 pb-3">Material Registry</h4>
              <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[9px] font-bold tracking-[0.2em] uppercase">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f7df1e] shadow-[0_0_10px_rgba(247,223,30,0.5)]" />JS • Glass</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3178c6] shadow-[0_0_10px_rgba(49,120,198,0.5)]" />TS • Chrome</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3776ab] shadow-[0_0_10px_rgba(55,118,171,0.5)]" />PY • Stone</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#dea584] shadow-[0_0_10px_rgba(222,165,132,0.5)]" />RS • Iron</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#363636] shadow-[0_0_10px_rgba(54,54,54,0.5)]" />SOL • Crystal</div>
              </div>
            </div>
          </div>
        </>
      )}
      <EndingSequence />
    </>
  );
};
