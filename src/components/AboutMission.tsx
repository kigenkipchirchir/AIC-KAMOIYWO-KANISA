import React, { useState } from 'react';
import { BookOpen, Heart, Flame, Globe, Sparkles, Quote, ShieldCheck, Check } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import pastorImg from '../assets/images/pastor_preaching_1793205957552.jpg';
import exteriorImg from '../assets/images/church_exterior_1793205969295.jpg';

export const AboutMission: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'heritage' | 'pillars'>('welcome');

  const pillars = [
    {
      icon: BookOpen,
      title: 'Sola Scriptura — God’s Infallible Word',
      description: 'We believe the Bible is the inspired, infallible, and authoritative Word of God. Every sermon, Bible study, and counsel is firmly rooted in biblical truth.',
    },
    {
      icon: Flame,
      title: 'Christ-Centered & Spirit-Led Worship',
      description: 'Our gatherings prioritize the exaltation of Jesus Christ our Savior through reverent praise, fervent prayer, and heartfelt fellowship among believers of all generations.',
    },
    {
      icon: Heart,
      title: 'Sacrificial Love & Community Care',
      description: 'Faith without works is dead. AIC Kamoiywo actively supports widows, orphans, elderly members, and vulnerable families through our Benevolence and CWA ministries.',
    },
    {
      icon: Globe,
      title: 'The Great Commission & Frontier Missions',
      description: 'Compelled by Matthew 28:19, we proclaim the Gospel locally across Nandi County and faithfully send and support missionaries to unreached regions in Northern Kenya.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-semibold text-xs tracking-wider uppercase mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Faith & Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Rooted in Christ, Serving Nandi County
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            For generations, AIC Kamoiywo has stood as a beacon of evangelical faith, transforming lives through the Gospel of Jesus Christ and demonstrating God’s grace in word and deed.
          </p>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('welcome')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'welcome'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0F2B5C]'
              }`}
            >
              Pastor’s Welcome
            </button>
            <button
              onClick={() => setActiveTab('heritage')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'heritage'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0F2B5C]'
              }`}
            >
              AIC Heritage
            </button>
            <button
              onClick={() => setActiveTab('pillars')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pillars'
                  ? 'bg-[#0F2B5C] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0F2B5C]'
              }`}
            >
              Core Biblical Pillars
            </button>
          </div>
        </div>

        {/* Tab 1: Pastor's Welcome */}
        {activeTab === 'welcome' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={pastorImg}
                  alt="Rev. Jonah Somasis Preaching at Pulpit"
                  className="w-full h-auto object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3A]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-serif font-bold text-lg">Rev. Jonah Somasis</p>
                  <p className="text-xs text-amber-300 font-sans">Resident Pastor, AIC Kamoiywo</p>
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 bg-[#D97706] text-white p-3 rounded-2xl shadow-lg border-2 border-white">
                <Quote className="w-5 h-5 fill-white/80" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block text-[#D97706] font-semibold text-sm">
                “A Message of Welcome From Our Shepherd”
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2B5C] leading-snug">
                “Whoever you are, and wherever you find yourself on life’s spiritual journey, you have a place at God’s table.”
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                On behalf of the church council, elders, deacons, and the entire congregation of AIC Kamoiywo Church, I extend a heartfelt welcome to you. Our deepest longing is that you encounter the life-transforming presence of Jesus Christ whenever you fellowship with us.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                At Kamoiywo, we believe the church is not merely an assembly on Sunday, but a spiritual family that rejoices together, weeps together, and carries each other’s burdens. Whether you are seeking spiritual clarity, praying for healing, or yearning for authentic Christian fellowship, our sanctuary is open to embrace you with open arms.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <p className="font-serif italic text-sm text-[#0F2B5C] mb-1">
                  {CHURCH_INFO.verse}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-[#0F2B5C] hover:bg-[#163E82] text-white font-semibold text-sm transition-colors shadow-md"
                >
                  Send a Prayer Request to Pastor
                </a>
                <a
                  href={`tel:${CHURCH_INFO.contact.pastorPhone.replace(/\s+/g, '')}`}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  Pastoral Office: {CHURCH_INFO.contact.pastorPhone}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: AIC Heritage */}
        {activeTab === 'heritage' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block text-[#D97706] font-semibold text-sm">
                130+ Years of Evangelical Stewardship in Kenya
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B5C]">
                The Africa Inland Church (AIC) Legacy
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                The Africa Inland Church was birthed in 1895 through the pioneering mission work of Peter Cameron Scott and the Africa Inland Mission (AIM) in Nzaui, Ukambani. Driven by a passion to reach the unreached interior of East Africa with the Gospel of our Lord Jesus Christ, missionaries and Kenyan evangelists persevered through malaria, hardship, and sacrifice.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Today, AIC Kenya is one of the largest and most spiritually steadfast evangelical denominations in East Africa, stewarding thousands of local churches, Christian universities (Scott Christian University), hospitals (Kijabe Hospital), and schools.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                AIC Kamoiywo is deeply rooted in this rich heritage—carrying forward the apostolic mandate: <strong>“To Know Christ and Make Him Known”</strong> throughout Nandi County, western Kenya, and beyond.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-serif text-xl font-bold text-[#0F2B5C]">1895</div>
                  <div className="text-xs text-slate-500">AIC Founded</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-serif text-xl font-bold text-[#0F2B5C]">Sola Scriptura</div>
                  <div className="text-xs text-slate-500">Bible Truth</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-serif text-xl font-bold text-[#0F2B5C]">Nandi DCC</div>
                  <div className="text-xs text-slate-500">Church Council</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={exteriorImg}
                  alt="AIC Kamoiywo Church Sanctuary Exterior in Nandi Hills"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-[#0F2B5C] text-white">
                  <p className="font-serif font-bold text-sm">AIC Kamoiywo Sanctuary</p>
                  <p className="text-xs text-slate-300">Set amidst the serene green hills of Nandi County</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Core Biblical Pillars */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0F2B5C] text-[#F59E0B] flex items-center justify-center mb-5 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#0F2B5C] mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
