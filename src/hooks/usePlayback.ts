'use client';

import { useEffect } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';

export const usePlayback = () => {
  const { isPlaying, progress, setProgress, playbackSpeed, githubData } = useExperienceStore();

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      if (isPlaying && githubData && githubData.length > 0) {
        const deltaTime = (currentTime - lastTime) / 1000; // in seconds
        const totalDuration = githubData.length * 5; // 5 seconds per repo at 1x
        const increment = (deltaTime * playbackSpeed) / totalDuration;
        
        const nextProgress = Math.min(1, progress + increment);
        setProgress(nextProgress);
        
        if (nextProgress >= 1) {
          useExperienceStore.getState().setPlaying(false);
        }
      }
      
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, progress, setProgress, playbackSpeed, githubData]);
};
