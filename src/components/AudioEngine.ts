/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private chordIndex: number = 0;

  // Cinematic beautiful chord progressions
  // Am9, Fmaj9, Cmaj9, G6
  private chords = [
    [110, 165, 220, 261.63, 329.63, 392.00], // A minor 9 (A, E, A, C, E, G)
    [87.31, 130.81, 174.61, 218.27, 261.63, 349.23], // F major 9 (F, C, F, A, C, F)
    [130.81, 196.00, 261.63, 329.63, 392.00, 493.88], // C major 9 (C, G, C, E, G, B)
    [98.00, 146.83, 196.00, 246.94, 293.66, 392.00],  // G major 6 (G, D, G, B, D, G)
  ];

  constructor() {
    // Audio Context is initialized lazily upon user interaction to satisfy browser security
  }

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      // Setup master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API is not supported or was blocked:", e);
    }
  }

  // Toggle ambient music
  public startMusic() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = false;
    // Fade in master volume
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0.35, now + 3.0); // Safe volume

    // Play initial pad chords
    this.setupAmbientPad();
    this.triggerNextChord();

    // Schedule chord transitions every 7 seconds
    if (this.musicInterval) clearInterval(this.musicInterval);
    this.musicInterval = setInterval(() => {
      this.triggerNextChord();
    }, 7000);
  }

  public stopMusic() {
    if (!this.ctx || !this.masterGain) return;
    this.isMuted = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);
  }

  public toggle() {
    if (this.isMuted) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    return this.isMuted;
  }

  public getIsMuted() {
    return this.isMuted;
  }

  private setupAmbientPad() {
    if (!this.ctx || !this.masterGain) return;

    // We instantiate 6 synth oscillators for 6 voice chords
    for (let i = 0; i < 6; i++) {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      // Soft triangle & sine mixture
      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      // Low pass filter to make the pad super warm and cinematic
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550 + i * 50, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.0, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);
      osc.start();

      this.ambientOscillators.push({ osc, gain: gainNode });
    }
  }

  private triggerNextChord() {
    if (!this.ctx || this.isMuted || this.ambientOscillators.length === 0) return;

    const now = this.ctx.currentTime;
    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    // Gracefully fade old frequencies out and morph into new ones
    this.ambientOscillators.forEach((voice, index) => {
      const targetFreq = chord[index] || chord[0];
      
      // Slightly detune to create lush natural chorus
      const detuneAmount = (index - 2.5) * 1.5; 

      voice.osc.frequency.cancelScheduledValues(now);
      voice.osc.frequency.exponentialRampToValueAtTime(targetFreq + detuneAmount, now + 3.0);

      // Soft swell pattern for voice dynamic levels
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
      // Main notes are louder, higher harmonics are softer
      const voiceVol = (0.04 - (index * 0.004)) * (Math.random() * 0.4 + 0.8);
      voice.gain.gain.linearRampToValueAtTime(voiceVol, now + 2.5);
    });
  }

  // Single cosmic sound chime / twinkle
  public playSparkle(baseFreq: number = 600) {
    this.init();
    if (!this.ctx || this.isMuted || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    // Pitch envelope: drops slightly
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.8);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05); // quick attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2); // long shimmer release

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(now + 1.5);
  }

  // Interstellar sweep / whoosh effect (for transitions)
  public playWhoosh() {
    this.init();
    if (!this.ctx || this.isMuted || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Create random noise buffer
    const bufferSize = this.ctx.sampleRate * 1.5; // 1.5 seconds whoosh
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(100, now);
    // Sweep the filter upwards dramatically
    filter.frequency.exponentialRampToValueAtTime(2500, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.4);
    filter.Q.setValueAtTime(4.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.6); // swells up
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // falls down

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseNode.start();
    noiseNode.stop(now + 1.5);
  }

  // Festive explosion sound (soft synthetic fireworks)
  public playFirework() {
    this.init();
    if (!this.ctx || this.isMuted || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Low rumble boom
    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(120, now);
    boomOsc.frequency.exponentialRampToValueAtTime(20, now + 0.6);
    
    boomGain.gain.setValueAtTime(0.18, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    
    boomOsc.connect(boomGain);
    boomGain.connect(this.masterGain);
    boomOsc.start();
    boomOsc.stop(now + 0.8);

    // Crackling sparkles
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        if (this.isMuted) return;
        this.playSparkle(900 + Math.random() * 600);
      }, 100 + i * 150 + Math.random() * 80);
    }
  }
}

// Global Singleton for instant import
export const audio = new AudioEngine();
