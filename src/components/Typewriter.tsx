/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // ms per char
  onCharTyped?: () => void;
  onComplete?: () => void;
  delay?: number;
}

export default function Typewriter({
  text,
  speed = 30,
  onCharTyped,
  onComplete,
  delay = 0
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Reset state on text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setStarted(false);

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (currentIndex >= text.length) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
      
      if (onCharTyped) {
        onCharTyped();
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [started, currentIndex, text, speed, onCharTyped, onComplete]);

  return (
    <span className="font-sans">
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-1.5 h-4 bg-amber-400 ml-0.5 animate-pulse">|</span>
      )}
    </span>
  );
}
