'use client';

import { Github, Music, Play, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useExperienceStore } from '@/store/useExperienceStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PermissionModal } from './PermissionModal';
import { fetchGithubData } from '@/lib/githubService';
import { signIn, useSession } from 'next-auth/react';
import Hero from '@/components/ui/animated-shader-hero';

export const HeroOverlay = () => {
  const { setStarted, githubUser, setGithubUser, spotifyUser, setSpotifyUser } = useExperienceStore();
  const { data: session } = useSession();
  const [isConnectingGithub, setIsConnectingGithub] = useState(false);
  const [isConnectingSpotify, setIsConnectingSpotify] = useState(false);
  
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncProgressStatus] = useState('');

  const handleGrantGithub = async () => {
    setShowGithubModal(false);
    setIsConnectingGithub(true);
    setSyncProgressStatus('Redirecting to GitHub…');
    try {
      await new Promise(r => setTimeout(r, 200));
      await signIn('github');
    } catch (e) {
      console.error(e);
      setIsConnectingGithub(false);
      setSyncProgress(0);
      alert('Failed to start GitHub auth.');
    }
  };

  const handleGrantSpotify = async () => {
    setShowSpotifyModal(false);
    setIsConnectingSpotify(true);
    setSyncProgressStatus('Redirecting to Spotify…');
    try {
      await new Promise(r => setTimeout(r, 300));
      await signIn('spotify');
    } catch (e) {
      console.error(e);
      setIsConnectingSpotify(false);
      setSyncProgress(0);
      alert('Failed to start Spotify auth. Check client ID.');
    }
  };

  const canInitiate = githubUser && spotifyUser;

  useEffect(() => {
    const init = async () => {
      if (!githubUser) {
        const me = await fetch('/api/github/me');
        if (me.ok) {
          const { login } = await me.json();
          setGithubUser(login);
          const repos = await fetchGithubData(login);
          useExperienceStore.getState().setGithubData(repos);
        }
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleWatchDemo = async () => {
    try {
      const demo = 'torvalds';
      setSyncProgressStatus('Loading Demo Profile…');
      setIsConnectingGithub(true);
      const repos = await fetchGithubData(demo);
      useExperienceStore.getState().setGithubData(repos);
      setGithubUser(demo);
      setSpotifyUser('Demo');
      setSyncProgress(100);
      setStarted(true);
    } catch (e) {
      console.error(e);
      alert('Failed to load demo profile.');
    } finally {
      setIsConnectingGithub(false);
      setSyncProgress(0);
    }
  };
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 backdrop-blur-[120px] transition-all duration-1500 overflow-hidden font-sans">
      <Hero backgroundOnly className="absolute inset-0 z-0 pointer-events-none" />

      <div className="max-w-7xl w-full px-6 sm:px-10 lg:px-16 text-center space-y-24 md:space-y-36 z-10 py-16 md:py-24">
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-[12rem] md:text-[18rem] lg:text-[22rem] font-bold tracking-[-0.06em] text-white font-accent leading-[0.7] glow-text select-none">
              GENESIS
            </h1>
            <p className="mt-6 text-2xl md:text-3xl text-white/60 font-light tracking-[0.6em] uppercase">
              Every line of code tells a story. Every beat defines an era.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6"
          >
            <button
              onClick={() => signIn('github')}
              className="px-8 py-4 rounded-2xl font-title tracking-[0.6em] bg-white text-black hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            >
              BEGIN YOUR JOURNEY
            </button>
            <button
              onClick={handleWatchDemo}
              className="px-8 py-4 rounded-2xl font-title tracking-[0.6em] bg-white/10 text-white border border-white/20 hover:scale-[1.02] transition-all"
            >
              WATCH DEMO
            </button>
          </motion.div>
        </div>
        
        {/* Connection Phase - Professional Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 xl:gap-24 max-w-7xl mx-auto items-stretch relative">
          
          {/* GitHub Connection */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className={`group relative p-10 md:p-16 xl:p-20 rounded-[2rem] md:rounded-[3.5rem] xl:rounded-[4rem] border ring-1 ring-white/10 transition-all duration-700 flex flex-col justify-between gap-10 md:gap-16 overflow-hidden ${githubUser ? 'bg-white/[0.05] border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.05)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
          >
            <div className="space-y-16 text-left relative z-10">
              <div className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center transition-all duration-700 rotate-[-3deg] group-hover:rotate-0 ${githubUser ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/30'}`}>
                {githubUser ? <CheckCircle2 className="w-18 h-18" /> : <Github className="w-18 h-18" />}
              </div>
              <div className="space-y-10">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-title tracking-[0.2em] uppercase text-white leading-tight">Source<br/>Archive</h3>
                <p className="text-base md:text-lg text-zinc-400 font-sans tracking-[0.1em] leading-relaxed uppercase opacity-60 max-w-[460px]">Synchronize your repository history to architect the timeline.</p>
              </div>
            </div>

            {isConnectingGithub ? (
              <div className="space-y-10 relative z-10">
                <div className="flex justify-between text-[14px] font-title tracking-[0.2em] text-white/40 uppercase">
                  <span>{syncStatus}</span>
                  <span>{syncProgress}%</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowGithubModal(true)}
                disabled={!!githubUser}
                className={`w-full py-6 md:py-8 rounded-2xl md:rounded-3xl font-title text-[12px] md:text-[14px] tracking-[0.6em] md:tracking-[0.8em] uppercase transition-all duration-500 relative z-10 ${githubUser ? 'text-green-500 border border-green-500/30 bg-green-500/5 cursor-default' : 'bg-white text-black hover:scale-[1.02] active:scale-98 shadow-[0_0_40px_rgba(255,255,255,0.08)]'}`}
              >
                {githubUser ? 'ARCHIVE SYNCHRONIZED' : 'LINK REPOSITORIES'}
              </button>
            )}
            
            {/* Subtle background glow for connected state */}
            {githubUser && <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[150px]" />}
          </motion.div>

          {/* Spotify Connection */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className={`group relative p-10 md:p-16 xl:p-20 rounded-[2rem] md:rounded-[3.5rem] xl:rounded-[4rem] border ring-1 ring-white/10 transition-all duration-700 flex flex-col justify-between gap-10 md:gap-16 overflow-hidden ${spotifyUser ? 'bg-[#1DB954]/[0.05] border-[#1DB954]/20 shadow-[0_0_80px_rgba(29,185,84,0.06)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
          >
            <div className="space-y-16 text-left relative z-10">
              <div className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center transition-all duration-700 rotate-[3deg] group-hover:rotate-0 ${spotifyUser ? 'bg-[#1DB954] text-white shadow-[0_0_30px_rgba(29,185,84,0.3)]' : 'bg-white/5 text-white/30'}`}>
                {spotifyUser ? <CheckCircle2 className="w-18 h-18" /> : <Music className="w-18 h-18" />}
              </div>
              <div className="space-y-10">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-title tracking-[0.2em] uppercase text-white leading-tight">Audio<br/>Mapping</h3>
                <p className="text-base md:text-lg text-zinc-400 font-sans tracking-[0.1em] leading-relaxed uppercase opacity-60 max-w-[460px]">Authorize audio streaming to score your development journey.</p>
              </div>
            </div>

            {isConnectingSpotify ? (
              <div className="space-y-10 relative z-10">
                <div className="flex justify-between text-[14px] font-title tracking-[0.2em] text-[#1DB954]/60 uppercase">
                  <span>{syncStatus}</span>
                  <span>{syncProgress}%</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#1DB954] rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowSpotifyModal(true)}
                disabled={!!spotifyUser}
                className={`w-full py-6 md:py-8 rounded-2xl md:rounded-3xl font-title text-[12px] md:text-[14px] tracking-[0.6em] md:tracking-[0.8em] uppercase transition-all duration-500 relative z-10 ${spotifyUser ? 'text-[#1DB954] border border-[#1DB954]/30 bg-[#1DB954]/5 cursor-default' : 'bg-white text-black hover:scale-[1.02] active:scale-98 shadow-[0_0_40px_rgba(255,255,255,0.08)]'}`}
              >
                {spotifyUser ? 'SOUNDTRACK MAPPED' : 'LINK SOUNDTRACK'}
              </button>
            )}

            {/* Subtle background glow for connected state */}
            {spotifyUser && <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-[#1DB954]/10 rounded-full blur-[150px]" />}
          </motion.div>
        </div>

        {/* Initiation Section - Play Your Genesis */}
        <div className="h-[30rem] flex flex-col items-center justify-center">
          <AnimatePresence>
            {canInitiate && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(50px)' }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-24 flex flex-col items-center"
              >
                <button 
                  onClick={() => setStarted(true)}
                  className="glow-button group relative flex items-center justify-center gap-16 bg-white text-black px-40 py-16 rounded-full font-title font-bold text-3xl tracking-[1.2em] overflow-hidden max-w-[95vw]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <Play className="w-14 h-14 fill-current shrink-0 group-hover:scale-110 transition-transform duration-700 relative z-10" />
                  <span className="relative z-10 pl-[1.2em] whitespace-nowrap">PLAY YOUR GENESIS</span>
                  
                  {/* Floating sparkles */}
                  <Sparkles className="absolute right-16 top-1/2 -translate-y-1/2 w-8 h-8 text-black/20 group-hover:text-black/40 transition-colors animate-pulse" />
                </button>
                <div className="flex flex-col items-center gap-10">
                  <p className="text-[15px] font-title tracking-[2em] text-white/20 uppercase animate-pulse pl-[2em]">Neural Synchronization Complete</p>
                  <div className="h-px w-[30rem] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
