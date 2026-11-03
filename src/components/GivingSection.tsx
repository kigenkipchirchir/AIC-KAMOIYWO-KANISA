import React, { useState } from 'react';
import { Heart, Copy, Check, Smartphone, Landmark, ShieldCheck, Sparkles, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { CHURCH_INFO, GIVING_ACCOUNTS } from '../data/churchData';

export const GivingSection: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('TITHE');
  const [memberIdentifier, setMemberIdentifier] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(2500);

  const fullAccountRef = memberIdentifier.trim()
    ? `${selectedAccount}-${memberIdentifier.trim().replace(/\s+/g, '')}`
    : selectedAccount;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const percentRaised = Math.round(
    (CHURCH_INFO.giving.buildingFundRaised / CHURCH_INFO.giving.buildingFundTarget) * 100
  );

  return (
    <section id="giving" className="py-20 bg-white text-[#1E293B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D97706] font-semibold text-xs tracking-wider uppercase mb-3 border border-amber-200">
            <Heart className="w-3.5 h-3.5 fill-[#D97706]/20" />
            <span>Honoring God with Our Substance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2B5C] tracking-tight mb-4">
            Tithes, Offerings & Sanctuary Giving
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            “Bring the whole tithe into the storehouse, that there may be food in my house.” — Malachi 3:10.
            Support the ongoing ministries, community mercy missions, and sanctuary developments of AIC Kamoiywo.
          </p>
        </div>

        {/* Main Grid: M-Pesa Interactive Hub & Bank Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left Column: Interactive M-Pesa Card */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#0F2B5C] to-[#0A1B3A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-400/30 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#00A859] flex items-center justify-center text-white font-black text-sm shadow-md">
                  M
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Lipa na M-Pesa Paybill
                  </h3>
                  <p className="text-xs text-emerald-300">Fast, instant, and secure mobile giving</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                Instant SMS Confirmation
              </span>
            </div>

            {/* Paybill Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Paybill Number Box */}
              <div className="bg-[#091733]/90 rounded-2xl p-4 border border-blue-400/30 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Business Number (Paybill)
                  </span>
                  <div className="font-mono text-3xl font-extrabold text-amber-300 tracking-wider">
                    {CHURCH_INFO.giving.paybillNumber}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(CHURCH_INFO.giving.paybillNumber, 'paybill')}
                  className="mt-3 py-2 px-3 rounded-xl bg-[#163E82] hover:bg-[#1E4E9E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-blue-400/20"
                >
                  {copiedField === 'paybill' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Paybill Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Paybill 247247</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account Reference Box */}
              <div className="bg-[#091733]/90 rounded-2xl p-4 border border-blue-400/30 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Account Reference
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white truncate">
                    {fullAccountRef}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(fullAccountRef, 'account')}
                  className="mt-3 py-2 px-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedField === 'account' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Account Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Account String</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Select Giving Fund Category */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
                Select Giving Purpose / Account:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GIVING_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setSelectedAccount(acc.code)}
                    className={`p-2.5 rounded-xl text-left transition-all border ${
                      selectedAccount === acc.code
                        ? 'bg-amber-500/20 border-[#F59E0B] text-amber-300 font-bold shadow-md'
                        : 'bg-[#163E82]/40 border-blue-400/20 text-slate-300 hover:bg-[#163E82]/80 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{acc.code}</div>
                    <div className="text-[10px] text-slate-400 truncate">{acc.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Member Identifier */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                Optional: Append Your Name or Member Phone (e.g. for personal tax/stewardship receipt)
              </label>
              <input
                type="text"
                placeholder="e.g. 0722000000 or JohnDoe"
                value={memberIdentifier}
                onChange={(e) => setMemberIdentifier(e.target.value)}
                className="w-full bg-[#091733] border border-blue-400/30 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]"
              />
            </div>

            {/* Step-by-step M-Pesa Instructions */}
            <div className="bg-[#091733]/60 rounded-2xl p-4 border border-white/10 text-xs text-slate-300">
              <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                Quick Steps on Your Phone:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed font-sans">
                <li>Open <strong>M-Pesa</strong> &rarr; Select <strong>Lipa na M-Pesa</strong> &rarr; <strong>Pay Bill</strong></li>
                <li>Enter Business Number: <strong className="text-amber-300">247247</strong></li>
                <li>Enter Account Number: <strong className="text-white">{fullAccountRef}</strong></li>
                <li>Enter your preferred amount in KES & enter your secret M-Pesa PIN</li>
                <li>Confirm details: <strong className="text-white">AIC Kamoiywo Church</strong> & send</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Bank Wire Details & Cheerful Giver Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            {/* KCB Bank Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F2B5C] text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#0F2B5C]">
                    Bank Direct Transfer
                  </h3>
                  <p className="text-xs text-slate-500">For standing orders, RTGS, & cheque deposits</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 mb-6 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Bank:</span>
                  <span className="font-semibold text-[#0F2B5C]">{CHURCH_INFO.giving.bankName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Branch:</span>
                  <span className="font-semibold text-[#0F2B5C]">{CHURCH_INFO.giving.branch}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Account Name:</span>
                  <span className="font-semibold text-[#0F2B5C]">{CHURCH_INFO.giving.accountName}</span>
                </div>
                <div className="flex justify-between py-1 items-center">
                  <span className="text-slate-500">Account No:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#0F2B5C] text-base">{CHURCH_INFO.giving.accountNumber}</span>
                    <button
                      onClick={() => handleCopy(CHURCH_INFO.giving.accountNumber, 'bank')}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Copy Bank Account"
                    >
                      {copiedField === 'bank' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed italic">
                *After making a bank transfer, kindly notify the church treasury via WhatsApp or call {CHURCH_INFO.contact.phone} for your official receipt.
              </p>
            </div>

            {/* Financial Integrity & Stewardship Card */}
            <div className="bg-amber-50/60 rounded-3xl p-6 sm:p-7 border border-amber-200/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D97706] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Audited Financial Stewardship</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-[#0F2B5C] mb-2">
                Transparent & Accountable Governance
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Every shilling given to AIC Kamoiywo is stewarded with strict accountability under the oversight of our Church Session, Elders Board, and audited annually according to Africa Inland Church Kenya financial regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Sanctuary Expansion & Community Hall Progress Tracker */}
        <div className="bg-[#F1F4F9] rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0F2B5C] text-[#F59E0B]">
                  Special Project 2026
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B5C] mt-2">
                  Sanctuary Roofing & Multipurpose Community Hall
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Expanding our capacity to serve 1,200+ worshippers and provide modern facilities for youth, children, and community outreach.
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] font-mono">
                  {percentRaised}%
                </div>
                <div className="text-xs text-slate-500 font-medium">Of KES 6.5M Target</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] h-4 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${percentRaised}%` }}
              />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center my-6">
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <div className="font-mono font-bold text-base sm:text-lg text-[#0F2B5C]">KES 4,380,000</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider">Total Raised</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <div className="font-mono font-bold text-base sm:text-lg text-[#D97706]">KES 2,120,000</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider">Remaining Balance</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <div className="font-mono font-bold text-base sm:text-lg text-[#0F2B5C]">428</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider">Faithful Givers</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <div className="font-mono font-bold text-base sm:text-lg text-emerald-700">Dec 2026</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider">Dedication Target</div>
              </div>
            </div>

            {/* Interactive Pledge Calculator */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#0F2B5C]">
                  Make a Faith Pledge Toward the Building Fund
                </h4>
                <p className="text-xs text-slate-500">
                  Select an amount to copy instant M-Pesa details for the building fund:
                </p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  {[1000, 2500, 5000, 10000, 25000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setCustomAmount(amt);
                        setSelectedAccount('BUILDING');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        customAmount === amt
                          ? 'bg-[#0F2B5C] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      KES {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedAccount('BUILDING');
                  handleCopy('247247', 'paybill');
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 shrink-0"
              >
                <span>Give KES {customAmount.toLocaleString()} via M-Pesa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
