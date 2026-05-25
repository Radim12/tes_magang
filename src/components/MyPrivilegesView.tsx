import React, { useState } from 'react';
import { ShieldCheck, Trophy, Sparkles, Star, Award, Compass, Gift, Zap } from 'lucide-react';

interface MyPrivilegesViewProps {
  addNotificationAlert: (title: string, desc: string) => void;
}

export default function MyPrivilegesView({ addNotificationAlert }: MyPrivilegesViewProps) {
  const [points, setPoints] = useState(14500);

  const perks = [
    { title: 'Airport Lounge Priority Access', desc: 'Sovereign tier priority pass to over 1400 lounges globally.', cost: 4000, logo: Compass },
    { title: '1% Supplemental Cashback Booster', desc: 'Applies booster cashback multipliers instantly for 30 days.', cost: 6000, logo: Star },
    { title: 'Sovereign Fee Waivers', desc: 'Waives zero-liability foreign transaction markup fees indefinitely on gold credit cards.', cost: 10000, logo: ShieldCheck },
    { title: 'Global Comprehensive Travel Cover', desc: 'Full-bound medical and cancellations cover up to $10,000 allocation.', cost: 12000, logo: Award },
  ];

  const handleClaimPerk = (title: string, cost: number) => {
    if (points < cost) {
      addNotificationAlert("Insufficient Points", "Accumulate more card transactional loyalty points to unlock.");
      return;
    }
    setPoints(prev => prev - cost);
    addNotificationAlert("Privilege Claimed", `Granted active status for "${title}". Voucher saved to profile.`);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <section className="bg-gradient-to-r from-bank-indigo via-bank-blue to-[#6875F5] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-lg select-none">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-64 h-full">
            <polygon points="50,0 100,100 0,100" fill="#fff" />
          </svg>
        </div>

        <div className="space-y-3 z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-bank-yellow fill-bank-yellow" /> Gold Sovereign Rank
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight">Sovereign Privilege Club</h2>
          <p className="text-white/80 text-xs md:text-sm max-w-md">Enjoy premium waivers, priority passes, and boosted cashback rates curated for our Sovereign membership accounts.</p>
        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center shrink-0 w-full md:w-56 z-10">
          <p className="text-xs uppercase font-extrabold tracking-widest text-white/70">Club Points Balance</p>
          <p className="text-4xl font-black font-mono text-bank-yellow mt-1">{points.toLocaleString()}</p>
          <p className="text-xs text-white/50 mt-1">Unlock priority vouchers</p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-3xl border border-bank-border shadow-sm space-y-4 select-none">
        <div className="flex justify-between items-center pb-2">
          <div>
            <h3 className="text-base font-bold text-bank-navy font-display">Sovereign Tier Progression</h3>
            <p className="text-xs text-bank-muted">Current target: Platinum Rank (20,000 pts required)</p>
          </div>
          <span className="text-xs font-black text-bank-indigo bg-bank-blue/5 border border-bank-blue/15 px-3 py-1.5 rounded-xl uppercase tracking-wider">
            {Math.round((points / 20000) * 100)}% Milestone Completed
          </span>
        </div>
        
        <div className="w-full bg-bank-bg h-4 rounded-full overflow-hidden relative">
          <div
            className="bg-gradient-to-r from-bank-blue to-bank-indigo h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min((points / 20000) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-bank-muted font-bold font-mono">
          <span>0 pts Rank Initiation</span>
          <span>10,000 pts Gold Sovereign</span>
          <span>20,000 pts Platinum Target</span>
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="text-xl font-bold text-bank-navy font-display select-none">Claim Premium Privilege Rewards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perks.map((perk, i) => {
            const Icon = perk.logo;
            const canAfford = points >= perk.cost;
            return (
              <div
                key={i}
                className={`bg-white p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
                  canAfford ? 'border-bank-blue/20 hover:border-bank-blue/40 shadow-sm' : 'border-bank-border opacity-75'
                }`}
              >
                <div className="flex gap-4 min-w-0">
                  <div className={`p-4 rounded-2xl shrink-0 ${
                    canAfford ? 'bg-bank-blue/5 text-bank-indigo' : 'bg-gray-100 text-bank-muted'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="min-w-0 select-none">
                    <h4 className="text-[16px] font-bold text-bank-navy truncate font-display leading-tight">{perk.title}</h4>
                    <p className="text-xs text-bank-muted mt-1 leading-relaxed line-clamp-2">{perk.desc}</p>
                    <span className="text-[13px] font-bold font-mono text-bank-indigo block mt-1">Cost: {perk.cost.toLocaleString()} Points</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleClaimPerk(perk.title, perk.cost)}
                  className={`w-full sm:w-auto px-6 py-3 font-bold text-xs uppercase rounded-xl tracking-wider select-none shrink-0 cursor-pointer active:scale-95 transition-all text-center ${
                    canAfford
                      ? 'bg-bank-indigo text-white hover:bg-blue-700 hover:shadow-md'
                      : 'bg-gray-100 text-bank-muted cursor-not-allowed'
                  }`}
                >
                  Claim Privilege
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
