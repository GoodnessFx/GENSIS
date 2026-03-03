'use client';

import { Repo } from './githubService';

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  genre: string;
  bpm: number;
  mood: string;
  albumArt?: string;
  previewUrl?: string;
}

const LIKED_SONGS_FALLBACK: SpotifyTrack[] = [
  { id: 'f1', name: 'Midnight City', artist: 'M83', genre: 'Synth-pop', bpm: 105, mood: 'Nostalgic' },
  { id: 'f2', name: 'Strobe', artist: 'deadmau5', genre: 'Progressive House', bpm: 128, mood: 'Euphoric' },
  { id: 'f3', name: 'Resonance', artist: 'Home', genre: 'Synthwave', bpm: 85, mood: 'Retro' },
  { id: 'f4', name: 'Veridis Quo', artist: 'Daft Punk', genre: 'Electronic', bpm: 110, mood: 'Melancholic' },
  { id: 'f5', name: 'Weightless', artist: 'Marconi Union', genre: 'Ambient', bpm: 60, mood: 'Relaxed' },
];

export const getTrackForRepo = async (repo: Repo): Promise<SpotifyTrack> => {
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('spotify_liked_tracks') : null;
    const liked: SpotifyTrack[] | null = stored ? JSON.parse(stored) : null;

    const charSum = repo.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const source = liked && liked.length > 0 ? liked : LIKED_SONGS_FALLBACK;
    const baseTrack = source[charSum % source.length];

    const bpm = Math.min(180, Math.max(60, baseTrack.bpm + (repo.commits / 20)));
    
    return {
      ...baseTrack,
      name: repo.stars > 500 ? `${baseTrack.name} (Legendary Mix)` : baseTrack.name,
      bpm
    };
  } catch (error) {
    console.warn('Spotify fetch failed, using random liked song fallback');
    return LIKED_SONGS_FALLBACK[Math.floor(Math.random() * LIKED_SONGS_FALLBACK.length)];
  }
};
