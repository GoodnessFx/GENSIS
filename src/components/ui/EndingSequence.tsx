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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl overflow-hidden font-accent">
      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl px-8 text-center space-y-20"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h2 className="text-xs uppercase tracking-[1em] text-white/20 font-bold">The Odyssey Concludes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-8">
                {[
                  { label: 'Years of Creation', value: stats?.years },
                  { label: 'Repositories Formed', value: stats?.repos },
                  { label: 'Total Contributions', value: stats?.commits },
                  { label: 'Stars Gathered', value: stats?.stars },
                  { label: 'Forks Initiated', value: stats?.forks },
                  { label: 'Audio Tracks Synced', value: stats?.songs },
                ].map((s, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="space-y-2 group"
                  >
                    <div className="text-6xl font-bold tracking-tighter text-white group-hover:scale-110 transition-transform duration-500 glow-text">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="py-12"
            >
              <h1 className="text-8xl md:text-[12rem] font-bold text-white mix-blend-difference font-accent tracking-tighter leading-none glow-text italic">
                KEEP BUILDING.
              </h1>
            </motion.div>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4.5, duration: 1 }}
              className="flex flex-wrap items-center justify-center gap-10"
            >
              <button className="glow-button flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-full font-title font-bold text-[11px] tracking-[0.3em] group">
                <Share2 className="w-5 h-5 shrink-0 group-hover:rotate-12 transition-transform" />
                <span>EXHIBIT JOURNEY</span>
              </button>
              <button className="glow-button flex items-center justify-center gap-4 bg-white/[0.03] text-white px-12 py-6 rounded-full font-title font-bold text-[11px] tracking-[0.3em] border border-white/10 group">
                <Download className="w-5 h-5 shrink-0 group-hover:-translate-y-1 transition-transform" />
                <span>CAPTURE 4K</span>
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-4 text-white/30 hover:text-white transition-all duration-500 font-title font-bold text-[11px] tracking-[0.3em] group"
              >
                <RefreshCw className="w-5 h-5 shrink-0 group-hover:rotate-180 transition-transform duration-1000" />
                <span>RESET TIMELINE</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
