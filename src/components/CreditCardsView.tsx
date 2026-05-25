import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, Landmark, Sparkles, Sliders, Settings2, SlidersHorizontal } from 'lucide-react';

interface CreditCardsViewProps {
  cards: any[];
  setCards: React.Dispatch<React.SetStateAction<any[]>>;
  addNotificationAlert: (title: string, desc: string) => void;
}

export default function CreditCardsView({
  cards,
  setCards,
  addNotificationAlert
}: CreditCardsViewProps) {
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [cardLock, setCardLock] = useState(false);
  const [onlineLimit, setOnlineLimit] = useState(3500);
  const [scoreCheck, setScoreCheck] = useState('');
  const [underwritingResult, setUnderwritingResult] = useState<string | null>(null);

  const activeCard = cards[selectedCardIdx] || cards[0] || {
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    cardType: 'blue'
  };

  const handleApplyLimitsIncrease = (e: React.FormEvent) => {
    e.preventDefault();
    const score = Number(scoreCheck);
    if (!score || score < 300 || score > 850) {
      setUnderwritingResult('Invalid Score. Range must be 300 - 850.');
      return;
    }

    if (score >= 680) {
      const updatedCards = [...cards];
      if (updatedCards[selectedCardIdx]) {
        updatedCards[selectedCardIdx].balance += 3000;
        setCards(updatedCards);
      }
      setUnderwritingResult(`APPROVED! We loaded an extra $3,000 credit limit onto your card.`);
      addNotificationAlert("Credit Increase Granted", "Underwriting approved additional $3,000 credit line.");
    } else {
      setUnderwritingResult(`REFERRED. Your score is below our standard instant limit increase threshold.`);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <section className="space-y-4 select-none">
        <h3 className="text-[22px] font-semibold text-bank-navy font-display select-none">My Vault Portfolio</h3>
        <p className="text-xs text-bank-muted mb-6">Choose any active card from your portfolio below to configure locking mechanisms or adjust limits.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            type="button"
            onClick={() => setSelectedCardIdx(0)}
            className={`h-[230px] rounded-[25px] p-6 text-white flex flex-col justify-between text-left relative overflow-hidden shadow-sm hover:scale-[1.02] transition-all cursor-pointer font-lato ${
              selectedCardIdx === 0 ? 'ring-4 ring-bank-indigo ring-offset-4' : ''
            } card-gradient-blue`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] text-white/75 font-medium uppercase mb-1">Cosmic Platinum</p>
                <p className="text-[22px] font-extrabold">{formatCurrency(activeCard.balance || 5756)}</p>
              </div>
              <Sparkles className="text-white/40 w-8 h-8 rotate-12" />
            </div>
            <div className="flex justify-between items-center bg-gradient-to-b from-white/10 to-transparent -mx-6 -mb-6 px-6 py-[20px] border-t border-white/10">
              <p className="text-base font-semibold">{activeCard.cardNumber}</p>
              <span className="text-xs font-bold text-white/50">12/22</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCardIdx(1)}
            className={`h-[230px] text-left rounded-[25px] p-6 text-yellow-500/90 flex flex-col justify-between relative overflow-hidden shadow-sm hover:scale-[1.02] transition-all cursor-pointer font-lato ${
              selectedCardIdx === 1 ? 'ring-4 ring-bank-indigo ring-offset-4' : ''
            } card-gradient-dark`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] text-yellow-500/50 font-semibold uppercase tracking-wider mb-1">Gold Reserve Business</p>
                <p className="text-[22px] font-extrabold text-yellow-500">$24,500</p>
              </div>
              <Landmark className="text-yellow-500/20 w-8 h-8" />
            </div>
            <div className="flex justify-between items-center bg-zinc-900/50 -mx-6 -mb-6 px-6 py-[20px] border-t border-yellow-500/10">
              <p className="text-base font-semibold text-white">4392 **** **** 9012</p>
              <span className="text-xs font-bold text-white/30">08/25</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCardIdx(2)}
            className={`h-[230px] rounded-[25px] p-6 text-bank-navy border border-bank-border flex flex-col justify-between text-left relative overflow-hidden bg-white hover:scale-[1.02] transition-all cursor-pointer font-lato ${
              selectedCardIdx === 2 ? 'ring-4 ring-bank-indigo ring-offset-4' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] text-bank-muted font-bold uppercase tracking-wider mb-1">Sovereign Privileges</p>
                <p className="text-[22px] font-extrabold text-bank-navy">$150,000</p>
              </div>
              <ShieldCheck className="text-bank-indigo w-8 h-8 stroke-[2]" />
            </div>
            <div className="flex justify-between items-center bg-gray-50 -mx-6 -mb-6 px-6 py-[20px] border-t border-gray-100">
              <p className="text-base font-semibold text-bank-navy">5412 **** **** 5678</p>
              <span className="text-xs font-bold text-bank-muted">11/27</span>
            </div>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-7 bg-white p-6 rounded-3xl border border-bank-border shadow-sm space-y-6">
          <div className="flex gap-2.5 items-center select-none pb-4 border-b border-bank-bg">
            <Settings2 className="text-bank-indigo w-6 h-6" />
            <div>
              <h3 className="text-lg font-bold text-bank-navy font-display">Vault Safety Hub</h3>
              <p className="text-xs text-bank-muted">Manage active card safety limits and lock statuses</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-semibold text-bank-navy select-none">
                <span>Maximum online transaction threshold (USD)</span>
                <span className="font-bold text-bank-indigo font-mono">{formatCurrency(onlineLimit)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={onlineLimit}
                onChange={(e) => setOnlineLimit(Number(e.target.value))}
                className="w-full accent-bank-indigo cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-bank-navy">Prevent International Deliveries</p>
                  <p className="text-xs text-bank-muted">Lock out transactions originating outside local region</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bank-teal" />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-bank-navy">Hold Card Temporarily</p>
                  <p className="text-xs text-bank-muted">Freeze card instantly in case of temporary loss</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={cardLock}
                    onChange={(e) => {
                      setCardLock(e.target.checked);
                      addNotificationAlert(
                        e.target.checked ? "Card Frozen" : "Card De-frozen",
                        e.target.checked ? "Your card is frozen securely immediately." : "Card access unlocked successfully."
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bank-coral" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 bg-white p-6 rounded-3xl border border-bank-border shadow-sm flex flex-col justify-between">
          <div className="select-none mb-4">
            <h3 className="text-lg font-bold text-bank-navy font-display flex items-center gap-2">
              <SlidersHorizontal className="text-bank-teal w-5 h-5" /> Extension Optimizer
            </h3>
            <p className="text-xs text-bank-muted">Determine eligibility for an instant $3,000 credit limit increase</p>
          </div>

          <form onSubmit={handleApplyLimitsIncrease} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-bank-navy">Estimated FICO Credit Bureau Score</label>
              <input
                type="number"
                placeholder="e.g. 720 (Range 300 - 850)"
                value={scoreCheck}
                onChange={(e) => setScoreCheck(e.target.value)}
                className="w-full bg-bank-bg border-none rounded-xl py-2.5 px-3 text-sm font-semibold font-mono text-bank-navy outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-bank-blue hover:bg-bank-indigo text-white font-semibold text-sm py-3 rounded-xl transition duration-200 shadow-md active:scale-95 cursor-pointer"
            >
              Request Limits Extension
            </button>

            {underwritingResult && (
              <div className={`p-3.5 rounded-xl border text-xs font-semibold ${
                underwritingResult.includes('APPROVED')
                  ? 'bg-bank-teal/10 border-bank-teal/20 text-bank-teal'
                  : 'bg-bank-coral/5 border-bank-coral/15 text-bank-coral'
              }`}>
                {underwritingResult}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
