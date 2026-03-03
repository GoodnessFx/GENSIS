import { NextResponse } from "next/server";

const API = "https://api.twitter.com/2";

async function fetchPage(userId: string, token: string, pagination_token?: string) {
  const params = new URLSearchParams({
    "max_results": "100",
    "tweet.fields": "created_at,entities,public_metrics,attachments",
    "expansions": "attachments.media_keys,author_id",
    "media.fields": "type,preview_image_url,url,width,height,alt_text",
  });
  if (pagination_token) params.set("pagination_token", pagination_token);
  const url = `${API}/users/${userId}/bookmarks?${params.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`X API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }
  const token = process.env.TWITTER_BEARER_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Server is not configured for X ingestion" }, { status: 503 });
  }
  let items: any[] = [];
  let next: string | undefined = undefined;
  let pages = 0;
  try {
    do {
      const data = await fetchPage(userId, token, next);
      items = items.concat(data.data || []);
      next = data.meta?.next_token;
      pages++;
      // Basic rate control
      if (next) await new Promise(r => setTimeout(r, 400));
    } while (next && pages < 50);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
  return NextResponse.json({ count: items.length, items });
}

