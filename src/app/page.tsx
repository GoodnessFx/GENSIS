'use client';

import Experience from '@/components/canvas/Experience';
import { useExperienceStore } from '@/store/useExperienceStore';
import { Github, Music, Play } from 'lucide-react';
import { PlaybackControls } from '@/components/ui/PlaybackControls';
import { usePlayback } from '@/hooks/usePlayback';
import { SpotifyPlayer } from '@/components/ui/SpotifyPlayer';
import { StatsHUD } from '@/components/ui/StatsHUD';
import { EndingSequence } from '@/components/ui/EndingSequence';

export default function Home() {
  const { isStarted, setStarted, isEnding } = useExperienceStore();
  usePlayback();

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* 3D Scene */}
      <Experience />

      {/* UI Overlay */}
      {!isStarted ? (
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
      ) : (
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
      )}

      {/* Film Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.05] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20"></div>
      </div>
    </main>
  );
}
