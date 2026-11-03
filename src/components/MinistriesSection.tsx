import React, { useState } from 'react';
import { Users, Calendar, MapPin, ArrowRight, X, CheckCircle, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';
import { MINISTRIES, CHURCH_INFO } from '../data/churchData';
import { Ministry } from '../types/church';

export const MinistriesSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'fellowship' | 'youth' | 'service' | 'outreach'>('all');
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const filtered = filter === 'all' ? MINISTRIES : MINISTRIES.filter((m) => m.category === filter);

  return (
    <section id="ministries" className="py-20 bg-white text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-semibold text-xs tracking-wider uppercase mb-3 border border-amber-200">
            <Users className="w-3.5 h-3.5" />
            <span>Body of Christ in Action</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Church Ministries & Fellowships
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            There is a vibrant community for everyone at AIC Kamoiywo. Discover your gifts, build lifelong friendships, and serve Christ through our specialized ministries.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Ministries ({MINISTRIES.length})
            </button>
            <button
              onClick={() => setFilter('fellowship')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'fellowship'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Adult Fellowships (CWA & CMA)
            </button>
            <button
              onClick={() => setFilter('youth')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'youth'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Youth & Children (AYF & Sunday School)
            </button>
            <button
              onClick={() => setFilter('service')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'service'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Worship & Music
            </button>
            <button
              onClick={() => setFilter('outreach')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'outreach'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Missions & Mercy
            </button>
          </div>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((ministry) => (
            <div
              key={ministry.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#0F2B5C] text-[#F59E0B]">
                    {ministry.shortName}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {ministry.membersCount}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2B5C] mb-1 group-hover:text-[#D97706] transition-colors">
                  {ministry.name}
                </h3>
                <p className="text-xs text-slate-500 italic mb-3 font-sans">
                  {ministry.swahiliName}
                </p>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6 font-sans">
                  {ministry.description}
                </p>
              </div>

              <div>
                <div className="space-y-2 py-3 border-t border-slate-100 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                    <span className="font-medium text-slate-700">{ministry.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#D97706]" />
                    <span><strong>Leader:</strong> {ministry.leader}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMinistry(ministry)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0F2B5C] text-[#0F2B5C] hover:text-white font-semibold text-xs sm:text-sm border border-slate-200 hover:border-[#0F2B5C] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>View Details & How to Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ministry Details Modal */}
        {selectedMinistry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-100">
              <button
                onClick={() => setSelectedMinistry(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-bold text-xs uppercase mb-3">
                {selectedMinistry.shortName} • {selectedMinistry.swahiliName}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B5C] mb-2">
                {selectedMinistry.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                {selectedMinistry.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 mb-6">
                <div>
                  <span className="text-slate-400 block mb-0.5">Meeting Schedule:</span>
                  <span className="font-semibold text-[#0F2B5C]">{selectedMinistry.meetingTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Gathering Venue:</span>
                  <span className="font-semibold text-[#0F2B5C]">{selectedMinistry.meetingPlace}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Ministry Leader:</span>
                  <span className="font-semibold text-[#0F2B5C]">{selectedMinistry.leader}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Community Size:</span>
                  <span className="font-semibold text-[#D97706]">{selectedMinistry.membersCount}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-serif font-bold text-base text-[#0F2B5C] mb-3">
                  Key Ministry Objectives & Activities:
                </h4>
                <ul className="space-y-2.5">
                  {selectedMinistry.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/${CHURCH_INFO.contact.whatsapp}?text=Hello%20AIC%20Kamoiywo%2C%20I%20would%20like%20to%20inquire%20about%20joining%20the%20${encodeURIComponent(selectedMinistry.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Leader on WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedMinistry(null)}
                  className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
