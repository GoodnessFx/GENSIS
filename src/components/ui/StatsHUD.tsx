'use client';

import { useExperienceStore } from '@/store/useExperienceStore';
import { useMemo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const StatsHUD = () => {
  const { githubData, progress, milestones, currentYear } = useExperienceStore();
  
  const currentRepo = useMemo(() => {
    if (!githubData) return null;
    const index = Math.floor(progress * githubData.length);
    return githubData[Math.min(index, githubData.length - 1)];
  }, [githubData, progress]);

  const dateString = useMemo(() => {
    if (!currentRepo) return '';
    return new Date(currentRepo.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [currentRepo]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 font-sans">
      {/* Top Left: Date */}
      <div className="absolute top-12 left-12">
        <motion.div 
          key={dateString}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Timeline Archive</span>
          <h2 className="text-2xl text-white font-light tracking-tight">{dateString}</h2>
        </motion.div>
      </div>

      {/* Center: Materializing Repo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentRepo && (
            <motion.div
              key={currentRepo.id}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/10 mix-blend-overlay uppercase">
                {currentRepo.name}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Right: Milestones */}
      <div className="absolute bottom-32 right-12 text-right">
        <div className="space-y-4">
          <AnimatePresence>
            {milestones.map((m, i) => (
              <motion.div
                key={m + i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg"
              >
                <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold block mb-1">Milestone Reached</span>
                <p className="text-sm text-white font-medium">{m}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
