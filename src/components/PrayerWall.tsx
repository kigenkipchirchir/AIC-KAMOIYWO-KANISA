import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, Filter, Check, Clock, Flame, Users, Shield, MessageCircle } from 'lucide-react';

export interface AnonymousPrayerRequest {
  id: string;
  category: 'Healing' | 'Family' | 'Faith & Guidance' | 'Financial & Work' | 'Thanksgiving' | 'Youth & School';
  request: string;
  timestamp: string; // e.g. "2 hours ago"
  prayerCount: number;
  initials?: string;
  locationTag?: string;
}

const DEFAULT_PRAYERS: AnonymousPrayerRequest[] = [
  {
    id: 'pw-1',
    category: 'Healing',
    request: 'Please pray for my mother who is undergoing medical tests in Eldoret this week. Praying for peace and complete divine restoration.',
    timestamp: 'Just now',
    prayerCount: 14,
    initials: 'Sister in Christ',
    locationTag: 'Kamoiywo',
  },
  {
    id: 'pw-2',
    category: 'Youth & School',
    request: 'Praying for our KCSE candidates sitting their national examinations. May the Holy Spirit grant them sharp remembrance, calm minds, and divine favor.',
    timestamp: '2 hours ago',
    prayerCount: 28,
    initials: 'Concerned Parent',
    locationTag: 'Nandi Hills',
  },
  {
    id: 'pw-3',
    category: 'Financial & Work',
    request: 'Seeking God’s wisdom and open doors for employment after graduation. Trusting Proverbs 3:5-6 for direction in my career steps.',
    timestamp: '5 hours ago',
    prayerCount: 19,
    initials: 'Young Professional',
    locationTag: 'Kapsabet',
  },
  {
    id: 'pw-4',
    category: 'Family',
    request: 'Please intercede for unity and forgiveness in our extended family. Believing God to break every cycle of misunderstanding and restore joy.',
    timestamp: 'Yesterday',
    prayerCount: 35,
    initials: 'Anonymous Member',
    locationTag: 'Cheptil',
  },
  {
    id: 'pw-5',
    category: 'Thanksgiving',
    request: 'Praising God for safe travel mercies and the successful dedication of our baby last Sunday at AIC Kamoiywo. The Lord is truly good!',
    timestamp: 'Yesterday',
    prayerCount: 42,
    initials: 'Grateful Family',
    locationTag: 'Kamoiywo Centre',
  },
  {
    id: 'pw-6',
    category: 'Faith & Guidance',
    request: 'Pray for spiritual revival in my personal prayer life. Asking God for renewed hunger for His Word and boldness to witness to neighbors.',
    timestamp: '2 days ago',
    prayerCount: 22,
    initials: 'Church Member',
    locationTag: 'Sirwa',
  },
];

const STORAGE_KEY = 'aic_kamoiywo_prayer_wall_v1';
const PRAYED_STORAGE_KEY = 'aic_kamoiywo_prayed_ids_v1';

export const PrayerWall: React.FC = () => {
  const [prayers, setPrayers] = useState<AnonymousPrayerRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PRAYERS;
  });

  const [prayedIds, setPrayedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(PRAYED_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newRequestText, setNewRequestText] = useState('');
  const [newCategory, setNewCategory] = useState<AnonymousPrayerRequest['category']>('Healing');
  const [newLocationTag, setNewLocationTag] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submittedAlert, setSubmittedAlert] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
    } catch {
      // ignore
    }
  }, [prayers]);

  useEffect(() => {
    try {
      localStorage.setItem(PRAYED_STORAGE_KEY, JSON.stringify(prayedIds));
    } catch {
      // ignore
    }
  }, [prayedIds]);

  const handlePrayClick = (id: string) => {
    const isAlreadyPrayed = !!prayedIds[id];

    setPrayers((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            prayerCount: isAlreadyPrayed ? Math.max(0, item.prayerCount - 1) : item.prayerCount + 1,
          };
        }
        return item;
      })
    );

    setPrayedIds((prev) => {
      const updated = { ...prev };
      if (isAlreadyPrayed) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestText.trim()) return;

    const newPrayer: AnonymousPrayerRequest = {
      id: `pw-${Date.now()}`,
      category: newCategory,
      request: newRequestText.trim(),
      timestamp: 'Just now',
      prayerCount: 1, // Author starts with 1 prayer
      initials: 'Anonymous Member',
      locationTag: newLocationTag.trim() || 'Nandi County',
    };

    setPrayers([newPrayer, ...prayers]);
    // Mark as prayed by poster
    setPrayedIds((prev) => ({ ...prev, [newPrayer.id]: true }));

    setNewRequestText('');
    setNewLocationTag('');
    setShowForm(false);
    setSubmittedAlert(true);
    setTimeout(() => setSubmittedAlert(false), 4000);
  };

  const categories = [
    'All',
    'Healing',
    'Family',
    'Faith & Guidance',
    'Financial & Work',
    'Youth & School',
    'Thanksgiving',
  ];

  const filteredPrayers = selectedCategory === 'All'
    ? prayers
    : prayers.filter((p) => p.category === selectedCategory);

  const totalPrayersCount = prayers.reduce((acc, curr) => acc + curr.prayerCount, 0);

  return (
    <section id="prayer-wall" className="py-20 bg-white text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-semibold text-xs tracking-wider uppercase mb-3 border border-amber-200">
            <Flame className="w-3.5 h-3.5 fill-[#D97706]/30 text-[#D97706]" />
            <span>Fellowship in Intercession</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Community Prayer Wall
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            “Bear one another’s burdens, and so fulfill the law of Christ.” — Galatians 6:2.
            Post a short prayer request anonymously, lift up your brothers and sisters in Christ, and click <strong>“I Prayed”</strong> to let them know they are not alone.
          </p>

          {/* Aggregate Community Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs sm:text-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium border border-slate-200">
              <MessageCircle className="w-4 h-4 text-[#0F2B5C]" />
              <span><strong>{prayers.length}</strong> Prayer Petitions</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 font-medium border border-amber-200">
              <Heart className="w-4 h-4 text-[#D97706] fill-[#D97706]/40" />
              <span><strong>{totalPrayersCount}</strong> Prayers Lifted by Church Family</span>
            </div>
          </div>
        </div>

        {/* Action Bar: Post Request Button + Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0F2B5C] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Trigger to Open Post Form */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>{showForm ? 'Close Post Form' : 'Post Anonymous Prayer Request'}</span>
          </button>
        </div>

        {/* Post Form Drawer / Modal Area */}
        {showForm && (
          <div className="mb-10 bg-gradient-to-br from-[#F9F9FC] to-[#F1F4F9] rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-xl transition-all animate-fadeIn">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    100% Anonymous • No Name or Phone Required
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Visible to church family</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Prayer Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(['Healing', 'Family', 'Faith & Guidance', 'Financial & Work', 'Youth & School', 'Thanksgiving'] as const).map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewCategory(cat)}
                          className={`p-2 rounded-xl text-left text-xs transition-all border ${
                            newCategory === cat
                              ? 'bg-[#0F2B5C] text-white font-semibold border-[#0F2B5C] shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Prayer Petition (Short & Encouraging) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    maxLength={320}
                    placeholder="Write your prayer request briefly so brothers and sisters can stand in faith with you..."
                    value={newRequestText}
                    onChange={(e) => setNewRequestText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F2B5C] focus:ring-1 focus:ring-[#0F2B5C]"
                  />
                  <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                    <span>Keep personal names private if sensitive.</span>
                    <span>{newRequestText.length} / 320 characters</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Optional Location / Village Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kamoiywo, Cheptil, Kapsabet"
                      value={newLocationTag}
                      onChange={(e) => setNewLocationTag(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F2B5C]"
                    />
                  </div>

                  <div className="sm:pt-5 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newRequestText.trim()}
                      className="px-5 py-2.5 rounded-xl bg-[#0F2B5C] hover:bg-[#163E82] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post to Prayer Wall</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Banner */}
        {submittedAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-semibold">
                Your prayer request has been posted to the prayer wall. The congregation is standing with you in faith!
              </span>
            </div>
            <button
              onClick={() => setSubmittedAlert(false)}
              className="text-xs text-emerald-700 hover:underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Prayer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrayers.map((prayer) => {
            const hasPrayed = !!prayedIds[prayer.id];

            return (
              <div
                key={prayer.id}
                className="bg-[#F9F9FC] rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-amber-300 relative"
              >
                <div>
                  {/* Category & Timestamp Top Row */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-[#D97706] border border-amber-200">
                      {prayer.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{prayer.timestamp}</span>
                    </div>
                  </div>

                  {/* Prayer Content */}
                  <p className="text-sm text-slate-700 leading-relaxed font-sans mb-4 min-h-[4.5rem]">
                    “{prayer.request}”
                  </p>
                </div>

                {/* Footer of Card: Anonymous Member Tag + 'I Prayed' Action Button */}
                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500 font-sans">
                    <span className="font-semibold text-slate-700 block">
                      {prayer.initials || 'Anonymous Member'}
                    </span>
                    {prayer.locationTag && (
                      <span className="text-[10px] text-slate-400">
                        {prayer.locationTag}
                      </span>
                    )}
                  </div>

                  {/* "I Prayed" Button */}
                  <button
                    onClick={() => handlePrayClick(prayer.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                      hasPrayed
                        ? 'bg-amber-100 text-[#B45309] border border-amber-300 scale-105'
                        : 'bg-white hover:bg-amber-50 text-slate-700 hover:text-[#0F2B5C] border border-slate-200 hover:border-amber-200'
                    }`}
                    title={hasPrayed ? 'Click to undo prayer count' : 'Click to pray for this brother/sister'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        hasPrayed
                          ? 'fill-[#D97706] text-[#D97706]'
                          : 'text-slate-400 group-hover:text-amber-500'
                      }`}
                    />
                    <span>{hasPrayed ? 'I Prayed' : 'I Prayed'}</span>
                    <span
                      className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                        hasPrayed ? 'bg-amber-200/80 text-amber-900' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {prayer.prayerCount}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filtered */}
        {filteredPrayers.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-sm text-slate-500">
              No prayer requests found under this category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-2 text-xs text-[#0F2B5C] font-semibold underline"
            >
              View all requests
            </button>
          </div>
        )}

        {/* Bottom Scriptural Encouragement Note */}
        <div className="mt-12 text-center max-w-xl mx-auto p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-slate-600">
          <p className="font-serif italic text-[#0F2B5C]">
            “Therefore confess your sins to each other and pray for each other so that you may be healed.” — James 5:16
          </p>
        </div>
      </div>
    </section>
  );
};
