'use client';

import { useState } from 'react';
import supabase from '@/lib/supabase/client';

export default function SettingsPage() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const withToken = async (fn: (access: string, uid: string) => Promise<void>) => {
    if (!supabase) return setMsg('Supabase not configured');
    const { data } = await supabase.auth.getSession();
    const access = data.session?.access_token;
    const uid = data.session?.user?.id as string | undefined;
    if (!access || !uid) return setMsg('Please sign in at /supabase/login first');
    await fn(access, uid);
  };

  const refreshBookmarks = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await withToken(async (_access, uid) => {
        const userId = prompt('Enter your X user_id to sync bookmarks');
        if (!userId) throw new Error('Missing X user_id');
        const res = await fetch(`/api/x/bookmarks?user_id=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error('Failed to fetch bookmarks');
        const json = await res.json();
        const ingest = await fetch('/api/x/ingest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ owner: uid, items: json.items || [] }),
        });
        if (!ingest.ok) throw new Error('Failed to save bookmarks');
        setMsg(`Synced ${json.count} items`);
      });
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  const exportData = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/settings/export');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'genesis-export.json';
      a.click();
      URL.revokeObjectURL(url);
      setMsg('Exported data');
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  const deleteAll = async () => {
    if (!confirm('This permanently deletes all your data. Continue?')) return;
    setBusy(true);
    setMsg(null);
    try {
      await withToken(async (access) => {
        const res = await fetch('/api/settings/delete', { method: 'POST', headers: { Authorization: `Bearer ${access}` } });
        if (!res.ok) throw new Error('Delete failed');
        setMsg('All data deleted');
      });
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10">
        <h1 className="text-2xl tracking-[0.3em] font-title uppercase">Settings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={refreshBookmarks} disabled={busy} className="py-4 rounded-2xl bg-white text-black tracking-[0.2em]">
            Refresh X Bookmarks
          </button>
          <button onClick={exportData} disabled={busy} className="py-4 rounded-2xl bg-white/10 border border-white/20">
            Export Data
          </button>
          <button onClick={() => (window.location.href = '/supabase/login')} className="py-4 rounded-2xl bg-white/10 border border-white/20">
            Supabase Login
          </button>
          <button onClick={deleteAll} disabled={busy} className="py-4 rounded-2xl bg-red-600/90">
            Delete All Data
          </button>
        </div>
        {msg && <p className="text-sm text-white/70">{msg}</p>}
      </div>
    </div>
  );
}

