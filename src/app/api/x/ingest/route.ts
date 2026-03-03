import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

function normalizeTweet(t: any) {
  const title = (t.text || '').slice(0, 120);
  const content = t.text || '';
  const media = t.attachments?.media_keys || [];
  return { title, content, media, raw: t };
}

export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const { owner, items } = body as { owner: string; items: any[] };
  if (!owner || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Missing owner or items' }, { status: 400 });
  }
  const rows = items.map((t) => {
    const n = normalizeTweet(t);
    return {
      owner,
      source: 'x',
      title: n.title,
      content: n.content,
      media: n.media,
      raw: n.raw,
    };
  });
  const { error } = await supabaseAdmin.from('items').insert(rows, { returning: 'minimal' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, inserted: rows.length });
}

