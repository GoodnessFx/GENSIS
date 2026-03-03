'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { exchangeCodeForToken, fetchLikedTracks, fetchSpotifyProfile } from '@/lib/spotifyAuth';
import { useExperienceStore } from '@/store/useExperienceStore';

export default function SpotifyCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const setSpotifyUser = useExperienceStore(s => s.setSpotifyUser);
  const setSpotifyData = useExperienceStore(s => s.setSpotifyData);

  useEffect(() => {
    const code = params.get('code');
    if (!code) return;
    const run = async () => {
      try {
        const access = await exchangeCodeForToken(code);
        const profile = await fetchSpotifyProfile(access);
        setSpotifyUser(profile.display_name || profile.id || 'Spotify User');
        const tracks = await fetchLikedTracks(access);
        setSpotifyData(tracks);
        router.replace('/');
      } catch (e) {
        console.error(e);
        router.replace('/');
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <p className="text-sm opacity-60">Connecting to Spotify…</p>
      </div>
    </div>
  );
}

