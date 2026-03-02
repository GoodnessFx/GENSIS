'use client';

import { PlaybackControls } from '@/components/ui/PlaybackControls';
import { SpotifyPlayer } from '@/components/ui/SpotifyPlayer';
import { StatsHUD } from '@/components/ui/StatsHUD';
import { EndingSequence } from '@/components/ui/EndingSequence';
import { useExperienceStore } from '@/store/useExperienceStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Code2 } from 'lucide-react';
import { useMemo } from 'react';

const CodePeek = () => {
  const { githubData, progress, isStarted } = useExperienceStore();

  const currentRepo = useMemo(() => {
    if (!githubData || !isStarted) return null;
    const index = Math.floor(progress * githubData.length);
    const repo = githubData[Math.min(index, githubData.length - 1)];
    // Only show if it has a snippet and we're "building" it
    const totalRepos = githubData.length;
    const myProgress = index / totalRepos;
    const isBuilding = progress >= myProgress && progress < (index + 0.5) / totalRepos;
    return isBuilding ? repo : null;
  }, [githubData, progress, isStarted]);

  return (
    <AnimatePresence>
      {currentRepo && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          className="fixed bottom-40 right-16 z-40 w-[400px] bg-[#0d1117]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] font-mono"
        >
          {/* VS Code Title Bar */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{currentRepo.name}.{currentRepo.language === 'javascript' ? 'js' : (currentRepo.language === 'typescript' ? 'ts' : (currentRepo.language === 'python' ? 'py' : 'rs'))}</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
            </div>
          </div>

          {/* Editor Area */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-zinc-600 text-[10px] leading-6 select-none pt-0.5">
                {currentRepo.codeSnippet?.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="text-[11px] leading-6 text-zinc-300 whitespace-pre overflow-x-hidden">
                <motion.code
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {currentRepo.codeSnippet}
                </motion.code>
              </pre>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-blue-600/10 px-4 py-2 flex items-center justify-between border-t border-blue-500/20">
            <div className="flex items-center gap-4 text-[9px] text-blue-400 font-bold tracking-widest uppercase">
              <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3" /> Live Archive</span>
              <span>UTF-8</span>
            </div>
            <div className="text-[9px] text-blue-400/60 font-bold uppercase tracking-widest">
              {currentRepo.language}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ExperienceOverlay = () => {
  const { isEnding } = useExperienceStore();

  return (
    <>
      {!isEnding && (
        <>
          <PlaybackControls />
          <SpotifyPlayer />
          <StatsHUD />
          <CodePeek />
          
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
