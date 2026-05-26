/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDENTS_DATA } from '../data';
import { Sparkles, Heart } from 'lucide-react';

interface FinaleShowProps {
  onFireworkSound: () => void;
  onSparkleSound: (freq: number) => void;
}

export default function FinaleShow({ onFireworkSound, onSparkleSound }: FinaleShowProps) {
  const [swarmPhase, setSwarmPhase] = useState<'rising' | 'gathering' | 'resolved' | 'tribute'>('rising');
  const [namesState, setNamesState] = useState<Array<{
    id: number;
    name: string;
    x: number;
    y: number;
    scale: number;
    angle: number;
    speed: number;
    color: string;
  }>>(
    STUDENTS_DATA.map((st, i) => {
      // Start dispersed at the lower bottom quadrant
      const angle = (i * Math.PI * 2) / STUDENTS_DATA.length;
      return {
        id: st.id,
        name: st.name,
        x: (Math.random() - 0.5) * 400,
        y: 400 + Math.random() * 200,
        scale: 0.8 + Math.random() * 0.4,
        angle: angle,
        speed: 0.5 + Math.random() * 0.5,
        color: st.avatarColor
      };
    })
  );

  // Run dynamic orbit swarming math
  useEffect(() => {
    let timer: any;
    let frameId: number;

    // Phased schedule transitions
    timer = setTimeout(() => {
      setSwarmPhase('gathering');
      onFireworkSound();

      // Next phase
      timer = setTimeout(() => {
        setSwarmPhase('resolved');
        onFireworkSound();
        onSparkleSound(880);

        // Ultimate phase
        timer = setTimeout(() => {
          setSwarmPhase('tribute');
          onFireworkSound();
          onSparkleSound(1100);
        }, 5000);
      }, 5500);
    }, 4000);

    // Update floating positions
    const updatePositions = () => {
      setNamesState((prev) =>
        prev.map((nm, idx) => {
          let targetX = 0;
          let targetY = 0;

          if (swarmPhase === 'rising') {
            // Slowly rise straight upwards
            const newY = nm.y - nm.speed * 2.2;
            const driftX = nm.x + Math.sin(newY * 0.02 + idx) * 0.8;
            return {
              ...nm,
              y: newY < -150 ? 500 : newY,
              x: driftX
            };
          } else if (swarmPhase === 'gathering') {
            // Swarm around the center in a floating 3D heart/circle swarm
            const radius = 220 + Math.sin(Date.now() * 0.001 + idx) * 20;
            const newAngle = nm.angle + 0.009;
            targetX = Math.cos(newAngle) * radius;
            targetY = Math.sin(newAngle) * radius * 0.6 - 30; // squeezed ellipse
            
            // Move towards targets gently
            return {
              ...nm,
              angle: newAngle,
              x: nm.x + (targetX - nm.x) * 0.06,
              y: nm.y + (targetY - nm.y) * 0.06
            };
          } else {
            // Gather closely into a tightly-knit glowing stellar halo in the sky
            const radius = 120 + Math.sin(Date.now() * 0.0012 + idx) * 10;
            const newAngle = nm.angle + 0.005;
            targetX = Math.cos(newAngle) * radius;
            targetY = Math.sin(newAngle) * radius * 0.5 - 120; // higher up
            
            return {
              ...nm,
              angle: newAngle,
              x: nm.x + (targetX - nm.x) * 0.08,
              y: nm.y + (targetY - nm.y) * 0.08,
              scale: 0.85
            };
          }
        })
      );
      frameId = requestAnimationFrame(updatePositions);
    };

    frameId = requestAnimationFrame(updatePositions);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [swarmPhase]);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-visible py-12 px-4 select-none z-20">
      
      {/* 1. Constellations Ring Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden h-full w-full z-0">
        <div className="relative w-[800px] h-[600px] flex items-center justify-center">
          
          {namesState.map((nm) => (
            <div
              key={nm.id}
              className="absolute font-mono font-bold text-xs tracking-wider transition-opacity duration-1000 select-none pb-1"
              style={{
                left: `calc(50% + ${nm.x}px)`,
                top: `calc(50% + ${nm.y}px)`,
                transform: `translate(-50%, -50%) scale(${nm.scale})`,
                color: nm.color,
                textShadow: `0 0 10px ${nm.color}88, 0 0 20px ${nm.color}44`,
                opacity: swarmPhase === 'tribute' ? 0.35 : 0.95
              }}
            >
              ★ {nm.name}
            </div>
          ))}

          {/* Central Connecting Constellation lines */}
          {swarmPhase === 'gathering' && (
            <svg className="absolute inset-0 w-full h-full opacity-15">
              <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#eab308" strokeWidth="0.5" strokeDasharray="5,5" />
              <line x1="85%" y1="15%" x2="15%" y2="85%" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="5,5" />
            </svg>
          )}
        </div>
      </div>

      {/* 2. Emotional Messages Display Layer */}
      <div className="relative flex flex-col items-center justify-center text-center max-w-2xl z-20 pointer-events-auto h-full min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* Phase 1: Explanation */}
          {swarmPhase === 'rising' && (
            <motion.div
              key="phase-rising"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
              id="finale-rising-msg"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-300 animate-bounce mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-mono text-cyan-400 tracking-widest uppercase mb-2">
                AHIL SINFDOSHLAR
              </h3>
              <p className="text-gray-300 text-base leading-relaxed max-w-lg">
                Ko'zlaringizni yulduzlar sari yo'llang. Sinfimiz a'zolarining ismlari koinotda o'zaro tutashib, hamnafaslik burjiga aylanmoqda...
              </p>
            </motion.div>
          )}

          {/* Phase 2: Gathering Swarm Core */}
          {swarmPhase === 'gathering' && (
            <motion.div
              key="phase-gathering"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
              id="finale-gathering-msg"
            >
              <h3 className="text-xs font-mono text-amber-400 tracking-[0.4em] uppercase mb-4 animate-pulse">
                INITIALIZING STAR ALIGNMENT
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-slate-100 font-sans tracking-tight">
                "Uzoq orzular, yaqin do'stlar"
              </p>
              <p className="text-slate-400 text-sm mt-2 max-w-sm">
                Biz turli manzillarga uchar bo'lsak-da, xotiralarimiz bitta koinot markazini tashkil etadi.
              </p>
            </motion.div>
          )}

          {/* Phase 3 & 4: Resolution & Beautiful Eternal Golden Tribute */}
          {(swarmPhase === 'resolved' || swarmPhase === 'tribute') && (
            <motion.div
              key="phase-resolved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Grand Cinematic Floating Golden Text Area */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 20 }}
              >
                <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] leading-none text-center" id="main-tribute-text">
                  Real friendship never ends.
                </h2>
              </motion.div>

              {/* Sub-tribute details */}
              <AnimatePresence>
                {swarmPhase === 'tribute' && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="flex flex-col items-center mt-3"
                    id="programmer-signature"
                  >
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/35 text-rose-300 font-semibold text-lg tracking-wide uppercase shadow-[0_0_30px_rgba(244,63,94,0.15)]">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500/50 animate-pulse" />
                      From your programmer friend
                    </div>
                    
                    <span className="text-sm font-mono text-cyan-400 mt-4 tracking-wider">
                      Jamoliddin ❤️ 2026
                    </span>

                    <p className="text-gray-400 text-xs text-center max-w-md mt-6 leading-relaxed font-sans px-4 select-text">
                      "Ushbu koinot sahifasi barcha go'zal xotiralarimiz, cheksiz orzularimiz ramzidir. Qurbon Hayitingiz yana bir bor qutlug' bo'lsin, muvaffaqiyat va ulug'lik aslo tark etmasin sinfdoshlarim!"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
