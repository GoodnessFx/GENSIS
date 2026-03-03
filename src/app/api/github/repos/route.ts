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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  const token = await getToken({ req: req as any });

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const cacheKey = `gh:repos:${username}`;
  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached) return NextResponse.json(cached);
  }

  const headers: Record<string, string> = {
    "User-Agent": "genesis-app",
    Accept: "application/vnd.github+json",
  };
  if (token?.githubAccessToken) {
    headers.Authorization = `Bearer ${token.githubAccessToken}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
    { headers, next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub fetch failed" }, { status: res.status });
  }
  const data = await res.json();
  if (redis) await redis.set(cacheKey, data, { ex: 60 * 60 * 24 });
  return NextResponse.json(data);
}

