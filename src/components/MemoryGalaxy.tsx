/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLASS_MEMORIES } from '../data';
import { ClassMemory } from '../types';
import { Heart, BookOpen, Milestone, Rocket, Sparkles, X, Orbit } from 'lucide-react';

interface MemoryGalaxyProps {
  onSparkleSound: (freq: number) => void;
  onWhooshSound: () => void;
}

export default function MemoryGalaxy({ onSparkleSound, onWhooshSound }: MemoryGalaxyProps) {
  const [selectedMemory, setSelectedMemory] = useState<ClassMemory | null>(null);
  const [orbits, setOrbits] = useState<Array<{ memory: ClassMemory; angle: number }>>(
    CLASS_MEMORIES.map((m, index) => ({
      memory: m,
      angle: (index * Math.PI * 2) / CLASS_MEMORIES.length
    }))
  );
  
  const orbitContainerRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const hoverRef = useRef<number | null>(null);

  // Update orbit positions dynamically
  useEffect(() => {
    const updateAngles = () => {
      setOrbits(prev =>
        prev.map(item => {
          // If a memory is hovered or one is clicked open, we slow down the galaxy rotation
          const isHovered = hoverRef.current === item.memory.id;
          const speedFactor = selectedMemory ? 0.05 : isHovered ? 0.15 : 1;
          return {
            ...item,
            angle: item.angle + item.memory.orbitSpeed * speedFactor
          };
        })
      );
      requestRef.current = requestAnimationFrame(updateAngles);
    };

    requestRef.current = requestAnimationFrame(updateAngles);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [selectedMemory]);

  const getCategoryIcon = (category: ClassMemory['category']) => {
    switch (category) {
      case 'friendship': return <Heart className="w-6 h-6 text-rose-400" id={`icon-friendship`} />;
      case 'school': return <BookOpen className="w-6 h-6 text-amber-400" id={`icon-school`} />;
      case 'dream': return <Milestone className="w-6 h-6 text-cyan-400" id={`icon-dream`} />;
      case 'success': return <Rocket className="w-6 h-6 text-emerald-400" id={`icon-success`} />;
    }
  };

  const getMemoryGradient = (category: ClassMemory['category']) => {
    switch (category) {
      case 'friendship': return 'from-rose-500/35 to-pink-600/10 border-rose-500/50 hover:shadow-rose-400/20';
      case 'school': return 'from-amber-500/35 to-yellow-600/10 border-amber-500/50 hover:shadow-amber-400/20';
      case 'dream': return 'from-cyan-500/35 to-blue-600/10 border-cyan-500/50 hover:shadow-cyan-400/20';
      case 'success': return 'from-emerald-500/35 to-teal-600/10 border-emerald-500/50 hover:shadow-emerald-400/20';
    }
  };

  const handleCardClick = (memory: ClassMemory) => {
    onWhooshSound();
    setSelectedMemory(memory);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center py-10 px-4 select-none z-20">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mb-12 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-30 animate-pulse">
          <Orbit className="w-24 h-24 text-cyan-500/40" />
        </div>
        <motion.p 
          className="text-cyan-400 font-mono text-xs tracking-[0.35em] uppercase mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Sinfimiz Galaktikasi
        </motion.p>
        <motion.h2 
          className="text-4xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-500 tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          Memory Galaxy
        </motion.h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          Sinfimizda kechirgan unutilmas lahzalar, buyuk maqsadlarimiz va samimiy do'stlik orzularimiz koinotda sayyoralar misoli charx urmoqda. Ularni ochish uchun sayyoralarni tanlang.
        </p>
      </div>

      {/* 3D Orbiting Stage */}
      <div 
        ref={orbitContainerRef}
        className="relative w-full max-w-[700px] h-[480px] flex items-center justify-center border border-cyan-500/10 rounded-full bg-slate-950/20 backdrop-blur-[2px] shadow-[inset_0_0_80px_rgba(6,182,212,0.05)] overflow-visible"
        id="galaxy-orbit-stage"
      >
        {/* Central Core Element */}
        <motion.div 
          className="absolute w-20 h-20 rounded-full flex flex-col items-center justify-center bg-gradient-to-r from-amber-500 via-yellow-300 to-cyan-500 shadow-[0_0_60px_rgba(234,179,8,0.6)] cursor-pointer z-20 overflow-hidden"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 45px rgba(234,179,8,0.5)',
              '0 0 75px rgba(6,182,212,0.7)',
              '0 0 45px rgba(234,179,8,0.5)'
            ]
          }}
          transition={{ repeat: Infinity, duration: 4.5 }}
          onClick={() => {
            onSparkleSound(880);
            onSparkleSound(1320);
          }}
          id="central-friendship-core"
        >
          <div className="absolute inset-0 bg-slate-950/10 mix-blend-overlay animate-spin duration-10000" />
          <Heart className="w-8 h-8 text-white fill-white/80 animate-pulse duration-1000" />
          <span className="text-[9px] font-mono tracking-widest text-amber-100 font-bold uppercase mt-1">CORE</span>
        </motion.div>

        {/* Orbit Rings (Visual guidelines) */}
        <div className="absolute w-[300px] h-[150px] border border-cyan-500/10 rounded-full pointer-events-none transform -rotate-12 z-0" />
        <div className="absolute w-[450px] h-[220px] border border-cyan-500/5 rounded-full pointer-events-none transform -rotate-12 z-0" />
        <div className="absolute w-[600px] h-[300px] border border-cyan-500/5 rounded-full pointer-events-none transform -rotate-12 z-0" />

        {/* Floating Planet Cards */}
        {orbits.map(({ memory, angle }) => {
          // Trigonometric calculations for custom 3D projection
          // We squeeze the Y axis to make it look like an oblique perspective orbit
          const rX = memory.orbitRadius * 1.35;
          const rY = memory.orbitRadius * 0.45;
          
          const x = Math.cos(angle) * rX;
          const y = Math.sin(angle) * rY;

          // Depth attributes based on whether the planet is in foreground or background
          const isForeground = Math.sin(angle) > 0;
          const zDepth = isForeground ? 100 : 10;
          const opacity = isForeground ? 1.0 : 0.45;
          const scale = (isForeground ? 1.15 : 0.75) * (memory.scale * 0.5 + 0.5);

          return (
            <div
              key={memory.id}
              className="absolute transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
                zIndex: zDepth,
                opacity: opacity
              }}
              onMouseEnter={() => {
                hoverRef.current = memory.id;
                onSparkleSound(600 + memory.id * 100);
              }}
              onMouseLeave={() => {
                hoverRef.current = null;
              }}
            >
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border bg-gradient-to-b ${getMemoryGradient(
                  memory.category
                )} backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 text-center min-w-[130px]`}
                onClick={() => handleCardClick(memory)}
                id={`memory-planet-${memory.id}`}
              >
                {/* Visual Glow Aura */}
                <div 
                  className="absolute -inset-1 rounded-2xl opacity-15 blur-md group-hover:opacity-45 transition-opacity" 
                  style={{ backgroundColor: memory.glowingColor }}
                />
                
                {/* Orbit Ball Visuals */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative bg-slate-900/90 border border-slate-700/60"
                  style={{
                    boxShadow: `0 0 15px ${memory.glowingColor}`
                  }}
                >
                  <div className="absolute -inset-1.5 rounded-full border border-dashed border-slate-500/20 animate-spin" style={{ animationDuration: '8s' }} />
                  {getCategoryIcon(memory.category)}
                </div>

                <h3 className="text-white font-sans text-xs font-semibold tracking-wide mt-3 truncate max-w-[130px]">
                  {memory.title}
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 capitalize bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded-full mt-1.5">
                  {memory.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cinematic Details Backdrop Container Overlay */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 z-50 select-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="galaxy-detail-overlay"
          >
            <motion.div
              className={`relative max-w-lg w-full rounded-3xl border p-8 bg-gradient-to-br ${getMemoryGradient(
                selectedMemory.category
              )} shadow-2xl backdrop-blur-xl`}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              id={`galaxy-detail-card-${selectedMemory.id}`}
            >
              {/* Sparkle detailing decorations */}
              <div className="absolute top-4 left-4 text-amber-400/30 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>

              {/* Close Button top-right */}
              <button
                className="absolute top-5 right-5 text-gray-400 hover:text-white bg-slate-800/40 border border-slate-700/50 p-2 rounded-full transition-colors active:scale-90"
                onClick={() => {
                  onWhooshSound();
                  setSelectedMemory(null);
                }}
                id="close-memory-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Iconic Symbol */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-slate-950/50 relative overflow-hidden"
                  style={{
                    borderColor: selectedMemory.glowingColor,
                    boxShadow: `0 0 20px ${selectedMemory.glowingColor}44`
                  }}
                >
                  {getCategoryIcon(selectedMemory.category)}
                </div>

                <div>
                  <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
                    Memorable Space Node
                  </span>
                  <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
                    {selectedMemory.title}
                  </h3>
                </div>
              </div>

              {/* Heartfelt Description content with dramatic presentation */}
              <p className="text-gray-200 text-base leading-relaxed mb-6 font-serif italic py-3 px-4 border-l-2 border-amber-400/55 bg-amber-500/5 rounded-r-xl">
                "{selectedMemory.description}"
              </p>

              {/* Motivational message targeting the categories */}
              <div className="border-t border-slate-700/50 pt-5 mt-3">
                <p className="text-xs font-mono text-cyan-400/90 mb-1">MOTIVATIONAL ORBIT:</p>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedMemory.category === 'friendship' && "Haqiqiy do'stlar jismonan yiroqlashsa-da, qalban birga qoladi. Sinfdoshlarimiz orasidagi bu rishta dunyodagi eng qimmatbaho javohirdir."}
                  {selectedMemory.category === 'school' && "Birgalikda o'tkazgan darslarimiz va darsdan keyingi tanaffuslar, kelajakda yodga olib tabassum qiladigan eng go'zal xotiramiz bo'lib qoladi."}
                  {selectedMemory.category === 'dream' && "Sinfdosh do'stlar, orzu qilishdan sira to'xtamang. Orzularimiz shunchaki xayol emas, u kelgusi buyuk muvaffaqiyatlarimizning koordinatadir."}
                  {selectedMemory.category === 'success' && "Kelajakda barchamiz katta muvaffaqiyatlarga erishamiz va uchrashganimizda yana o'sha quvnoq maktab suhbatlarimiz qayd etiladi."}
                </p>
              </div>

              {/* Bottom tag line */}
              <div className="text-right mt-6">
                <button
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95"
                  onClick={() => {
                    onWhooshSound();
                    setSelectedMemory(null);
                  }}
                  id="close-memory-bottom-btn"
                >
                  Xotiralarga Qaytish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
