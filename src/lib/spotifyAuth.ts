import { SpotifyTrack } from './spotifyService';

const BASE = 'https://accounts.spotify.com';

const enc = (str: string) => new TextEncoder().encode(str);

const sha256 = async (plain: string) => {
  const data = enc(plain);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const randomString = (length = 64) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (dec) => ('0' + dec.toString(16)).slice(-2)).join('');
};

export const startSpotifyAuth = async () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  if (!clientId) {
    alert('Missing NEXT_PUBLIC_SPOTIFY_CLIENT_ID');
    return;
  }
  const verifier = randomString(64);
  const challenge = await sha256(verifier);
  const state = randomString(16);
  localStorage.setItem('spotify_pkce_verifier', verifier);
  localStorage.setItem('spotify_oauth_state', state);
  const redirectUri = `${window.location.origin}/auth/spotify/callback`;
  const scopes = [
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'user-library-read',
  ].join(' ');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    state,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });
  window.location.href = `${BASE}/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string) => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const verifier = localStorage.getItem('spotify_pkce_verifier') || '';
  const redirectUri = `${window.location.origin}/auth/spotify/callback`;
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });
  const res = await fetch(`${BASE}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error('Token exchange failed');
  const data = await res.json();
  const expiry = Date.now() + data.expires_in * 1000;
  localStorage.setItem('spotify_access_token', data.access_token);
  localStorage.setItem('spotify_refresh_token', data.refresh_token || '');
  localStorage.setItem('spotify_access_expiry', String(expiry));
  return data.access_token as string;
};

export const getStoredAccessToken = (): string | null => {
  const token = localStorage.getItem('spotify_access_token');
  const expiry = parseInt(localStorage.getItem('spotify_access_expiry') || '0', 10);
  if (!token || !expiry || Date.now() > expiry) return null;
  return token;
};

export const fetchSpotifyProfile = async (accessToken: string) => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Profile fetch failed');
  return res.json();
};

export const fetchLikedTracks = async (accessToken: string) => {
  const tracks: SpotifyTrack[] = [];
  const res = await fetch('https://api.spotify.com/v1/me/tracks?limit=20', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Liked tracks fetch failed');
  const data = await res.json();
  for (const item of data.items || []) {
    const t = item.track;
    tracks.push({
      id: t.id,
      name: t.name,
      artist: (t.artists?.[0]?.name as string) || 'Unknown',
      genre: 'Unknown',
      bpm: 120,
      mood: 'Mixed',
      albumArt: t.album?.images?.[0]?.url,
      previewUrl: t.preview_url || undefined,
    });
  }
  localStorage.setItem('spotify_liked_tracks', JSON.stringify(tracks));
  return tracks;
};

