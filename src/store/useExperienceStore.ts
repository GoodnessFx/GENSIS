import { create } from 'zustand';

interface Repo {
  id: string;
  name: string;
  language: string;
  stars: number;
  commits: number;
  date: string;
  abandoned: boolean;
  code?: string;
}

interface ExperienceState {
  isStarted: boolean;
  isPlaying: boolean;
  isEnding: boolean;
  progress: number;
  playbackSpeed: number;
  githubData: Repo[] | null;
  spotifyData: any | null;
  currentYear: number;
  milestones: string[];
  
  setStarted: (started: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setEnding: (ending: boolean) => void;
  setProgress: (progress: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setGithubData: (data: Repo[]) => void;
  setSpotifyData: (data: any) => void;
  setCurrentYear: (year: number) => void;
  addMilestone: (milestone: string) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  isStarted: false,
  isPlaying: false,
  isEnding: false,
  progress: 0,
  playbackSpeed: 1,
  githubData: null,
  spotifyData: null,
  currentYear: new Date().getFullYear(),
  milestones: [],

  setStarted: (isStarted) => set({ isStarted }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setEnding: (isEnding) => set({ isEnding }),
  setProgress: (progress) => {
    if (progress >= 1 && !useExperienceStore.getState().isEnding) {
      set({ progress: 1, isEnding: true, isPlaying: false });
    } else {
      set({ progress });
    }
  },
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
  setGithubData: (githubData) => set({ githubData }),
  setSpotifyData: (spotifyData) => set({ spotifyData }),
  setCurrentYear: (currentYear) => set({ currentYear }),
  addMilestone: (milestone) => set((state) => ({ 
    milestones: [...state.milestones.slice(-2), milestone] 
  })),
}));
