// Lightweight Web Audio API synthesizer for realistic sermon preview playback

class SermonAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onStateChangeCallback: ((playing: boolean) => void) | null = null;
  private currentTime = 0;
  private duration = 2520; // 42 minutes standard
  private playbackRate = 1.0;
  private gainNode: GainNode | null = null;
  private oscillator: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setDuration(seconds: number) {
    this.duration = seconds;
  }

  public getDuration() {
    return this.duration;
  }

  public getCurrentTime() {
    return this.currentTime;
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
  }

  public onTimeUpdate(cb: (time: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public onStateChange(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public play() {
    this.init();
    if (this.isPlaying) return;

    this.isPlaying = true;
    if (this.onStateChangeCallback) this.onStateChangeCallback(true);

    try {
      if (this.ctx) {
        // Create soft warm ambient organ / vocal synth tone representing sanctuary audio
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.04, this.ctx.currentTime);

        this.oscillator = this.ctx.createOscillator();
        this.oscillator.type = 'triangle';
        this.oscillator.frequency.setValueAtTime(220, this.ctx.currentTime); // Warm A3 note

        // Gentle soothing choir-like modulation
        this.lfo = this.ctx.createOscillator();
        this.lfo.frequency.setValueAtTime(2.5, this.ctx.currentTime);
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(4, this.ctx.currentTime);
        this.lfo.connect(lfoGain);
        lfoGain.connect(this.oscillator.frequency);

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.oscillator.start();
        this.lfo.start();
      }
    } catch {
      // Graceful fallback if audio permissions restricted
    }

    if (this.timer) clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.currentTime += 1 * this.playbackRate;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
        this.pause();
      }
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime);
      }
    }, 1000);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);

    try {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      if (this.lfo) {
        this.lfo.stop();
        this.lfo.disconnect();
        this.lfo = null;
      }
    } catch {
      // ignore cleanup
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime);
    }
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)) * 0.08, this.ctx.currentTime);
    }
  }
}

export const sermonAudio = new SermonAudioEngine();
