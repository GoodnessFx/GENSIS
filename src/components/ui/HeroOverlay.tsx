'use client';

import { Github, Music, Play, CheckCircle2, Loader2 } from 'lucide-react';
import { useExperienceStore } from '@/store/useExperienceStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroOverlay = () => {
  const { setStarted, githubUser, setGithubUser, spotifyUser, setSpotifyUser } = useExperienceStore();
  const [isConnectingGithub, setIsConnectingGithub] = useState(false);
  const [isConnectingSpotify, setIsConnectingSpotify] = useState(false);

  const handleConnectGithub = async () => {
    setIsConnectingGithub(true);
    // Simulate real-time retrieval with progress
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGithubUser('GoodnessFx');
    setIsConnectingGithub(false);
  };

  const handleConnectSpotify = async () => {
    setIsConnectingSpotify(true);
    // Simulate real-time auth and liked songs fetch
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSpotifyUser('UserAccount');
    setIsConnectingSpotify(false);
  };

  const canInitiate = githubUser && spotifyUser;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-blur-[100px] transition-all duration-1500 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] opacity-50" />
      </div>

      <div className="max-w-7xl w-full px-12 text-center space-y-32 z-10">
        
        {/* Cinematic Title Section */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="text-[11px] font-title tracking-[1.2em] text-white/20 uppercase block">A Visual Narrative of Creation</span>
            <h1 className="text-[14rem] md:text-[20rem] font-bold tracking-[-0.06em] text-white font-accent leading-[0.85] glow-text select-none">
              GENESIS
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.5 }}
            className="text-2xl text-zinc-600 font-light tracking-[0.2em] max-w-4xl mx-auto leading-relaxed font-sans uppercase"
          >
            Every line of code tells a story. Every beat defines an era.
          </motion.p>
        </div>
        
        {/* Connection Phase - Perfectly Aligned Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto items-stretch">
          {/* GitHub Connection */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className={`group relative p-12 rounded-[3rem] border transition-all duration-1000 flex flex-col justify-between gap-10 ${githubUser ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
          >
            <div className="space-y-8 text-left">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ${githubUser ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>
                {githubUser ? <CheckCircle2 className="w-10 h-10" /> : <Github className="w-10 h-10" />}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-title tracking-[0.3em] uppercase text-white leading-none">Source Archive</h3>
                <p className="text-sm text-zinc-500 font-sans tracking-widest leading-relaxed uppercase opacity-60">Synchronize your repository history to architect the timeline.</p>
              </div>
            </div>
            <button 
              onClick={handleConnectGithub}
              disabled={!!githubUser || isConnectingGithub}
              className={`w-full py-6 rounded-full font-title text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${githubUser ? 'text-white/40 border border-white/10 cursor-default' : 'bg-white text-black hover:scale-[1.02] active:scale-98 shadow-2xl shadow-white/5'}`}
            >
              {isConnectingGithub ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (githubUser ? 'ARCHIVE LINKED' : 'LINK REPOSITORIES')}
            </button>
          </motion.div>

          {/* Spotify Connection */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className={`group relative p-12 rounded-[3rem] border transition-all duration-1000 flex flex-col justify-between gap-10 ${spotifyUser ? 'bg-white/[0.04] border-white/20' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
          >
            <div className="space-y-8 text-left">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ${spotifyUser ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>
                {spotifyUser ? <CheckCircle2 className="w-10 h-10" /> : <Music className="w-10 h-10" />}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-title tracking-[0.3em] uppercase text-white leading-none">Audio Mapping</h3>
                <p className="text-sm text-zinc-500 font-sans tracking-widest leading-relaxed uppercase opacity-60">Authorize audio streaming to score your development journey.</p>
              </div>
            </div>
            <button 
              onClick={handleConnectSpotify}
              disabled={!!spotifyUser || isConnectingSpotify}
              className={`w-full py-6 rounded-full font-title text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${spotifyUser ? 'text-white/40 border border-white/10 cursor-default' : 'bg-white text-black hover:scale-[1.02] active:scale-98 shadow-2xl shadow-white/5'}`}
            >
              {isConnectingSpotify ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (spotifyUser ? 'AUDIO LINKED' : 'LINK SOUNDTRACK')}
            </button>
          </motion.div>
        </div>

        {/* Initiation Section - Play Your Genesis */}
        <div className="h-40 flex items-center justify-center">
          <AnimatePresence>
            {canInitiate && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(40px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                <button 
                  onClick={() => setStarted(true)}
                  className="glow-button group relative flex items-center justify-center gap-12 bg-white text-black px-32 py-12 rounded-full font-title font-bold text-lg tracking-[0.8em] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <Play className="w-10 h-10 fill-current shrink-0 group-hover:scale-110 transition-transform duration-700 relative z-10" />
                  <span className="relative z-10">PLAY YOUR GENESIS</span>
                </button>
                <p className="text-[10px] font-title tracking-[1em] text-white/10 uppercase animate-pulse">Neural Synchronization Ready</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
