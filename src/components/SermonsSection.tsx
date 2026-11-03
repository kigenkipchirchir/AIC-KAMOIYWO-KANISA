import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, BookOpen, Clock, Calendar, Download, Share2, Sparkles, X, Check, FastForward } from 'lucide-react';
import { SERMONS } from '../data/churchData';
import { Sermon } from '../types/church';
import { sermonAudio } from '../utils/audioPlayer';

export const SermonsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [currentSermon, setCurrentSermon] = useState<Sermon>(SERMONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(2520); // 42 mins in seconds
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [notesModalSermon, setNotesModalSermon] = useState<Sermon | null>(null);
  const [copiedShare, setCopiedShare] = useState<string | null>(null);

  useEffect(() => {
    sermonAudio.onTimeUpdate((t) => setCurrentTime(t));
    sermonAudio.onStateChange((playing) => setIsPlaying(playing));
  }, []);

  const parseDurationSeconds = (durStr: string) => {
    const mins = parseInt(durStr.replace(/\D/g, ''), 10) || 40;
    return mins * 60;
  };

  const handleSelectSermon = (sermon: Sermon) => {
    if (currentSermon.id === sermon.id && isPlaying) {
      sermonAudio.pause();
    } else {
      setCurrentSermon(sermon);
      const durSecs = parseDurationSeconds(sermon.duration);
      setDuration(durSecs);
      sermonAudio.setDuration(durSecs);
      sermonAudio.seek(0);
      sermonAudio.play();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      sermonAudio.pause();
    } else {
      sermonAudio.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    sermonAudio.seek(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    sermonAudio.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      sermonAudio.setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      sermonAudio.setVolume(0);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newRate = speeds[nextIdx];
    setPlaybackRate(newRate);
    sermonAudio.setPlaybackRate(newRate);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleDownloadNotes = (sermon: Sermon) => {
    const text = [
      `AIC KAMOAIYWO CHURCH - SERMON NOTES`,
      `Title: ${sermon.title}`,
      `Preacher: ${sermon.preacher} (${sermon.role})`,
      `Date: ${sermon.date}`,
      `Scripture Reading: ${sermon.scripture}`,
      `Series: ${sermon.series}`,
      ``,
      `SERMON SUMMARY:`,
      sermon.description,
      ``,
      `KEY BIBLICAL TAKEAWAYS:`,
      ...sermon.keyPoints.map((pt, i) => `${i + 1}. ${pt}`),
      ``,
      `Africa Inland Church Kenya - Kamoiywo Sanctuary`,
      `"To Know Christ and Make Him Known"`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sermon.id}-study-notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = (sermon: Sermon) => {
    navigator.clipboard.writeText(`${window.location.origin}/#sermons?sermon=${sermon.id}`);
    setCopiedShare(sermon.id);
    setTimeout(() => setCopiedShare(null), 2500);
  };

  const seriesList = ['All', 'Faith & Grace', 'Family Life', 'Youth Series', 'Walking in the Spirit'];
  const filteredSermons = filter === 'All' ? SERMONS : SERMONS.filter((s) => s.series === filter);

  return (
    <section id="sermons" className="py-20 bg-[#0F2B5C] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163E82] text-amber-300 font-semibold text-xs tracking-wider uppercase mb-3 border border-blue-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Preaching the Infallible Word</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Sermons & Audio Media Center
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Listen to life-transforming messages preached from the pulpit of AIC Kamoiywo Church. Deepen your faith with expository verse-by-verse teachings on your journey with Christ.
          </p>

          {/* Series Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {seriesList.map((ser) => (
              <button
                key={ser}
                onClick={() => setFilter(ser)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filter === ser
                    ? 'bg-[#D97706] text-white shadow-lg shadow-amber-900/40'
                    : 'bg-[#163E82]/60 text-slate-300 hover:bg-[#163E82] hover:text-white'
                }`}
              >
                {ser}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Sermon Showcase Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0A1B3A] via-[#0D2248] to-[#163E82] p-6 sm:p-10 border border-blue-400/30 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded bg-[#D97706] text-white font-bold text-[11px] uppercase tracking-wider">
                  Featured Message
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  {currentSermon.series}
                </span>
                <span className="text-xs text-slate-400">• {currentSermon.date}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {currentSermon.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-amber-200 mb-4 bg-white/5 p-2 rounded-lg max-w-fit border border-white/10">
                <BookOpen className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-semibold">Scripture: {currentSermon.scripture}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-sans">
                {currentSermon.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleSelectSermon(currentSermon)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlaying ? 'Pause Sermon Audio' : 'Play Sermon Audio'}</span>
                </button>

                <button
                  onClick={() => setNotesModalSermon(currentSermon)}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#F59E0B]" />
                  <span>Sermon Study Notes</span>
                </button>

                <button
                  onClick={() => handleDownloadNotes(currentSermon)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                  title="Download Outline"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Equalizer Visualizer & Preacher Card */}
            <div className="lg:col-span-4 bg-[#091733]/80 rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D97706] to-[#F59E0B] mx-auto mb-4 flex items-center justify-center text-white shadow-lg">
                <span className="font-serif font-bold text-2xl">AIC</span>
              </div>

              <h4 className="font-serif font-bold text-lg text-white mb-0.5">
                {currentSermon.preacher}
              </h4>
              <p className="text-xs text-[#F59E0B] font-semibold mb-4">
                {currentSermon.role}
              </p>

              {/* Animated Audio Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-12 my-2 bg-black/20 rounded-xl px-4">
                {[12, 28, 40, 20, 36, 44, 24, 32, 16, 38, 22, 34, 18].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: isPlaying ? `${Math.max(8, (h + (i % 3) * 6))}%` : '20%',
                    }}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying ? 'bg-[#F59E0B] animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <p className="text-[11px] text-slate-400 mt-2">
                {isPlaying ? 'Audio playing via AIC Sanctuary stream' : 'Click play to start listening'}
              </p>
            </div>
          </div>
        </div>

        {/* Persistent Sticky Audio Player Bar */}
        <div className="sticky bottom-4 z-40 bg-[#0A1B3A]/95 backdrop-blur-xl border border-blue-400/40 rounded-2xl p-4 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:scale-105 text-white flex items-center justify-center shrink-0 shadow-md transition-transform"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <div className="min-w-0">
                <h4 className="font-serif font-bold text-sm text-white truncate max-w-[200px] sm:max-w-xs">
                  {currentSermon.title}
                </h4>
                <p className="text-xs text-amber-300 truncate">
                  {currentSermon.preacher} • {currentSermon.scripture}
                </p>
              </div>
            </div>

            {/* Middle: Progress Bar */}
            <div className="flex-1 w-full max-w-xl flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>

              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              />

              <span className="text-[11px] font-mono text-slate-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={cycleSpeed}
                className="px-2 py-1 rounded bg-[#163E82] text-xs font-mono font-semibold text-amber-300 hover:text-white"
                title="Playback speed"
              >
                {playbackRate}x
              </button>

              <div className="hidden md:flex items-center gap-1.5">
                <button onClick={toggleMute} className="text-slate-300 hover:text-white p-1">
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
                />
              </div>

              <button
                onClick={() => setNotesModalSermon(currentSermon)}
                className="p-2 rounded-lg bg-[#163E82] text-slate-200 hover:text-white"
                title="View study notes"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sermon Library Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => {
            const isSelected = currentSermon.id === sermon.id;
            return (
              <div
                key={sermon.id}
                className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#163E82] border-[#F59E0B] shadow-xl'
                    : 'bg-[#0A1B3A]/80 border-blue-400/20 hover:border-blue-400/40 hover:bg-[#0D2248]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-black/30 text-amber-300 font-medium">
                      {sermon.series}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {sermon.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2 line-clamp-2">
                    {sermon.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-1">
                    <strong className="text-white">{sermon.preacher}</strong> ({sermon.role})
                  </p>

                  <p className="text-xs text-amber-200/90 font-mono mb-3">
                    {sermon.scripture}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {sermon.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSelectSermon(sermon)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0F2B5C] hover:bg-[#D97706] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    {isSelected && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isSelected && isPlaying ? 'Playing' : 'Listen Now'}</span>
                  </button>

                  <button
                    onClick={() => setNotesModalSermon(sermon)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                    title="Read Notes"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShare(sermon)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                    title="Share Sermon"
                  >
                    {copiedShare === sermon.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sermon Study Notes Modal */}
        {notesModalSermon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn text-[#1E293B]">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setNotesModalSermon(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-bold text-xs uppercase mb-2">
                {notesModalSermon.series} • {notesModalSermon.date}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B5C] mb-2">
                {notesModalSermon.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
                <span><strong>Preacher:</strong> {notesModalSermon.preacher} ({notesModalSermon.role})</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 mb-5">
                <span className="text-xs text-amber-800 font-semibold block mb-0.5">Primary Scripture:</span>
                <span className="font-serif font-bold text-sm text-[#0F2B5C]">{notesModalSermon.scripture}</span>
              </div>

              <div className="mb-6">
                <h4 className="font-serif font-bold text-sm text-[#0F2B5C] uppercase tracking-wider mb-2">
                  Message Overview:
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {notesModalSermon.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-serif font-bold text-sm text-[#0F2B5C] uppercase tracking-wider mb-2">
                  Key Expository Points:
                </h4>
                <ul className="space-y-2">
                  {notesModalSermon.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-[#0F2B5C] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                        {i + 1}
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    handleSelectSermon(notesModalSermon);
                    setNotesModalSermon(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0F2B5C] hover:bg-[#163E82] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Sermon Now</span>
                </button>

                <button
                  onClick={() => handleDownloadNotes(notesModalSermon)}
                  className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Notes (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
