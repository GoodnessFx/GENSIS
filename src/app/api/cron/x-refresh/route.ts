import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  const key = req.headers.get('x-cron-secret');
  if (key !== process.env.CRON_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // This is a placeholder to iterate all profiles and refresh ingest.
  // In production, you’d page through profiles and call your X ingest logic per profile.x_user_id.
  return NextResponse.json({ ok: true, queued: 0 });
}

