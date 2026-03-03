import { NextResponse } from 'next/server';
import { getUserFromAccessToken, supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 401 });
  }
  const accessToken = auth.slice('Bearer '.length);
  try {
    const user = await getUserFromAccessToken(accessToken);
    const id = user.id;
    const xIdentity =
      (user.identities || []).find((i: any) => i.provider === 'twitter') ||
      user.user_metadata?.provider === 'twitter'
        ? user.user_metadata
        : null;
    const x_user_id =
      (xIdentity && (xIdentity.user_id || xIdentity.sub)) ||
      user.identities?.find((i: any) => i.provider === 'twitter')?.identity_data?.user_id ||
      null;
    const display_name = user.user_metadata?.name || user.email || 'User';
    const avatar_url = user.user_metadata?.avatar_url || null;
    const { error } = await supabaseAdmin
      .from('profiles')
      .upsert(
        { id, x_user_id, display_name, avatar_url, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      );
    if (error) throw error;
    return NextResponse.json({ ok: true, id, x_user_id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

