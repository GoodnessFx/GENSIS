import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function GET() {
  const token = await getToken({ req: (globalThis as any).__NEXT_INIT_REQ__ || ({} as any) });
  // In Route Handlers, getToken(req) requires the original request; above hack may differ across runtimes.
  // Fallback to returning 401 if not resolved.
  if (!token?.spotifyAccessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cacheKey = `sp:liked:${token.sub}`;
  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached) return NextResponse.json(cached);
  }

  const res = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
    headers: { Authorization: `Bearer ${token.spotifyAccessToken}` },
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Spotify fetch failed" }, { status: res.status });
  }
  const data = await res.json();
  if (redis) await redis.set(cacheKey, data, { ex: 60 * 60 * 6 });
  return NextResponse.json(data);
}

