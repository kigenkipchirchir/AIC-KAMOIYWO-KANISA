import React from 'react';
import { Clock, Calendar, MapPin, Navigation, Car, Users, CheckCircle2, ExternalLink } from 'lucide-react';
import { CHURCH_INFO, SERVICE_TIMES } from '../data/churchData';

export const ServiceSchedule: React.FC = () => {
  return (
    <section id="schedule" className="py-20 bg-[#F9F9FC] text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2B5C] font-semibold text-xs tracking-wider uppercase mb-3">
            <Clock className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Worship With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Service Times & Fellowship Hours
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Whether you are joining us for the first time or looking for a church home in Nandi County, our doors are open wide. Experience heartfelt worship, sound biblical exposition, and warm Kalenjin & Swahili hospitality.
          </p>
        </div>

        {/* Timetable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {SERVICE_TIMES.map((svc, idx) => {
            const isMain = svc.badge === 'Main Service';
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
                  isMain
                    ? 'bg-gradient-to-b from-[#0F2B5C] to-[#0A1B3A] text-white shadow-xl shadow-blue-950/20 border-2 border-[#D97706]'
                    : 'bg-white border border-slate-200/80 text-[#1E293B] shadow-sm hover:border-blue-200'
                }`}
              >
                {/* Badge if present */}
                {svc.badge && (
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                      isMain
                        ? 'bg-[#D97706] text-white shadow-sm'
                        : 'bg-blue-50 text-[#0F2B5C] border border-blue-200'
                    }`}
                  >
                    {svc.badge}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs font-semibold mb-1 opacity-80">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{svc.day}</span>
                </div>

                <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-3 ${isMain ? 'text-white' : 'text-[#0F2B5C]'}`}>
                  {svc.name}
                </h3>

                <div className={`flex items-center gap-2 text-base font-bold font-mono py-2 px-3 rounded-lg mb-4 ${
                  isMain ? 'bg-white/10 text-amber-300' : 'bg-slate-50 text-[#0F2B5C] border border-slate-200'
                }`}>
                  <Clock className="w-4 h-4 text-[#D97706]" />
                  <span>{svc.time}</span>
                </div>

                <p className={`text-sm mb-5 leading-relaxed ${isMain ? 'text-slate-200' : 'text-slate-600'}`}>
                  {svc.description}
                </p>

                <div className={`pt-4 border-t text-xs flex flex-col gap-1.5 ${
                  isMain ? 'border-white/15 text-slate-300' : 'border-slate-100 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D97706]" />
                    <span><strong>Audience:</strong> {svc.audience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    <span><strong>Venue:</strong> {svc.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location & Directions Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="p-8 lg:p-12 lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-semibold text-xs tracking-wider uppercase mb-4 border border-amber-200">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>How to Reach the Sanctuary</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B5C] mb-4">
                  Find Us in Kamoiywo, Nandi County
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {CHURCH_INFO.location.address}, {CHURCH_INFO.location.county}.
                  <br />
                  <span className="text-slate-500 text-xs italic">{CHURCH_INFO.location.directionsNotes}</span>
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">From Eldoret Town (~35 minutes)</h4>
                      <p className="text-xs text-slate-600">Take the Kapsabet Highway, branch at Kamoiywo Junction near Kamoiywo Market. Church is 150m ahead.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">From Kapsabet Town (~25 minutes)</h4>
                      <p className="text-xs text-slate-600">Travel toward Eldoret via Chepterit and Kamoiywo Centre. Public matatus and boda-bodas readily available.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Secure Parking & Family Facilities</h4>
                      <p className="text-xs text-slate-600">Spacious fenced car park, dedicated mother-and-infant room, clean washrooms, and wheel-chair accessibility.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  href={CHURCH_INFO.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#0F2B5C] hover:bg-[#163E82] text-white font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4 text-[#F59E0B]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={`tel:${CHURCH_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  Need Help with Directions?
                </a>
              </div>
            </div>

            {/* Right: Map Graphic / Schematic */}
            <div className="bg-[#0A1B3A] p-8 lg:p-12 lg:col-span-6 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Sanctuary Campus Layout</span>
                  <span className="text-xs text-slate-400">GPS: 0.2031° N, 35.1054° E</span>
                </div>

                {/* Campus Map Graphic */}
                <div className="bg-[#0F2B5C] rounded-2xl p-6 border border-blue-400/30 my-4 shadow-inner">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#163E82] p-4 rounded-xl border border-blue-300/20 text-center">
                      <div className="w-3 h-3 rounded-full bg-amber-400 mx-auto mb-2 animate-ping"></div>
                      <h4 className="font-bold text-sm text-white">Main Sanctuary</h4>
                      <p className="text-[11px] text-slate-300">Seating Capacity 800+ with Balcony & Choir Loft</p>
                    </div>

                    <div className="bg-[#163E82] p-4 rounded-xl border border-blue-300/20 text-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto mb-2"></div>
                      <h4 className="font-bold text-sm text-white">AIC Academy & Sunday School</h4>
                      <p className="text-[11px] text-slate-300">Modern classrooms for Children Ministry</p>
                    </div>

                    <div className="bg-[#163E82] p-4 rounded-xl border border-blue-300/20 text-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mx-auto mb-2"></div>
                      <h4 className="font-bold text-sm text-white">Youth Hall & Grounds</h4>
                      <p className="text-[11px] text-slate-300">AYF Fellowship, Games & Audio Visual Control</p>
                    </div>

                    <div className="bg-[#163E82] p-4 rounded-xl border border-blue-300/20 text-center">
                      <div className="w-3 h-3 rounded-full bg-purple-400 mx-auto mb-2"></div>
                      <h4 className="font-bold text-sm text-white">Secure Compound Parking</h4>
                      <p className="text-[11px] text-slate-300">Safe parking for 100+ vehicles & motorbikes</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-400/20 text-center text-xs text-slate-300">
                    <span>Highway Junction: Kamoiywo Market &rarr; 150m to Main Church Gate</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 text-xs text-slate-400 flex items-center justify-between">
                <span>Africa Inland Church (Kenya)</span>
                <span>Nandi Central DCC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
