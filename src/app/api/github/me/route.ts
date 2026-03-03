import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
  const token = await getToken({ req: req as any });
  if (!token?.githubAccessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token.githubAccessToken}`,
      "User-Agent": "genesis-app",
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    return NextResponse.json({ error: "GitHub me failed" }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ login: data.login, name: data.name, id: data.id });
}

