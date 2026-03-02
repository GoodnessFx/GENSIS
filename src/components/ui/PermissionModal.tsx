'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Github, Music, Info } from 'lucide-react';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGrant: () => void;
  type: 'github' | 'spotify';
}

export const PermissionModal = ({ isOpen, onClose, onGrant, type }: PermissionModalProps) => {
  const isGithub = type === 'github';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isGithub ? 'bg-white text-black' : 'bg-[#1DB954] text-white'}`}>
                  {isGithub ? <Github className="w-6 h-6" /> : <Music className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-title tracking-widest text-white uppercase leading-none">Permission</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-2">Authorization Required</p>
                </div>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-white font-medium">Read-Only Access</p>
                    <p className="text-sm text-zinc-500">Genesis only requires read access to your {isGithub ? 'public repositories and contribution history' : 'top tracks and playback history'}.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Info className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-white font-medium">Privacy Guaranteed</p>
                    <p className="text-sm text-zinc-500">No data is stored on our servers. All cinematic processing happens live in your browser.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-3">
                <p className="text-[10px] font-title text-zinc-500 uppercase tracking-widest">Requested Scopes</p>
                <ul className="text-xs text-zinc-400 space-y-2 font-mono">
                  {isGithub ? (
                    <>
                      <li>• user:read</li>
                      <li>• repo:status</li>
                      <li>• public_repo</li>
                    </>
                  ) : (
                    <>
                      <li>• user-read-recently-played</li>
                      <li>• user-top-read</li>
                      <li>• playlist-read-private</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5 flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 py-4 rounded-xl border border-white/10 text-white font-title text-[10px] tracking-widest uppercase hover:bg-white/5 transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={onGrant}
                className={`flex-1 py-4 rounded-xl font-title text-[10px] tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98] ${isGithub ? 'bg-white text-black' : 'bg-[#1DB954] text-white shadow-[0_0_30px_rgba(29,185,84,0.3)]'}`}
              >
                Authorize {isGithub ? 'GitHub' : 'Spotify'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
