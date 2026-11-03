import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Play, Heart, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import heroImg from '../assets/images/church_worship_hero_1793205943513.jpg';

interface HeroSectionProps {
  onOpenGiving: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenGiving }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday
      // If today is Sunday before 12:30pm, target is today; otherwise next Sunday
      let daysToAdd = (7 - currentDay) % 7;
      if (currentDay === 0 && now.getHours() >= 13) {
        daysToAdd = 7;
      }
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + daysToAdd);
      nextSunday.setHours(10, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A1B3A]">
      {/* Background Photography with Rich Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="AIC Kamoiywo Church Congregation in Joyful Worship"
          className="w-full h-full object-cover object-center filter brightness-95 scale-105 transform animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071329]/95 via-[#0A1B3A]/85 to-[#0F2B5C]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3A] via-transparent to-[#071329]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center sm:text-left">
        <div className="max-w-3xl">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163E82]/80 border border-blue-400/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Africa Inland Church • Nandi County</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-200">Karibu Nyumbani</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Welcome to <br />
            <span className="bg-gradient-to-r from-white via-amber-100 to-[#F59E0B] bg-clip-text text-transparent">
              AIC Kamoiywo
            </span>{' '}
            Church
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 font-sans leading-relaxed max-w-2xl font-normal">
            A vibrant Christian community rooted in the living Word of God, steadfast in faith, fervent in prayer, and committed to loving fellowship across Nandi County.
          </p>

          {/* Service Times Quick Pill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-xl text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-[#F59E0B] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-300 font-medium">Sunday Main Service</p>
                <p className="text-sm font-semibold text-white">10:00 AM – 12:30 PM EAT</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-300 font-medium">Sanctuary Location</p>
                <p className="text-sm font-semibold text-white">Kamoiywo Centre, Nandi</p>
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <a
              href="#schedule"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white font-semibold text-base shadow-lg shadow-amber-900/30 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Join Us This Sunday</span>
            </a>

            <a
              href="#sermons"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-base backdrop-blur-md border border-white/25 transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              <span>Listen to Sermons</span>
            </a>

            <button
              onClick={onOpenGiving}
              className="px-5 py-3.5 rounded-xl bg-[#0F2B5C]/90 hover:bg-[#163E82] text-amber-300 hover:text-white font-semibold text-base border border-blue-400/40 backdrop-blur-md transition-all duration-200 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-amber-400/30 text-amber-400" />
              <span>Give via M-Pesa</span>
            </button>
          </div>
        </div>

        {/* Right Floating Card: Next Sunday Service Countdown */}
        <div className="mt-12 lg:mt-0 lg:absolute lg:right-8 lg:bottom-16 w-full max-w-sm mx-auto">
          <div className="rounded-2xl bg-[#0F2B5C]/90 backdrop-blur-xl border border-blue-400/25 p-5 shadow-2xl text-left">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Countdown to Next Service
              </span>
              <span className="text-[11px] text-slate-300">Sunday 10:00 AM</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center my-3">
              <div className="bg-[#091733]/80 rounded-xl p-2.5 border border-white/10">
                <div className="text-2xl font-bold font-mono text-white">{countdown.days}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Days</div>
              </div>
              <div className="bg-[#091733]/80 rounded-xl p-2.5 border border-white/10">
                <div className="text-2xl font-bold font-mono text-white">{countdown.hours}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Hours</div>
              </div>
              <div className="bg-[#091733]/80 rounded-xl p-2.5 border border-white/10">
                <div className="text-2xl font-bold font-mono text-white">{countdown.minutes}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Mins</div>
              </div>
              <div className="bg-[#091733]/80 rounded-xl p-2.5 border border-white/10">
                <div className="text-2xl font-bold font-mono text-[#F59E0B]">{countdown.seconds}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Secs</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sunday School 8:30 AM
              </span>
              <a
                href="#schedule"
                className="text-amber-400 hover:text-amber-300 font-semibold underline text-[11px]"
              >
                Full Timetable &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#schedule"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors animate-bounce p-1"
        aria-label="Scroll down to services"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
