/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDENTS_DATA } from '../data';
import { Student } from '../types';
import { Search, ChevronLeft, ChevronRight, Star, Heart, MessageSquare, Volume2, Award, Sparkles, X } from 'lucide-react';
import Typewriter from './Typewriter';

interface CelebrationHallProps {
  onSparkleSound: (freq: number) => void;
  onWhooshSound: () => void;
  onFireworkSound: () => void;
}

export default function CelebrationHall({
  onSparkleSound,
  onWhooshSound,
  onFireworkSound
}: CelebrationHallProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [inspectedStudent, setInspectedStudent] = useState<Student | null>(null);

  // Helper to determine which students belong to which category
  const getCategoryStudentsCount = (catId: string): number => {
    return STUDENTS_DATA.filter(student => {
      if (catId === 'all') return true;
      if (catId === 'leaders') return [1, 7, 11].includes(student.id);
      if (catId === 'creatives') return [2, 8, 10, 12, 13, 14, 16, 18].includes(student.id);
      if (catId === 'science') return [5, 6, 9, 20, 21, 22].includes(student.id);
      if (catId === 'athletes') return [3, 4, 15, 17, 19].includes(student.id);
      return false;
    }).length;
  };

  // Filter out any category that is empty
  const availableCategories = useMemo(() => {
    const rawCategories = [
      { id: 'all', label: 'Barchasi' },
      { id: 'leaders', label: 'Sardorlar' },
      { id: 'creatives', label: 'San\'atkorlar' },
      { id: 'science', label: 'Kashfiyotchi' },
      { id: 'athletes', label: 'Sportchilar' }
    ];
    return rawCategories.filter(cat => getCategoryStudentsCount(cat.id) > 0);
  }, []);

  // Filter students based on search or optional positive category
  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.role.toLowerCase().includes(searchTerm.toLowerCase());
      if (selectedRoleFilter === 'all') return matchesSearch;
      if (selectedRoleFilter === 'leaders') return matchesSearch && [1, 7, 11].includes(student.id);
      if (selectedRoleFilter === 'creatives') return matchesSearch && [2, 8, 10, 12, 13, 14, 16, 18].includes(student.id);
      if (selectedRoleFilter === 'science') return matchesSearch && [5, 6, 9, 20, 21, 22].includes(student.id);
      if (selectedRoleFilter === 'athletes') return matchesSearch && [3, 4, 15, 17, 19].includes(student.id);
      return matchesSearch;
    });
  }, [searchTerm, selectedRoleFilter]);

  // Handle wraps
  const handleNext = () => {
    if (filteredStudents.length === 0) return;
    onSparkleSound(600 + (currentIndex % 5) * 100);
    setCurrentIndex((prev) => (prev + 1) % filteredStudents.length);
  };

  const handlePrev = () => {
    if (filteredStudents.length === 0) return;
    onSparkleSound(500 + (currentIndex % 5) * 100);
    setCurrentIndex((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length);
  };

  const handleStudentClick = (student: Student) => {
    onWhooshSound();
    setInspectedStudent(student);
    
    // Trigger opening-explosion light reaction to notify Celestial Canvas
    try {
      const event = new CustomEvent('play-sound', { detail: { type: 'firework' } });
      window.dispatchEvent(event);
    } catch (_) {}
  };

  // Safe wrapper for custom typewriter clicks
  const triggerTypewriterSound = () => {
    // Soft random high pitch synthesizer sound matching voice typing
    onSparkleSound(800 + Math.random() * 400);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-start items-center py-8 px-4 z-20 overflow-visible select-none">
      
      {/* Search and Navigation Panel */}
      <div className="w-full max-w-4xl flex flex-col items-center mb-8 relative">
        <div className="text-center mb-6">
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono tracking-wider uppercase mb-3 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Hayit Tabriklari Zali
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-400 tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            3D Celebration Hall
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2 font-sans">
            Sinfdoshlarimizning har biri koinot zarrasidek qadrli. Ularning orzularini, Qurbon Hayiti tabriklari va samimiy so'zlarini tinglang.
          </p>
        </div>

        {/* Floating Glass Search Hub */}
        <div className="w-full max-w-lg bg-slate-900/60 border border-slate-700/35 rounded-2xl p-3 backdrop-blur-md flex flex-col sm:flex-row gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Sinfdosh ismini yozing..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/50 hover:bg-slate-950/70 focus:bg-slate-950 border border-slate-800 focus:border-amber-500/60 rounded-xl text-sm text-slate-200 outline-none transition-all placeholder:text-slate-500 font-sans"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentIndex(0);
              }}
              id="search-input"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-1 overflow-x-auto py-1 sm:py-0">
            {availableCategories.map(filter => {
              const count = getCategoryStudentsCount(filter.id);
              return (
                <button
                  key={filter.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedRoleFilter === filter.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(234,179,8,0.25)]'
                      : 'bg-slate-950/30 text-slate-400 border-slate-800/60 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                  onClick={() => {
                    onSparkleSound(400);
                    setSelectedRoleFilter(filter.id);
                    setCurrentIndex(0);
                  }}
                  id={`filter-btn-${filter.id}`}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating 3D Dome Carousel Arena */}
      <div 
        className="relative w-full max-w-5xl h-[420px] flex items-center justify-center overflow-visible"
        id="3d-carousel-arena"
      >
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-sans">
            <p className="text-lg">Sinfdosh topilmadi</p>
            <p className="text-xs mt-1">Sariq yoki yashil tugmalar yordamida qaytadan saralang</p>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Left controller */}
            <button
              className="absolute left-2 md:left-12 z-40 bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 p-3.5 rounded-full transition-all text-amber-400 active:scale-90 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer"
              onClick={handlePrev}
              id="prev-carousel-btn"
            >
              <ChevronLeft className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Simulated 3D Display Stack */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible">
              {filteredStudents.map((student, idx) => {
                // Calculate cyclic index offsets
                let offset = idx - currentIndex;
                
                // Wrap offset mathematically to keep centered loop
                const total = filteredStudents.length;
                if (offset < -total / 2) offset += total;
                if (offset > total / 2) offset -= total;

                // Only render immediate neighbors to conserve CPU performance
                const absOffset = Math.abs(offset);
                if (absOffset > 2) return null;

                // 3D positioning coefficients
                // Left is negative, right is positive, center is 0
                const translateX = offset * (window.innerWidth < 640 ? 150 : 260);
                const translateZ = -absOffset * 100; // further behind
                const scale = absOffset === 0 ? 1.05 : 0.82;
                const rotateY = offset * -25; // 3D side rotation
                const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.6 : 0.2;
                const isCenter = absOffset === 0;

                return (
                  <motion.div
                    key={student.id}
                    className="absolute w-[280px] sm:w-[320px] h-[360px] cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 30 - absOffset,
                    }}
                    animate={{
                      transform: `perspective(1000px) translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                    onClick={() => isCenter ? handleStudentClick(student) : setCurrentIndex(idx)}
                    id={`student-carousel-card-${student.id}`}
                  >
                    {/* Glowing Lantern-like Floating Card */}
                    <div 
                      className={`relative w-full h-full rounded-3xl p-6 flex flex-col justify-between border backdrop-blur-lg bg-gradient-to-b from-slate-900/80 to-slate-950/95 transition-all duration-500 overflow-hidden group select-none ${
                        isCenter 
                          ? 'border-amber-500/60 shadow-[0_0_50px_rgba(234,179,8,0.18)] hover:shadow-[0_0_65px_rgba(234,179,8,0.28)]' 
                          : 'border-slate-800/50 shadow-md'
                      }`}
                      style={{
                        animation: `swayCard ${3 + (student.id % 3)}s ease-in-out infinite alternate`
                      }}
                    >
                      {/* Sub-layers for custom background lighting effects */}
                      <div 
                        className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity" 
                        style={{ backgroundColor: student.avatarColor }}
                      />

                      {/* Sparkle decorative */}
                      <div className="absolute top-4 left-4 text-amber-500/20">
                        <Star className="w-5 h-5" />
                      </div>

                      {/* Card Header: Islamic Star Geometric Crest */}
                      <div className="flex flex-col items-center text-center mt-3">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-950/80 border text-white mb-3 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] relative overflow-hidden"
                          style={{ borderColor: student.avatarColor, boxShadow: `0 0 15px ${student.avatarColor}33` }}
                        >
                          <Star className="w-8 h-8 opacity-90 stroke-1 animate-spin" style={{ color: student.avatarColor, animationDuration: '20s' }} />
                          <span className="absolute font-sans font-bold text-xs" style={{ color: '#' }}>
                            {student.name[0]}
                          </span>
                        </div>

                        <h3 className="text-[21px] font-sans font-bold text-slate-100 tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
                          {student.name}
                        </h3>
                        
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-mono tracking-wide text-cyan-400 mt-1.5 uppercase">
                          <Award className="w-3 h-3 text-cyan-400" />
                          {student.role}
                        </div>
                      </div>

                      {/* Short personal message on card face */}
                      <p className="text-slate-300 text-xs px-2 line-clamp-3 text-center leading-relaxed font-sans font-medium italic mt-4">
                        "{student.wish}"
                      </p>

                      {/* Card Footer Interactive Trigger indicator */}
                      <div className="w-full flex justify-center mt-auto border-t border-slate-800/70 pt-4 pb-1">
                        {isCenter ? (
                          <div className="inline-flex items-center gap-2 group-hover:text-amber-300 text-amber-400/80 text-xs font-semibold tracking-wide transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Maktubni Ochish</span>
                            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono select-none">
                            Markazga keltirish
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right controller */}
            <button
              className="absolute right-2 md:right-12 z-40 bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 p-3.5 rounded-full transition-all text-amber-400 active:scale-90 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer"
              onClick={handleNext}
              id="next-carousel-btn"
            >
              <ChevronRight className="w-5 h-5 pointer-events-none" />
            </button>
          </div>
        )}
      </div>

      {/* Roster list view indicator dot dots */}
      <div className="flex gap-2 max-w-[250px] overflow-hidden py-1 mt-2">
        {filteredStudents.map((_, dotIdx) => (
          <button
            key={dotIdx}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              dotIdx === currentIndex ? 'bg-amber-400 w-4 shadow-[0_0_8px_rgba(234,179,8,1)]' : 'bg-slate-700 hover:bg-slate-500'
            }`}
            onClick={() => {
              onSparkleSound(400 + dotIdx * 30);
              setCurrentIndex(dotIdx);
            }}
            id={`indicator-dot-${dotIdx}`}
          />
        ))}
      </div>

      {/* Cinematic Zoomed Student Inspector Modal Card */}
      <AnimatePresence>
        {inspectedStudent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg z-50 select-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="student-modal-overlay"
          >
            <motion.div
              className="relative max-w-xl w-full rounded-3xl border border-amber-500/40 p-8 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950/90 shadow-2xl relative overflow-hidden"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              id={`student-detail-modal-${inspectedStudent.id}`}
            >
              {/* Outer light beam decorative overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-cyan-500/5 to-transparent pointer-events-none"
              />

              {/* Close Button UI */}
              <button
                className="absolute top-5 right-5 text-gray-400 hover:text-white bg-slate-900/80 border border-slate-800 p-2.5 rounded-full transition-colors active:scale-90 z-50 cursor-pointer"
                onClick={() => {
                  onWhooshSound();
                  setInspectedStudent(null);
                }}
                id="close-student-btn"
              >
                <X className="w-4 h-4 pointer-events-none" />
              </button>

              {/* Islamic Star Header detail */}
              <div className="flex flex-col items-center text-center mt-2 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-950/90 border relative overflow-hidden mb-3"
                  style={{ borderColor: inspectedStudent.avatarColor, boxShadow: `0 0 15px ${inspectedStudent.avatarColor}44` }}
                >
                  <Star className="w-8 h-8 opacity-80 animate-pulse" style={{ color: inspectedStudent.avatarColor }} />
                  <span className="absolute font-sans font-black text-white text-base">
                    {inspectedStudent.name[0]}
                  </span>
                </div>

                <div className="text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase">
                  HAWRU CELEBRATING SPACE
                </div>
                <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-200 tracking-tight font-sans">
                  {inspectedStudent.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono tracking-wide mt-2" style={{ color: inspectedStudent.avatarColor }}>
                  <Award className="w-3.5 h-3.5" />
                  {inspectedStudent.role}
                </span>
              </div>

              {/* Voice-like Speech Terminal Box */}
              <div className="relative rounded-2xl bg-slate-950/70 border border-slate-800/80 p-5 mb-5 shadow-inner">
                {/* Micro glowing terminal bar */}
                <div className="absolute top-3 left-4 flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-1.5">Maktub_Reader.dll</span>
                </div>

                <div className="text-right absolute top-2 right-4">
                  <button 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/20 active:scale-95 transition-all cursor-pointer"
                    onClick={() => {
                      onFireworkSound();
                      onSparkleSound(880);
                      onSparkleSound(1220);
                    }}
                    id="trigger-firework-modal-btn"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Salom_Yo'llash.wav</span>
                  </button>
                </div>

                {/* Substantially detailed personalized wish content */}
                <div className="text-slate-200 text-sm leading-relaxed font-sans pt-5">
                  <Typewriter 
                    text={inspectedStudent.detailedWish} 
                    speed={25}
                    delay={350}
                    onCharTyped={triggerTypewriterSound}
                  />
                </div>
              </div>

              {/* Heartfelt friendship memo area */}
              <div className="border-t border-slate-800/80 pt-4 px-1">
                <div className="inline-flex items-center gap-1.5 text-rose-400 font-mono text-xs tracking-wider uppercase mb-1.5">
                  <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400" />
                  Sinfdoshlik xotirasi:
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-serif italic pl-3 border-l border-rose-500/30">
                  "{inspectedStudent.friendshipMemory}"
                </p>
              </div>

              {/* Footer action button */}
              <div className="mt-8 flex justify-end gap-3 z-50 relative">
                <button
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 border border-amber-500/40 text-xs font-bold tracking-wide transition-all active:scale-95 hover:from-amber-500/30 cursor-pointer"
                  onClick={() => {
                    onFireworkSound();
                  }}
                  id="modal-firework-celebrate-btn"
                >
                  Bayram Mushaklari 🎆
                </button>
                <button
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold tracking-wide transition-all active:scale-95 cursor-pointer"
                  onClick={() => {
                    onWhooshSound();
                    setInspectedStudent(null);
                  }}
                  id="modal-close-btn"
                >
                  Orqaga qaytish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
