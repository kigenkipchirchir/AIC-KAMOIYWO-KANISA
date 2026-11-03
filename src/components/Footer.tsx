import React from 'react';
import { Heart, MapPin, Phone, Mail, Clock, MessageSquare, ChevronRight, ExternalLink } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface FooterProps {
  onOpenGiving: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGiving }) => {
  return (
    <footer className="bg-[#071329] text-white pt-16 pb-12 border-t border-[#163E82]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#0F2B5C] rounded-[7px] flex items-center justify-center text-white">
                  <span className="font-serif font-bold text-lg text-[#F59E0B]">AIC</span>
                </div>
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-tight">
                  AIC Kamoiywo
                </span>
                <p className="text-xs text-amber-300 font-sans">
                  Africa Inland Church Kenya
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              A community of faith, hope, and love rooted in God’s infallible Word. Dedicated to discipleship, family fellowship, and frontier missions across Nandi County and beyond.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-amber-300 uppercase font-semibold block mb-0.5">
                Our Mandate:
              </span>
              <p className="font-serif italic text-xs text-slate-200">
                “{CHURCH_INFO.motto}”
              </p>
            </div>
          </div>

          {/* Col 2: Service Hours Timetable */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-white/10 pb-2">
              Sunday Timetable
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <span className="text-amber-300 font-semibold block">8:30 AM – 9:45 AM</span>
                <span>Sunday School & Morning Bible Study</span>
              </div>
              <div>
                <span className="text-amber-300 font-semibold block">10:00 AM – 12:30 PM</span>
                <span>Main Celebration Worship & Sermon</span>
              </div>
              <div>
                <span className="text-amber-300 font-semibold block">2:00 PM – 4:30 PM</span>
                <span>Africa Youth Fellowship (AYF & Teens)</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-slate-400 block">Mid-Week:</span>
                <span>Wed: Cell Groups 5:00 PM • Fri: Prayer 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-white/10 pb-2">
              Explore
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>About & Faith</span>
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Services & Venue</span>
                </a>
              </li>
              <li>
                <a href="#ministries" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Ministries</span>
                </a>
              </li>
              <li>
                <a href="#sermons" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Audio Sermons</span>
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Upcoming Events</span>
                </a>
              </li>
              <li>
                <a href="#prayer-wall" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Community Prayer Wall</span>
                </a>
              </li>
              <li>
                <a href="#giving" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Giving & M-Pesa</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Prayer Request</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: M-Pesa Stewardship & Sanctuary Location */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-white border-b border-white/10 pb-2">
              Lipa na M-Pesa
            </h4>
            <div className="p-3.5 rounded-2xl bg-[#091733] border border-blue-400/20 text-xs">
              <span className="text-slate-400 block mb-0.5">Paybill Business Number:</span>
              <span className="font-mono text-xl font-bold text-amber-300 block mb-2">247247</span>
              <span className="text-slate-400 block mb-0.5">Account Reference:</span>
              <span className="font-mono text-white font-semibold">TITHE / OFFERING / BUILDING</span>

              <button
                onClick={onOpenGiving}
                className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] transition-transform"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Give Online Now</span>
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Kamoiywo Centre, Nandi County, Kenya</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Office: {CHURCH_INFO.contact.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <p>© 2026 AIC Kamoiywo Church. Africa Inland Church Kenya. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${CHURCH_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Channel</span>
            </a>
            <span>•</span>
            <a href="#schedule" className="hover:text-amber-300 transition-colors">
              Campus Directions
            </a>
            <span>•</span>
            <a href="#about" className="hover:text-amber-300 transition-colors">
              Statement of Faith
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
