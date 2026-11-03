import React, { useState, useEffect } from 'react';
import { Clock, Radio, ChevronRight, X, Volume2, Sparkles, Copy, Check } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface TopAlertBannerProps {
  onOpenGiving: () => void;
}

export const TopAlertBanner: React.FC<TopAlertBannerProps> = ({ onOpenGiving }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLiveDemo, setIsLiveDemo] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Calculate next Sunday at 10:00 AM local time
      const currentDay = now.getDay(); // 0 is Sunday
      const daysUntilSunday = currentDay === 0 && now.getHours() < 12 ? 0 : (7 - currentDay) % 7 || 7;
      
      const targetSunday = new Date(now);
      targetSunday.setDate(now.getDate() + daysUntilSunday);
      targetSunday.setHours(10, 0, 0, 0);

      const diff = targetSunday.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPaybill = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(CHURCH_INFO.giving.paybillNumber);
    setCopiedPaybill(true);
    setTimeout(() => setCopiedPaybill(false), 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#0A1B3A] text-white text-xs border-b border-[#1E3A6D] relative z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Service Announcement & Live Indicator */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsLiveDemo(!isLiveDemo)}
            title="Click to toggle broadcast status demonstration"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/90 text-white font-semibold text-[11px] animate-pulse hover:bg-red-500 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-white"></span>
            {isLiveDemo ? 'BROADCAST LIVE NOW' : 'NEXT SUNDAY SERVICE'}
          </button>
          
          <span className="text-slate-300 hidden md:inline">|</span>

          <div className="flex items-center gap-1.5 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>
              <strong className="text-white">Sunday 10:00 AM – 12:30 PM:</strong> Main Worship & Word
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-[#0F2B5C] px-2.5 py-0.5 rounded text-[11px] text-[#FDE68A] font-mono border border-[#1E3E7D]">
            <span>Begins in:</span>
            <span className="font-bold text-white">
              {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
            </span>
          </div>
        </div>

        {/* Right: Quick M-Pesa & Navigation Links */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyPaybill}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#163E82] hover:bg-[#1E4E9E] text-slate-100 hover:text-white transition-colors border border-blue-400/20 text-[11px]"
            title="Copy M-Pesa Paybill Number"
          >
            <span className="text-[#F59E0B] font-bold">M-Pesa Paybill:</span>
            <span className="font-mono font-semibold">{CHURCH_INFO.giving.paybillNumber}</span>
            {copiedPaybill ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-slate-300" />
            )}
          </button>

          <a
            href="#sermons"
            className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Audio Sermons</span>
          </a>

          <button
            onClick={onOpenGiving}
            className="flex items-center gap-1 text-[#F59E0B] hover:text-[#FDE68A] font-semibold text-[11px] transition-colors"
          >
            <span>Give Online</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-slate-400 hover:text-white transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
