import { NextResponse } from 'next/server';
import { getUserFromAccessToken, supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  const access = auth.slice('Bearer '.length);
  try {
    const user = await getUserFromAccessToken(access);
    const uid = user.id;
    await supabaseAdmin.from('reminders').delete().eq('owner', uid);
    await supabaseAdmin.from('item_tags').delete().filter('item', 'in', supabaseAdmin.from('items').select('id').eq('owner', uid) as any);
    await supabaseAdmin.from('items').delete().eq('owner', uid);
    await supabaseAdmin.from('tags').delete().eq('owner', uid);
    await supabaseAdmin.from('profiles').delete().eq('id', uid);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

