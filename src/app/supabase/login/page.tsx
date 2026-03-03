'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase/client';

export default function SupabaseLoginPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const initProfile = async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      const access = data.session?.access_token;
      if (access) {
        await fetch('/api/supabase/profile/init', {
          method: 'POST',
          headers: { Authorization: `Bearer ${access}` },
        });
      }
    };
    initProfile();
  }, []);

  const signInWithX = async () => {
    if (!supabase) return alert('Supabase env missing');
    await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/supabase/login` : undefined,
        queryParams: { code_challenge_method: 's256' },
      },
    });
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    alert('Signed out');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10">
        <h1 className="text-2xl tracking-[0.3em] font-title uppercase text-center">Supabase Auth</h1>
        <button
          onClick={signInWithX}
          className="w-full py-4 rounded-2xl bg-white text-black tracking-[0.2em]"
        >
          Sign in with X (Twitter)
        </button>
        <button
          onClick={signOut}
          className="w-full py-3 rounded-2xl bg-white/10 border border-white/20"
        >
          Sign out
        </button>
        {!ready && <p className="text-sm text-white/50">Loading…</p>}
      </div>
    </div>
  );
}
