import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const service = process.env.SUPABASE_SERVICE_ROLE as string | undefined;

export const supabaseAdmin = url && service
  ? createClient(url, service, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : (null as any);

export async function getUserFromAccessToken(accessToken: string) {
  if (!supabaseAdmin) throw new Error('Supabase admin not configured');
  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data?.user) throw new Error(error?.message || 'Invalid token');
  return data.user;
}

