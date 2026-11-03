import React from 'react';
import { Users, BookOpen, Quote, Shield, Phone, Sparkles } from 'lucide-react';
import { LEADERSHIP } from '../data/churchData';

export const LeadershipGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#F1F4F9] text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2B5C] font-semibold text-xs tracking-wider uppercase mb-3">
            <Shield className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Spiritual Oversight</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Pastoral & Church Leadership
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Men and women called by God, sustained by grace, and dedicated to shepherding the flock of Christ at AIC Kamoiywo with integrity, prayer, and humility.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-50 text-[#D97706] border border-amber-200/60">
                    {leader.title}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#0F2B5C] group-hover:text-amber-400 transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0F2B5C] mb-1 group-hover:text-[#D97706] transition-colors">
                  {leader.name}
                </h3>

                <p className="text-xs font-semibold text-[#D97706] mb-4">
                  {leader.role}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                {leader.verse && (
                  <p className="text-xs font-serif italic text-slate-500 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {leader.verse}
                  </p>
                )}

                {leader.phone && (
                  <a
                    href={`tel:${leader.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#0F2B5C] font-semibold hover:text-[#D97706] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{leader.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
