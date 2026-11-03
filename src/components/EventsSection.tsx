import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Download, ExternalLink, Sparkles, X, Check } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/churchData';
import { ChurchEvent } from '../types/church';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const EventsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'revival' | 'youth' | 'community' | 'fellowship'>('all');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [downloadedEventId, setDownloadedEventId] = useState<string | null>(null);

  const filteredEvents = filter === 'all' ? UPCOMING_EVENTS : UPCOMING_EVENTS.filter((e) => e.category === filter);

  const handleDownload = (e: React.MouseEvent, event: ChurchEvent) => {
    e.stopPropagation();
    downloadIcsFile(event);
    setDownloadedEventId(event.id);
    setTimeout(() => setDownloadedEventId(null), 2500);
  };

  const formatDateDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return {
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: day,
      year: year,
    };
  };

  return (
    <section id="events" className="py-20 bg-[#F9F9FC] text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2B5C] font-semibold text-xs tracking-wider uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Mark Your Calendar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Upcoming Events & Gatherings
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Join us for life-changing conferences, youth camps, prayer keshas, and community outreach events across AIC Kamoiywo.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Events ({UPCOMING_EVENTS.length})
            </button>
            <button
              onClick={() => setFilter('revival')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'revival'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Revival & Conferences
            </button>
            <button
              onClick={() => setFilter('youth')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'youth'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Youth & Camps
            </button>
            <button
              onClick={() => setFilter('community')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'community'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Community & Health
            </button>
            <button
              onClick={() => setFilter('fellowship')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === 'fellowship'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Thanksgiving & Holidays
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredEvents.map((event) => {
            const dateObj = formatDateDisplay(event.startDate);
            const googleCalUrl = createGoogleCalendarUrl(event);

            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-blue-200"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Date Badge Box */}
                    <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-gradient-to-br from-[#0F2B5C] to-[#0A1B3A] text-white flex flex-col items-center justify-center shrink-0 shadow-md border-2 border-amber-400/30">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300">
                        {dateObj.month}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold font-serif leading-none my-0.5">
                        {dateObj.day}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {dateObj.year}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-[#D97706] border border-amber-200">
                          {event.category}
                        </span>
                        {event.isFeatured && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#0F2B5C] border border-blue-200">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2B5C] group-hover:text-[#D97706] transition-colors">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-5 font-sans">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{event.location}</span>
                    </div>
                    {event.speaker && (
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#D97706]" />
                        <span><strong>Minister:</strong> {event.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Calendar Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F2B5C] hover:bg-[#163E82] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add to Google Calendar</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>

                  <button
                    onClick={(e) => handleDownload(e, event)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    title="Download .ics file for Outlook or Apple Calendar"
                  >
                    {downloadedEventId === event.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>.ics File</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D97706] font-semibold text-xs border border-amber-200 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-bold text-xs uppercase mb-3">
                {selectedEvent.category} • AIC Kamoiywo
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B5C] mb-4">
                {selectedEvent.title}
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700 mb-6">
                <div>
                  <span className="text-slate-400 block mb-0.5">Dates & Timetable:</span>
                  <span className="font-semibold text-[#0F2B5C]">{selectedEvent.startDate} {selectedEvent.endDate ? `to ${selectedEvent.endDate}` : ''} • {selectedEvent.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Venue:</span>
                  <span className="font-semibold text-[#0F2B5C]">{selectedEvent.location}</span>
                </div>
                {selectedEvent.speaker && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">Guest Speaker / Ministers:</span>
                    <span className="font-semibold text-[#D97706]">{selectedEvent.speaker}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="font-serif font-bold text-sm text-[#0F2B5C] uppercase tracking-wider mb-2">
                  Event Description & Guidelines:
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  href={createGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0F2B5C] hover:bg-[#163E82] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={(e) => handleDownload(e, selectedEvent)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ics</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
