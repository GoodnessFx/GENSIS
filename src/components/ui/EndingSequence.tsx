'use client';

import { useExperienceStore } from '@/store/useExperienceStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';
import { Share2, Download, Twitter, RefreshCw } from 'lucide-react';

export const EndingSequence = () => {
  const { isEnding, githubData } = useExperienceStore();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isEnding) {
      const timer = setTimeout(() => setShowContent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isEnding]);

  const stats = useMemo(() => {
    if (!githubData) return null;
    return {
      years: new Date().getFullYear() - new Date(githubData[0].date).getFullYear(),
      repos: githubData.length,
      commits: githubData.reduce((acc, r) => acc + r.commits, 0),
      stars: githubData.reduce((acc, r) => acc + r.stars, 0),
      forks: Math.floor(githubData.reduce((acc, r) => acc + r.stars, 0) * 0.1), // Mocked
      songs: githubData.length // Mocked
    };
  }, [githubData]);

  if (!isEnding) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm overflow-hidden">
      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl px-8 text-center space-y-12"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-sm uppercase tracking-[0.5em] text-white/40 font-bold">The Journey So Far</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                {[
                  { label: 'Years Active', value: stats?.years },
                  { label: 'Repos Created', value: stats?.repos },
                  { label: 'Total Commits', value: stats?.commits },
                  { label: 'Stars Received', value: stats?.stars },
                  { label: 'Forks Earned', value: stats?.forks },
                  { label: 'Soundtrack Tracks', value: stats?.songs },
                ].map((s, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-4xl font-bold tracking-tighter text-white">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="py-12"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mix-blend-difference font-title professional-spacing leading-tight">
                KEEP BUILDING.
              </h1>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <button className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-title font-bold text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] whitespace-normal text-center max-w-[220px] leading-relaxed group">
                <Share2 className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform" />
                <span>SHARE EXPERIENCE</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 text-white px-8 py-4 rounded-full font-title font-bold text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all border border-white/10 whitespace-normal text-center max-w-[220px] leading-relaxed group">
                <Download className="w-4 h-4 shrink-0 group-hover:-translate-y-1 transition-transform" />
                <span>4K WALLPAPER</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-[#1DA1F2] text-white px-8 py-4 rounded-full font-title font-bold text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(29,161,242,0.3)] whitespace-normal text-center max-w-[220px] leading-relaxed group">
                <Twitter className="w-4 h-4 shrink-0 fill-current group-hover:scale-110 transition-transform" />
                <span>TWEET GENESIS</span>
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-3 bg-white/5 text-white/40 px-8 py-4 rounded-full font-title font-bold text-[10px] tracking-[0.2em] hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 whitespace-normal text-center max-w-[220px] leading-relaxed group"
              >
                <RefreshCw className="w-4 h-4 shrink-0 group-hover:rotate-180 transition-transform duration-700" />
                <span>REPLAY</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
