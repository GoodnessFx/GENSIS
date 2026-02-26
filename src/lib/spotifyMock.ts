'use client';

export const getMockTrack = (repo: any) => {
  // Logic to determine mood/genre based on repo
  const lang = repo.language?.toLowerCase();
  let genre = 'Electronic';
  let bpm = 120;
  let mood = 'Energetic';

  if (lang === 'python') {
    genre = 'Ambient/Jazz';
    bpm = 90;
    mood = 'Focused';
  } else if (lang === 'javascript') {
    genre = 'Pop/Indie';
    bpm = 128;
    mood = 'Bouncy';
  } else if (lang === 'rust') {
    genre = 'Industrial';
    bpm = 140;
    mood = 'Brutal';
  } else if (lang === 'solidity') {
    genre = 'Dark Techno';
    bpm = 135;
    mood = 'Mysterious';
  }

  // Calculate BPM based on commits
  bpm = Math.min(180, Math.max(60, 80 + (repo.commits / 10)));

  return {
    name: `The Sound of ${repo.name}`,
    artist: 'GENESIS AI',
    genre,
    bpm,
    mood,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Placeholder
  };
};
