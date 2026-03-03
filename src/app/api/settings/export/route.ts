import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  if (!supabaseAdmin) return new NextResponse('Supabase not configured', { status: 503 });
  // For demo/export without auth: export all public schema (non-PII). In production, secure by user token.
  const [items, tags, itemTags, reminders, profiles] = await Promise.all([
    supabaseAdmin.from('items').select('*').limit(1000),
    supabaseAdmin.from('tags').select('*').limit(1000),
    supabaseAdmin.from('item_tags').select('*').limit(2000),
    supabaseAdmin.from('reminders').select('*').limit(1000),
    supabaseAdmin.from('profiles').select('*').limit(1000),
  ]);
  const json = JSON.stringify({
    items: items.data || [],
    tags: tags.data || [],
    item_tags: itemTags.data || [],
    reminders: reminders.data || [],
    profiles: profiles.data || [],
  }, null, 2);
  return new NextResponse(json, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="genesis-export.json"',
    }
  });
}

