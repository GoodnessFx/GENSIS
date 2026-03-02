'use client';

import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useExperienceStore } from '@/store/useExperienceStore';
import { getTrackForRepo, SpotifyTrack } from '@/lib/spotifyService';

export const useAudio = () => {
  const { isPlaying, progress, githubData, isStarted } = useExperienceStore();
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const lfoRef = useRef<Tone.LFO | null>(null);
  const filterRef = useRef<Tone.AutoFilter | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const lastIndexRef = useRef<number>(-1);

  useEffect(() => {
    // Initialize audio on start
    if (isStarted && !synthRef.current) {
      Tone.start();
      
      const filter = new Tone.AutoFilter("4n").toDestination().start();
      const reverb = new Tone.Reverb(2).connect(filter);
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 }
      }).connect(reverb);

      synth.volume.value = -12;
      synthRef.current = synth;
      filterRef.current = filter;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
    };
  }, [isStarted]);

  useEffect(() => {
    if (!githubData || !isStarted) return;

    const index = Math.floor(progress * githubData.length);
    const repo = githubData[Math.min(index, githubData.length - 1)];

    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      getTrackForRepo(repo).then(track => {
        setCurrentTrack(track);
        // Change audio vibe based on track BPM/Genre
        if (synthRef.current) {
          Tone.Transport.bpm.value = track.bpm;
          // Play a harmonic sequence related to the repo
          const notes = ["C3", "E3", "G3", "B3"];
          const charSum = repo.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const rootNote = notes[charSum % notes.length];
          
          if (isPlaying) {
            synthRef.current.triggerAttackRelease(rootNote, "2n");
          }
        }
      });
    }
  }, [githubData, progress, isStarted, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      if (synthRef.current) synthRef.current.releaseAll();
    }
  }, [isPlaying]);

  return { currentTrack };
};
