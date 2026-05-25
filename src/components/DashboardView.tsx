import React, { useState } from 'react';
import { Landmark, ArrowUpRight, TrendingUp, Send, Navigation, ArrowRight, UserCheck, Plus, CircleDollarSign } from 'lucide-react';
import { Card, Transaction } from '../types';

interface DashboardViewProps {
  cards: Card[];
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  addNotificationAlert: (title: string, desc: string) => void;
}

const QUICK_TRANSFER_CONTACTS = [
  { name: 'Livia Bator', role: 'CEO', avatar: 'https://ui-avatars.com/api/?name=Livia+Bator&background=random' },
  { name: 'Randy Press', role: 'Director', avatar: 'https://ui-avatars.com/api/?name=Randy+Press&background=random' },
  { name: 'Sharron Crisme', role: 'Developer', avatar: 'https://ui-avatars.com/api/?name=Sharron+Crisme&background=random' },
  { name: 'Aria Malik', role: 'Designer', avatar: 'https://ui-avatars.com/api/?name=Aria+Malik&background=random' }
];

export default function DashboardView({
  cards,
  transactions,
  setTransactions,
  addNotificationAlert
}: DashboardViewProps) {
  const [selectedContact, setSelectedContact] = useState(QUICK_TRANSFER_CONTACTS[0]);
  const [transferAmount, setTransferAmount] = useState('500');

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(transferAmount);
    if (isNaN(amt) || amt <= 0) return;

    const mockTransferTx: Transaction = {
      id: Math.random().toString(),
      description: `Transfer to ${selectedContact.name}`,
      transactionId: `#TFR${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'Transfer',
      cardLast4: cards[0] ? cards[0].cardNumber.slice(-4) : '1234',
      date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      amount: amt,
      isIncome: false
    };

    setTransactions([mockTransferTx, ...transactions]);
    addNotificationAlert("Capital Dispatched", `Dispatched $${amt} safely to ${selectedContact.name}.`);
    setTransferAmount('500');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-bank-border flex items-center justify-between">
          <div>
            <span className="text-xs text-bank-muted font-bold uppercase tracking-wider">Total Net Value</span>
            <p className="text-3xl font-extrabold text-bank-navy mt-1 font-display">$143,240</p>
            <div className="flex items-center gap-1.5 text-bank-teal text-xs font-semibold mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% monthly gain</span>
            </div>
          </div>
          <div className="p-4 bg-bank-blue/10 rounded-2xl text-bank-blue shrink-0">
            <Landmark className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-bank-border flex items-center justify-between">
          <div>
            <span className="text-xs text-bank-muted font-bold uppercase tracking-wider">Credit Card Limits</span>
            <p className="text-3xl font-extrabold text-[#333] mt-1 font-display">$43,500</p>
            <div className="flex items-center gap-1.5 text-bank-blue text-xs font-semibold mt-2">
              <span>Used: {formatCurrency(12500)}</span>
            </div>
          </div>
          <div className="p-4 bg-bank-teal/10 rounded-2xl text-bank-teal shrink-0">
            <CircleDollarSign className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-bank-border flex items-center justify-between">
          <div>
            <span className="text-xs text-bank-muted font-bold uppercase tracking-wider">Available Liquidity</span>
            <p className="text-3xl font-extrabold text-bank-navy mt-1 font-display">$82,490</p>
            <div className="flex items-center gap-1.5 text-bank-coral text-xs font-semibold mt-2">
              <span>Ready for settlement</span>
            </div>
          </div>
          <div className="p-4 bg-bank-yellow/10 rounded-2xl text-bank-yellow shrink-0">
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-8 bg-white p-6 rounded-3xl shadow-sm border border-bank-border space-y-4">
          <div className="flex justify-between items-center select-none pb-4 border-b border-bank-border">
            <div>
              <h3 className="text-lg font-bold text-bank-navy font-display">Liquidity Trends</h3>
              <p className="text-xs text-bank-muted">6-Months continuous value chart</p>
            </div>
            <div className="flex gap-4 text-xs font-bold text-bank-muted">
              <span className="text-bank-indigo">● Capital Pool</span>
              <span className="text-bank-teal">● Earnings</span>
            </div>
          </div>

          <div className="relative h-[200px] w-full pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#396AFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#396AFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F5F7FA" strokeWidth="1" strokeDasharray="5" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#F5F7FA" strokeWidth="1" strokeDasharray="5" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#F5F7FA" strokeWidth="1" strokeDasharray="5" />

              <path
                d="M 0 160 C 80 140, 160 80, 250 110 C 330 130, 420 50, 500 40 L 500 200 L 0 200 Z"
                fill="url(#chartGradient)"
              />

              <path
                d="M 0 160 C 80 140, 160 80, 250 110 C 330 130, 420 50, 500 40"
                fill="none"
                stroke="#396AFF"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <circle cx="250" cy="110" r="6" fill="#1814F3" stroke="#fff" strokeWidth="2" />
              <circle cx="500" cy="40" r="6" fill="#396AFF" stroke="#fff" strokeWidth="2" />
            </svg>
            
            <div className="flex justify-between text-xs text-bank-muted font-bold font-mono px-1 mt-2">
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-bank-border space-y-6 flex flex-col justify-between">
          <div className="select-none">
            <h3 className="text-lg font-bold text-bank-navy font-display">Fast Dispatch</h3>
            <p className="text-xs text-bank-muted">Send funds immediately to tier contacts</p>
          </div>

          <form onSubmit={handleQuickSend} className="space-y-6">
            <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
              {QUICK_TRANSFER_CONTACTS.map((contact, i) => {
                const isSelected = selectedContact.name === contact.name;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedContact(contact)}
                    className="flex flex-col items-center gap-1.5 group focus:outline-none shrink-0"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className={`w-12 h-12 rounded-full object-cover transition-all ${
                          isSelected ? 'ring-2 ring-bank-indigo ring-offset-2 scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 bg-bank-indigo p-0.5 rounded-full text-white">
                          <UserCheck className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className={`text-[11px] font-bold text-center tracking-tight ${
                      isSelected ? 'text-bank-indigo font-bold' : 'text-bank-muted font-medium'
                    }`}>
                      {contact.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 bg-bank-bg rounded-xl py-2 pl-4 pr-2 border border-transparent focus-within:border-bank-blue/30 transition-all">
              <span className="text-bank-muted font-bold block text-sm">$</span>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Amount"
                className="w-full bg-transparent border-none text-bank-navy text-sm font-bold font-mono focus:ring-0 outline-none"
                required
              />
              <button
                type="submit"
                className="bg-bank-indigo hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1 hover:shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                Send <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-bank-bg flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-bank-teal/10 rounded-xl text-bank-teal">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-bank-navy font-display">Standard ATM Locator</p>
                <p className="text-[11px] text-bank-muted">San Jose Branch • 0.8 km</p>
              </div>
            </div>
            <span className="text-xs text-bank-teal font-bold bg-bank-teal/5 border border-bank-teal/20 px-2.5 py-1 rounded-md">
              Open now
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
