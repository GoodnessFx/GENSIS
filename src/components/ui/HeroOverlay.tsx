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
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGithubUser('GoodnessFx');
    setIsConnectingGithub(false);
  };

  const handleConnectSpotify = async () => {
    setIsConnectingSpotify(true);
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSpotifyUser('UserAccount');
    setIsConnectingSpotify(false);
  };

  const canInitiate = githubUser && spotifyUser;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl transition-all duration-1000 overflow-hidden">
      <div className="max-w-6xl w-full px-12 text-center space-y-24 animate-in fade-in zoom-in duration-1500">
        
        {/* Cinematic Title Section */}
        <div className="space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-title tracking-[1em] text-white/30 uppercase block"
          >
            A Living Archive of Your Creation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12rem] font-bold tracking-[-0.04em] text-white sm:text-[14rem] md:text-[18rem] font-accent leading-none glow-text select-none"
          >
            GENESIS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl text-zinc-500 font-light tracking-widest max-w-3xl mx-auto leading-relaxed font-sans italic"
          >
            "Every line of code tells a story. Every beat defines an era."
          </motion.p>
        </div>
        
        {/* Connection Phase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* GitHub Connection */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`p-10 rounded-[2.5rem] border transition-all duration-700 flex flex-col items-center gap-6 ${githubUser ? 'bg-white/5 border-green-500/30' : 'bg-white/[0.02] border-white/5'}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 ${githubUser ? 'bg-green-500 text-black' : 'bg-white/5 text-white'}`}>
              {githubUser ? <CheckCircle2 className="w-8 h-8" /> : <Github className="w-8 h-8" />}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-title tracking-[0.2em] uppercase text-white">Source Archive</h3>
              <p className="text-sm text-zinc-500 font-sans tracking-wide">Sync your GitHub repositories to materialize your monuments.</p>
            </div>
            <button 
              onClick={handleConnectGithub}
              disabled={!!githubUser || isConnectingGithub}
              className={`w-full py-4 rounded-full font-title text-[10px] tracking-[0.3em] uppercase transition-all ${githubUser ? 'text-green-500 cursor-default' : 'bg-white text-black hover:scale-105 active:scale-95'}`}
            >
              {isConnectingGithub ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : (githubUser ? 'Connected' : 'Link GitHub')}
            </button>
          </motion.div>

          {/* Spotify Connection */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`p-10 rounded-[2.5rem] border transition-all duration-700 flex flex-col items-center gap-6 ${spotifyUser ? 'bg-white/5 border-green-500/30' : 'bg-white/[0.02] border-white/5'}`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 ${spotifyUser ? 'bg-green-500 text-black' : 'bg-white/5 text-white'}`}>
              {spotifyUser ? <CheckCircle2 className="w-8 h-8" /> : <Music className="w-8 h-8" />}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-title tracking-[0.2em] uppercase text-white">Audio Mapping</h3>
              <p className="text-sm text-zinc-500 font-sans tracking-wide">Connect Spotify to weave your personal soundtrack into the timeline.</p>
            </div>
            <button 
              onClick={handleConnectSpotify}
              disabled={!!spotifyUser || isConnectingSpotify}
              className={`w-full py-4 rounded-full font-title text-[10px] tracking-[0.3em] uppercase transition-all ${spotifyUser ? 'text-green-500 cursor-default' : 'bg-white text-black hover:scale-105 active:scale-95'}`}
            >
              {isConnectingSpotify ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : (spotifyUser ? 'Connected' : 'Link Spotify')}
            </button>
          </motion.div>
        </div>

        {/* Initiation Section */}
        <AnimatePresence>
          {canInitiate && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="pt-12"
            >
              <button 
                onClick={() => setStarted(true)}
                className="glow-button group relative flex items-center justify-center gap-8 bg-white text-black px-24 py-10 rounded-full font-title font-bold text-base tracking-[0.5em] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <Play className="w-8 h-8 fill-current shrink-0 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">INITIATE SEQUENCE</span>
              </button>
              <p className="mt-8 text-[10px] font-title tracking-[0.4em] text-white/20 uppercase">Warning: Sensory overload may occur</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>
    </div>
  );
};
