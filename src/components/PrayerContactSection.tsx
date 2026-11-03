import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Send, CheckCircle2, Shield, Heart, Sparkles, Clock } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const PrayerContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Healing & Health',
    isAnonymous: false,
    isPastoralOnly: true,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    'Healing & Health',
    'Family & Marriage',
    'Financial Breakthrough',
    'Youth & Academic Exams',
    'Spiritual Guidance & Salvation',
    'Thanksgiving & Testimony',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleWhatsAppPrayer = () => {
    const text = encodeURIComponent(
      `Greetings in Jesus' name Reverend (AIC Kamoiywo),\nI am submitting a prayer request:\n\n*Category:* ${formData.category}\n*From:* ${formData.isAnonymous ? 'Anonymous Member' : formData.name || 'Brother/Sister in Christ'}\n*Phone:* ${formData.phone || 'N/A'}\n\n*Prayer Request:*\n${formData.message || 'Please pray with me for God’s intervention in my situation.'}`
    );
    window.open(`https://wa.me/${CHURCH_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#F9F9FC] text-[#1E293B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2B5C] font-semibold text-xs tracking-wider uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-[#D97706]" />
            <span>We Are Here For You</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Prayer Requests & Pastoral Contact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            “The prayer of a righteous person is powerful and effective.” — James 5:16.
            Our pastoral team and intercessors lift up every need in prayer.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Prayer Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F2B5C]">
                  Your Prayer Request Has Been Received
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Rev. Jonah Somasis and the prayer team will be interceding for you. Remember that God is faithful and He hears the cries of His children.
                </p>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto text-xs text-[#0F2B5C] font-serif italic">
                  “Cast all your anxiety on Him because He cares for you.” — 1 Peter 5:7
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        category: 'Healing & Health',
                        isAnonymous: false,
                        isPastoralOnly: true,
                        message: '',
                      });
                    }}
                    className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
                  >
                    Submit Another Request
                  </button>

                  <button
                    onClick={handleWhatsAppPrayer}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Also Send to WhatsApp Prayer Line</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2B5C]">
                      Confidential Prayer Request
                    </h3>
                    <p className="text-xs text-slate-500">Shared strictly with our pastor and intercessory elders</p>
                  </div>
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>

                {/* Category Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Prayer Need Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`p-2 rounded-xl text-left text-xs transition-all border ${
                          formData.category === cat
                            ? 'bg-[#0F2B5C] text-white font-semibold border-[#0F2B5C] shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      disabled={formData.isAnonymous}
                      placeholder={formData.isAnonymous ? 'Submitting Anonymously' : 'e.g. Kipchumba Koech'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F2B5C] disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0722 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F2B5C]"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Your Prayer Request Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your prayer need, health situation, or thanksgiving so we may intercede with specificity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F2B5C]"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 pt-1 text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="rounded text-[#0F2B5C] focus:ring-[#0F2B5C]"
                    />
                    <span>Keep my name anonymous (only share the prayer content with the prayer team)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPastoralOnly}
                      onChange={(e) => setFormData({ ...formData, isPastoralOnly: e.target.checked })}
                      className="rounded text-[#0F2B5C] focus:ring-[#0F2B5C]"
                    />
                    <span>Confidential: For Resident Pastor Rev. Jonah Somasis’ eyes only</span>
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0F2B5C] to-[#163E82] hover:from-[#0A1B3A] hover:to-[#0F2B5C] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Sending Request...' : 'Submit Prayer Request'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppPrayer}
                    className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2"
                    title="Send directly to Pastor's WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp Prayer Line</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Church Office & Sanctuary Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F2B5C] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/25">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Sanctuary & Office Details
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans">
                Our church administration and pastoral counseling offices are open throughout the week to minister to you.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Physical Location</h4>
                    <p className="text-slate-300 text-xs">{CHURCH_INFO.location.address}</p>
                    <p className="text-slate-400 text-xs">{CHURCH_INFO.location.county}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Telephone Inquiries</h4>
                    <p className="text-slate-300 text-xs">Main Office: {CHURCH_INFO.contact.phone}</p>
                    <p className="text-slate-300 text-xs">Resident Pastor: {CHURCH_INFO.contact.pastorPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Pastoral Office Hours</h4>
                    <p className="text-slate-300 text-xs">{CHURCH_INFO.contact.officeHours}</p>
                    <p className="text-slate-400 text-xs">Pastoral counseling by appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white">Email Communications</h4>
                    <p className="text-slate-300 text-xs">{CHURCH_INFO.contact.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-400/20 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${CHURCH_INFO.contact.whatsapp}?text=Hello%20AIC%20Kamoiywo%20Church%2C%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>

                <a
                  href={CHURCH_INFO.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>Get Sanctuary Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
