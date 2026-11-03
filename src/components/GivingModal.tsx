import React, { useState } from 'react';
import { X, Heart, Copy, Check, Smartphone, Landmark, ShieldCheck } from 'lucide-react';
import { CHURCH_INFO, GIVING_ACCOUNTS } from '../data/churchData';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GivingModal: React.FC<GivingModalProps> = ({ isOpen, onClose }) => {
  const [selectedAccount, setSelectedAccount] = useState<string>('TITHE');
  const [memberId, setMemberId] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const fullAccount = memberId.trim()
    ? `${selectedAccount}-${memberId.trim().replace(/\s+/g, '')}`
    : selectedAccount;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F2B5C] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border-2 border-amber-400/30">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#00A859] flex items-center justify-center text-white font-bold text-xs">
            M
          </div>
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            Online Giving & Stewardship
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          Give via M-Pesa Paybill
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 font-sans">
          Support AIC Kamoiywo Church ministries, tithes, and sanctuary expansion securely from your mobile phone.
        </p>

        {/* Quick Details Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-[#091733] p-4 rounded-2xl border border-blue-400/30">
            <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">
              Business No (Paybill)
            </span>
            <div className="font-mono text-2xl font-bold text-amber-300 mb-2">
              {CHURCH_INFO.giving.paybillNumber}
            </div>
            <button
              onClick={() => handleCopy(CHURCH_INFO.giving.paybillNumber, 'paybill')}
              className="w-full py-2 px-3 rounded-xl bg-[#163E82] hover:bg-[#1E4E9E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedField === 'paybill' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy 247247</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#091733] p-4 rounded-2xl border border-blue-400/30">
            <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">
              Account Reference
            </span>
            <div className="font-mono text-xl font-bold text-white mb-2 truncate">
              {fullAccount}
            </div>
            <button
              onClick={() => handleCopy(fullAccount, 'account')}
              className="w-full py-2 px-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedField === 'account' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Account</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Account Category Selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
            Select Purpose:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GIVING_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccount(acc.code)}
                className={`p-2 rounded-xl text-left transition-all border text-xs ${
                  selectedAccount === acc.code
                    ? 'bg-amber-500/20 border-[#F59E0B] text-amber-300 font-bold'
                    : 'bg-[#163E82]/40 border-blue-400/20 text-slate-300 hover:bg-[#163E82]/70'
                }`}
              >
                <div className="font-bold">{acc.code}</div>
                <div className="text-[10px] text-slate-400 truncate">{acc.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Member identifier */}
        <div className="mb-5">
          <label className="text-[11px] text-slate-300 block mb-1">
            Optional: Name or Phone (e.g. for personal record)
          </label>
          <input
            type="text"
            placeholder="e.g. 0722000000 or MaryChebet"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full bg-[#091733] border border-blue-400/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F59E0B]"
          />
        </div>

        {/* Quick Phone Steps */}
        <div className="bg-[#091733]/60 rounded-xl p-3 border border-white/10 text-[11px] text-slate-300 mb-5">
          <p className="font-semibold text-amber-300 mb-1">Steps on Your Phone:</p>
          <p>M-Pesa &rarr; Lipa na M-Pesa &rarr; Pay Bill &rarr; Business: <strong>247247</strong> &rarr; Account: <strong>{fullAccount}</strong> &rarr; Enter Amount & PIN.</p>
        </div>

        {/* KCB Bank quick summary */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <span>KCB Bank: <strong>{CHURCH_INFO.giving.accountNumber}</strong></span>
          <button
            onClick={() => handleCopy(CHURCH_INFO.giving.accountNumber, 'modal-bank')}
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            {copiedField === 'modal-bank' ? 'Bank Acc Copied!' : 'Copy Bank Acc'}
          </button>
        </div>
      </div>
    </div>
  );
};
