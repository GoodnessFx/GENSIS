'use client';

import { Github, Music, Play, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useExperienceStore } from '@/store/useExperienceStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PermissionModal } from './PermissionModal';

export const HeroOverlay = () => {
  const { setStarted, githubUser, setGithubUser, spotifyUser, setSpotifyUser } = useExperienceStore();
  const [isConnectingGithub, setIsConnectingGithub] = useState(false);
  const [isConnectingSpotify, setIsConnectingSpotify] = useState(false);
  
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncProgressStatus] = useState('');

  const handleGrantGithub = async () => {
    setShowGithubModal(false);
    setIsConnectingGithub(true);
    setSyncProgressStatus('Accessing Archive...');
    
    // Simulate multi-step progress
    for (let i = 0; i <= 100; i += 5) {
      setSyncProgress(i);
      if (i === 40) setSyncProgressStatus('Analyzing Contributions...');
      if (i === 80) setSyncProgressStatus('Finalizing Monuments...');
      await new Promise(r => setTimeout(r, 100));
    }
    
    setGithubUser('GoodnessFx');
    setIsConnectingGithub(false);
    setSyncProgress(0);
  };

  const handleGrantSpotify = async () => {
    setShowSpotifyModal(false);
    setIsConnectingSpotify(true);
    setSyncProgressStatus('Mapping Audio...');
    
    for (let i = 0; i <= 100; i += 4) {
      setSyncProgress(i);
      if (i === 50) setSyncProgressStatus('Fetching Personal Hits...');
      await new Promise(r => setTimeout(r, 80));
    }
    
    setSpotifyUser('UserAccount');
    setIsConnectingSpotify(false);
    setSyncProgress(0);
  };

  const canInitiate = githubUser && spotifyUser;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 backdrop-blur-[120px] transition-all duration-1500 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl w-full px-16 text-center space-y-24 z-10">
        
        {/* Cinematic Title Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-4 text-white/20">
              <div className="h-px w-12 bg-current" />
              <span className="text-[10px] font-title tracking-[1.5em] uppercase whitespace-nowrap">A Living Archive</span>
              <div className="h-px w-12 bg-current" />
            </div>
            <h1 className="text-[12rem] md:text-[18rem] lg:text-[22rem] font-bold tracking-[-0.08em] text-white font-accent leading-[0.8] glow-text select-none">
              GENESIS
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xl md:text-2xl text-zinc-500 font-light tracking-[0.3em] max-w-4xl mx-auto uppercase">
              Every line of code tells a story. Every beat defines an era.
            </p>
          </motion.div>
        </div>
        
        {/* Connection Phase - Professional Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch relative">
          
          {/* GitHub Connection */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className={`group relative p-14 rounded-[3.5rem] border transition-all duration-1000 flex flex-col justify-between gap-12 overflow-hidden ${githubUser ? 'bg-white/[0.05] border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
          >
            <div className="space-y-10 text-left relative z-10">
              <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-1000 rotate-[-5deg] group-hover:rotate-0 ${githubUser ? 'bg-white text-black' : 'bg-white/5 text-white/30'}`}>
                {githubUser ? <CheckCircle2 className="w-12 h-12" /> : <Github className="w-12 h-12" />}
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-title tracking-[0.2em] uppercase text-white leading-none">Source Archive</h3>
                <p className="text-sm text-zinc-500 font-sans tracking-[0.1em] leading-relaxed uppercase opacity-50 max-w-[280px]">Synchronize your repository history to architect the timeline.</p>
              </div>
            </div>

            {isConnectingGithub ? (
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between text-[10px] font-title tracking-widest text-white/40 uppercase">
                  <span>{syncStatus}</span>
                  <span>{syncProgress}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white" 
                    initial={{ width: 0 }}
                    animate={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowGithubModal(true)}
                disabled={!!githubUser}
                className={`w-full py-7 rounded-2xl font-title text-[11px] tracking-[0.5em] uppercase transition-all duration-700 relative z-10 ${githubUser ? 'text-green-500/60 border border-green-500/20 bg-green-500/5 cursor-default' : 'bg-white text-black hover:scale-[1.02] active:scale-98 shadow-2xl shadow-white/5'}`}
              >
                {githubUser ? 'ARCHIVE SYNCHRONIZED' : 'LINK REPOSITORIES'}
              </button>
            )}
            
            {/* Subtle background glow for connected state */}
            {githubUser && <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />}
          </motion.div>

          {/* Spotify Connection */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className={`group relative p-14 rounded-[3.5rem] border transition-all duration-1000 flex flex-col justify-between gap-12 overflow-hidden ${spotifyUser ? 'bg-[#1DB954]/[0.05] border-[#1DB954]/20 shadow-[0_0_50px_rgba(29,185,84,0.05)]' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
          >
            <div className="space-y-10 text-left relative z-10">
              <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-1000 rotate-[5deg] group-hover:rotate-0 ${spotifyUser ? 'bg-[#1DB954] text-white' : 'bg-white/5 text-white/30'}`}>
                {spotifyUser ? <CheckCircle2 className="w-12 h-12" /> : <Music className="w-12 h-12" />}
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-title tracking-[0.2em] uppercase text-white leading-none">Audio Mapping</h3>
                <p className="text-sm text-zinc-500 font-sans tracking-[0.1em] leading-relaxed uppercase opacity-50 max-w-[280px]">Authorize audio streaming to score your development journey.</p>
              </div>
            </div>

            {isConnectingSpotify ? (
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between text-[10px] font-title tracking-widest text-[#1DB954]/60 uppercase">
                  <span>{syncStatus}</span>
                  <span>{syncProgress}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#1DB954]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowSpotifyModal(true)}
                disabled={!!spotifyUser}
                className={`w-full py-7 rounded-2xl font-title text-[11px] tracking-[0.5em] uppercase transition-all duration-700 relative z-10 ${spotifyUser ? 'text-[#1DB954]/60 border border-[#1DB954]/20 bg-[#1DB954]/5 cursor-default' : 'bg-white text-black hover:scale-[1.02] active:scale-98 shadow-2xl shadow-white/5'}`}
              >
                {spotifyUser ? 'SOUNDTRACK MAPPED' : 'LINK SOUNDTRACK'}
              </button>
            )}

            {/* Subtle background glow for connected state */}
            {spotifyUser && <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1DB954]/10 rounded-full blur-[80px]" />}
          </motion.div>
        </div>

        {/* Initiation Section - Play Your Genesis */}
        <div className="h-64 flex flex-col items-center justify-center">
          <AnimatePresence>
            {canInitiate && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(50px)' }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12 flex flex-col items-center"
              >
                <button 
                  onClick={() => setStarted(true)}
                  className="glow-button group relative flex items-center justify-center gap-14 bg-white text-black px-40 py-14 rounded-full font-title font-bold text-2xl tracking-[1em] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <Play className="w-12 h-12 fill-current shrink-0 group-hover:scale-110 transition-transform duration-700 relative z-10" />
                  <span className="relative z-10 translate-x-2">PLAY YOUR GENESIS</span>
                  
                  {/* Floating sparkles */}
                  <Sparkles className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 text-black/20 group-hover:text-black/40 transition-colors animate-pulse" />
                </button>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-[11px] font-title tracking-[1.2em] text-white/20 uppercase animate-pulse">Neural Synchronization Complete</p>
                  <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Modals */}
      <PermissionModal 
        isOpen={showGithubModal} 
        onClose={() => setShowGithubModal(false)} 
        onGrant={handleGrantGithub} 
        type="github" 
      />
      <PermissionModal 
        isOpen={showSpotifyModal} 
        onClose={() => setShowSpotifyModal(false)} 
        onGrant={handleGrantSpotify} 
        type="spotify" 
      />
    </div>
  );
};
