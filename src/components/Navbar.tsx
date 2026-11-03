import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Phone, MessageSquare, MapPin, ChevronRight, BookOpen, Compass } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface NavbarProps {
  onOpenGiving: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGiving }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About & Faith', href: '#about' },
    { name: 'Services', href: '#schedule' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Prayer Wall', href: '#prayer-wall' },
    { name: 'Giving', href: '#giving' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F2B5C]/95 backdrop-blur-md shadow-lg border-b border-[#1E3E7D]/40 py-2.5'
          : 'bg-[#0F2B5C] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Church Name */}
          <a href="#home" className="flex items-center gap-3 group text-left">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0F2B5C] rounded-[7px] flex items-center justify-center text-white">
                <span className="font-serif font-bold text-lg text-[#F59E0B]">AIC</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-[#FDE68A] transition-colors">
                  AIC Kamoiywo
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#163E82] text-amber-300 hidden sm:inline-block">
                  Church
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-wide font-sans">
                Africa Inland Church • Nandi County, Kenya
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-[#163E82]/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action: Give Online Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CHURCH_INFO.contact.phone.replace(/\s+/g, '')}`}
              className="text-xs text-slate-300 hover:text-white hidden xl:flex items-center gap-1.5 transition-colors"
              title="Call Church Office"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{CHURCH_INFO.contact.phone}</span>
            </a>

            <button
              onClick={onOpenGiving}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 fill-white/80" />
              <span>Give Online (M-Pesa)</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenGiving}
              className="px-3 py-1.5 rounded-md bg-[#D97706] text-white text-xs font-semibold sm:hidden flex items-center gap-1 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Give</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#163E82] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-50 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F2B5C] border-b border-[#1E3E7D] px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-[#163E82] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-[#1E3E7D] flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenGiving();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-semibold text-base shadow-lg"
              >
                <Heart className="w-5 h-5 fill-white/80" />
                <span>Give Online via M-Pesa (Paybill 247247)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mt-1">
                <a
                  href={`tel:${CHURCH_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#163E82]/70 text-slate-200 hover:text-white border border-[#234B8E]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Call Office</span>
                </a>
                <a
                  href={`https://wa.me/${CHURCH_INFO.contact.whatsapp}?text=Greetings%20in%20Jesus%27%20name%20Reverend%2C%20greetings%20from%20AIC%20Kamoiywo%20website`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-800/60 text-emerald-100 hover:text-white border border-emerald-700/50"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Line</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
