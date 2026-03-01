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
    <div className="fixed inset-0 pointer-events-none z-30 font-accent">
      {/* Top Left: Date */}
      <div className="absolute top-16 left-16">
        <motion.div 
          key={dateString}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          <span className="text-[11px] uppercase tracking-[0.6em] text-white/20 font-bold block">Temporal Log</span>
          <h2 className="text-4xl text-white font-extralight tracking-tighter leading-none glow-text">{dateString}</h2>
        </motion.div>
      </div>

      {/* Center: Materializing Repo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentRepo && (
            <motion.div
              key={currentRepo.id}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(40px)' }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h3 className="text-[8rem] md:text-[12rem] font-bold tracking-[-0.05em] text-white/5 mix-blend-overlay uppercase leading-none font-accent italic">
                {currentRepo.name}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Right: Milestones */}
      <div className="absolute bottom-40 right-16 text-right">
        <div className="space-y-6">
          <AnimatePresence>
            {milestones.map((m, i) => (
              <motion.div
                key={m + i}
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 1.1 }}
                className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/60 font-bold block mb-1">Archive Milestone</span>
                <p className="text-base text-white/90 font-light tracking-wide">{m}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
