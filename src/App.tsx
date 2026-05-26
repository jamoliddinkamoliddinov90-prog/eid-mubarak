/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX, Moon, Zap, Flame, Award, Heart, HelpCircle, Orbit, Music } from 'lucide-react';

// Subcomponents
import CelestialCanvas from './components/CelestialCanvas';
import CelebrationHall from './components/CelebrationHall';
import MemoryGalaxy from './components/MemoryGalaxy';
import FinaleShow from './components/FinaleShow';
import { audio } from './components/AudioEngine';

export default function App() {
  const [phase, setPhase] = useState<'loading' | 'opening' | 'experience' | 'galaxy' | 'finale'>(() => {
    try {
      const savedPhase = sessionStorage.getItem('koinot-phase');
      const hasLoaded = sessionStorage.getItem('koinot-has-loaded');
      if (hasLoaded === 'true' && savedPhase && ['experience', 'galaxy', 'finale'].includes(savedPhase)) {
        return savedPhase as 'experience' | 'galaxy' | 'finale';
      }
    } catch (_) {}
    return 'loading';
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(() => {
    try {
      return sessionStorage.getItem('koinot-audio-muted') !== 'false';
    } catch (_) {
      return true;
    }
  });
  const [mouseTrail, setMouseTrail] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);
  
  const trailIdRef = useRef(0);

  // Sync music mute state initially if audio is active
  useEffect(() => {
    try {
      if (!isAudioMuted && (phase === 'experience' || phase === 'galaxy' || phase === 'finale')) {
        audio.init();
        audio.startMusic();
      }
    } catch (_) {}
  }, []);

  // Save phase and mute state to sessionStorage to persist across hot-reloads and refreshes
  useEffect(() => {
    try {
      if (phase !== 'loading' && phase !== 'opening') {
        sessionStorage.setItem('koinot-phase', phase);
        sessionStorage.setItem('koinot-has-loaded', 'true');
      }
    } catch (_) {}
  }, [phase]);

  useEffect(() => {
    try {
      sessionStorage.setItem('koinot-audio-muted', String(isAudioMuted));
    } catch (_) {}
  }, [isAudioMuted]);

  // Sound listeners bridge
  useEffect(() => {
    const handleSound = (e: Event) => {
      const type = (e as CustomEvent).detail?.type;
      if (type === 'firework') {
        audio.playFirework();
      } else if (type === 'whoosh') {
        audio.playWhoosh();
      } else if (type === 'sparkle') {
        const freq = (e as CustomEvent).detail?.freq || 700;
        audio.playSparkle(freq);
      }
    };

    window.addEventListener('play-sound', handleSound);
    return () => window.removeEventListener('play-sound', handleSound);
  }, []);

  // Simulate premium futuristic loading progress
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('opening');
            // Play introductory chime sweep
            try {
              audio.playSparkle(330);
              audio.playSparkle(660);
            } catch (_) {}
          }, 600);
          return 100;
        }
        // Organic progress steps
        const step = Math.random() > 0.4 ? Math.floor(Math.random() * 8) + 4 : 2;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [phase]);

  // Track cursor trail coords on mousemove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Add a trail item with unique id
      const id = trailIdRef.current++;
      setMouseTrail((prev) => [
        ...prev.slice(-12), // keep last 12 trail elements max
        { id, x: e.clientX, y: e.clientY, opacity: 1.0 }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Periodically decay trail opacity
  useEffect(() => {
    const interval = setInterval(() => {
      setMouseTrail((prev) =>
        prev
          .map((item) => ({ ...item, opacity: item.opacity - 0.1 }))
          .filter((item) => item.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Interactive Sounds Trigger
  const handleSparkle = (freq: number) => {
    try {
      audio.playSparkle(freq);
    } catch (_) {}
  };

  const handleWhoosh = () => {
    try {
      audio.playWhoosh();
    } catch (_) {}
  };

  const handleFireworkSound = () => {
    try {
      audio.playFirework();
    } catch (_) {}
  };

  const toggleMusic = () => {
    // Lazy initialisation secure trigger
    audio.init();
    const isNowMuted = audio.toggle();
    setIsAudioMuted(isNowMuted);
    
    // Play sound of interaction
    if (!isNowMuted) {
      audio.playSparkle(600);
      audio.playSparkle(900);
    }
  };

  // Trigger cinematic star flash-transition
  const enterMainExperienceFromOpening = () => {
    // Unmute ambient synthesizer to guarantee sound plays when entering
    audio.init();
    audio.startMusic();
    setIsAudioMuted(false);

    audio.playWhoosh();
    
    // Broadcast transition start to Canvas
    const event = new CustomEvent('trigger-opening-explosion');
    window.dispatchEvent(event);
  };

  const handleExplodeComplete = () => {
    // Star explosion is done, now render the Celebration Hall
    setPhase('experience');
    audio.playWhoosh();
  };

  return (
    <div className="relative min-h-screen bg-[#060608] overflow-x-hidden text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Sparkle cursor trail rendering layer */}
      {mouseTrail.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none rounded-full blur-[2px] z-50 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${12 * trail.opacity}px`,
            height: `${12 * trail.opacity}px`,
            background: `radial-gradient(circle, rgba(234,179,8,1) 0%, rgba(6,182,212,0.4) 60%, rgba(0,0,0,0) 100%)`,
            opacity: trail.opacity * 0.75,
          }}
        />
      ))}

      {/* Persistent Space Sound Ambient Control Button (Apple Minimalist style) */}
      {phase !== 'loading' && (
        <motion.div 
          className="fixed top-5 right-5 z-50 flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 text-xs font-semibold select-none cursor-pointer ${
              isAudioMuted
                ? 'bg-slate-950/45 border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-pulse'
            }`}
            onClick={toggleMusic}
            id="sound-toggle-btn"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>OVOZSIZ</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
                <span>CINEMATIC AUDIO</span>
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Main Celestial Environment Graphics (Canvas Background) */}
      <CelestialCanvas
        phase={phase}
        isMuted={isAudioMuted}
        onExplodeComplete={handleExplodeComplete}
      />

      {/* Dynamic Content Switching Panels */}
      <main className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">

          {/* 1. LOADING PHASE */}
          {phase === 'loading' && (
            <motion.div
              key="loader-screen"
              className="fixed inset-0 flex flex-col items-center justify-center bg-[#050507] z-50 px-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              id="global-loader"
            >
              {/* Spinning geometric Islamic crescent mandala ornament */}
              <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                <div className="absolute -inset-2 rounded-full border border-dashed border-amber-500/10 animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/5 animate-spin" style={{ animationDuration: '40s' }} />
                
                {/* Pulsing center gold jewel */}
                <motion.div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center bg-slate-950/80 border border-amber-500/35 relative font-display font-bold text-amber-400 text-xl"
                  animate={{
                    borderColor: ['rgba(234,179,8,0.3)', 'rgba(6,182,212,0.6)', 'rgba(234,179,8,0.3)'],
                    boxShadow: [
                      '0 0 15px rgba(234,179,8,0.1)',
                      '0 0 35px rgba(6,182,212,0.3)',
                      '0 0 15px rgba(234,179,8,0.1)'
                    ],
                    rotate: 360
                  }}
                  transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                >
                  ☪
                </motion.div>
              </div>

              {/* Progress Labels */}
              <div className="text-center max-w-xs uppercase font-mono tracking-widest text-slate-400 text-xs">
                <p className="text-amber-400 font-bold mb-2 text-glow-gold animate-pulse">KOINOT YUKLANMOQDA...</p>
                <div className="w-56 h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 mx-auto mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-cyan-500 rounded-full transition-all duration-150"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500">
                  SYSTEM CORE INITIALIZED: <span className="text-slate-300 font-bold">{loadingProgress}%</span>
                </span>
                <p className="text-[8px] text-slate-600 mt-4 leading-relaxed tracking-normal lowercase italic select-none">
                  crafted for the class of 2026 by jamoliddin
                </p>
              </div>
            </motion.div>
          )}

          {/* 2. OPENING SCENE CINEMATIC (Black Screen -> Rotatable Glowing Moon -> Grand Text) */}
          {phase === 'opening' && (
            <motion.div
              key="opening-scene"
              className="relative min-h-[90vh] flex flex-col items-center justify-between text-center py-20 px-4 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="opening-cinematic-scene"
            >
              <div className="mt-6">
                <motion.p 
                  className="text-cyan-400 font-mono tracking-[0.45em] text-xs uppercase mb-1"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.0 }}
                >
                  CELESTIAL EID AL-ADHA PRESENTATION
                </motion.p>
                <motion.p 
                  className="text-slate-500 font-mono text-[9px] tracking-normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  SINFDOSHLIK VA EZGULIK PREMYERASI
                </motion.p>
              </div>

              {/* Massive Golden Typographic Display centered */}
              <div className="my-10">
                <motion.h1 
                  className="text-5xl md:text-8xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-400 drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] max-w-4xl"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 1.2, type: 'spring' }}
                  id="opening-title-header"
                >
                  Qurbon Hayiti Muborak
                </motion.h1>
                <motion.p 
                  className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mt-4 leading-relaxed font-sans px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.0 }}
                >
                  Sinfimizning har bir sadoqatli yulduzi uchun maxsus tayyorlangan, unutilmas interaktiv koinot baxtiyorligiga kiring.
                </motion.p>
              </div>

              {/* Enter Node Trigger Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="mb-8"
              >
                <button
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 font-sans font-bold text-sm tracking-widest text-slate-950 uppercase shadow-[0_0_35px_rgba(234,179,8,0.45)] hover:shadow-[0_0_50px_rgba(234,179,8,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={enterMainExperienceFromOpening}
                  id="enter-space-btn"
                >
                  {/* Outer micro light circle decoration */}
                  <span className="absolute inset-0 border border-white/20 rounded-2xl scale-110 opacity-30 group-hover:scale-125 transition-transform" />
                  
                  <div className="flex items-center gap-2">
                    <span>KOINOTGA KIRISH / ENTER HERE</span>
                    <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950 animate-bounce" />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* 3. ACTIVE MAIN EXPERIENCE CORES */}
          {phase === 'experience' && (
            <motion.div
              key="main-hall-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
            >
              <CelebrationHall
                onSparkleSound={handleSparkle}
                onWhooshSound={handleWhoosh}
                onFireworkSound={handleFireworkSound}
              />
            </motion.div>
          )}

          {/* 4. GALAXY TAB */}
          {phase === 'galaxy' && (
            <motion.div
              key="galaxy-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
            >
              <MemoryGalaxy
                onSparkleSound={handleSparkle}
                onWhooshSound={handleWhoosh}
              />
            </motion.div>
          )}

          {/* 5. FINALE TAB */}
          {phase === 'finale' && (
            <motion.div
              key="finale-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FinaleShow
                onFireworkSound={handleFireworkSound}
                onSparkleSound={handleSparkle}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Futuristic Apple-Tesla-style Floating Sleek Dock (Navigation Bar) */}
      {phase !== 'loading' && phase !== 'opening' && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-[340px] sm:max-w-md px-3"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, delay: 0.3 }}
          id="global-navigation-bar"
        >
          <div className="glass-panel rounded-full p-2 flex items-center justify-between shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10 relative">
            
            {/* Nav button 1: Celebration Hall */}
            <button
              className={`flex-1 flex flex-col items-center py-2.5 rounded-full transition-all text-center gap-1 cursor-pointer ${
                phase === 'experience'
                  ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300 shadow-[inset_0_0_10px_rgba(234,179,8,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
              onClick={() => {
                handleWhoosh();
                setPhase('experience');
              }}
              id="nav-experience-btn"
            >
              <Moon className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-tight">Tabriklar</span>
            </button>

            {/* Nav button 2: Memory Galaxy */}
            <button
              className={`flex-1 flex flex-col items-center py-2.5 rounded-full transition-all text-center gap-1 cursor-pointer ${
                phase === 'galaxy'
                  ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 shadow-[inset_0_0_10px_rgba(6,182,212,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
              onClick={() => {
                handleWhoosh();
                setPhase('galaxy');
              }}
              id="nav-galaxy-btn"
            >
              <Orbit className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-tight">Galaktika</span>
            </button>

            {/* Nav button 3: Finale Presentation */}
            <button
              className={`flex-1 flex flex-col items-center py-2.5 rounded-full transition-all text-center gap-1 cursor-pointer ${
                phase === 'finale'
                  ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300 shadow-[inset_0_0_10px_rgba(244,63,94,0.15)] font-semibold animate-pulse'
                  : 'text-slate-400 hover:text-slate-250 border border-transparent'
              }`}
              onClick={() => {
                handleWhoosh();
                handleFireworkSound();
                setPhase('finale');
              }}
              id="nav-finale-btn"
            >
              <Heart className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-tight">Abadiyat</span>
            </button>

          </div>
        </motion.div>
      )}

      {/* Cinematic Humanistic Elegant Footer Note */}
      {phase !== 'loading' && (
        <footer className="w-full text-center py-4 text-slate-500 text-[10px] tracking-wider uppercase font-mono z-30 pointer-events-none select-none relative sm:-bottom-1">
          <p>
            Qurbon Hayiti 3D Class Experience • From your programmer friend ❤️
          </p>
          <span className="text-slate-600 lowercase italic select-none mt-0.5 block">
            all data resides locally in persistent high performance memories
          </span>
        </footer>
      )}

    </div>
  );
}
