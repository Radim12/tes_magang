import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Send, 
  Landmark, 
  ArrowUpCircle, 
  Sparkles, 
  Check, 
  X,
  Coins,
  PiggyBank,
  RefreshCw,
  Wrench,
  User,
  Gamepad2,
  Apple
} from 'lucide-react';
import { Card, Transaction, Invoice } from '../types';

interface AccountsViewProps {
  cards: Card[];
  transactions: Transaction[];
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  searchQuery: string;
  addNotificationAlert: (title: string, desc: string) => void;
}

export default function AccountsView({
  cards,
  transactions,
  invoices,
  setInvoices,
  searchQuery,
  addNotificationAlert
}: AccountsViewProps) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invTitle, setInvTitle] = useState('');
  const [invAmount, setInvAmount] = useState('');
  const [invTime, setInvTime] = useState('Just now');

  const stats = [
    { title: 'My Balance', value: '$12,750', iconPath: '/icons/balance.svg' },
    { title: 'Income', value: '$5,600', iconPath: '/icons/income.svg' },
    { title: 'Expense', value: '$3,460', iconPath: '/icons/expense.svg' },
    { title: 'Total Saving', value: '$7,920', iconPath: '/icons/saving.svg' },
  ];

  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invTitle || !invAmount) return;

    const newInvoice: Invoice = {
      id: Math.random().toString(),
      title: invTitle,
      time: invTime || 'Just now',
      amount: Number(invAmount),
      bgColor: 'bg-bank-blue/10',
      textColor: 'text-bank-blue'
    };

    setInvoices([newInvoice, ...invoices]);
    setInvTitle('');
    setInvAmount('');
    setShowInvoiceModal(false);
    addNotificationAlert("Invoice Generated", `Request sent to ${newInvoice.title} for $${newInvoice.amount}.`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const chartDays = [
    { day: 'Sat', debit: 120, credit: 180 },
    { day: 'Sun', debit: 70, credit: 110 },
    { day: 'Mon', debit: 90, credit: 110 },
    { day: 'Tue', debit: 160, credit: 70 },
    { day: 'Wed', debit: 110, credit: 140 },
    { day: 'Thu', debit: 130, credit: 80 },
    { day: 'Fri', debit: 120, credit: 160 },
  ];

  // High fidelity default data to match the screenshot exactly while allowing search/filter interaction
  const defaultTransactions: Transaction[] = [
    {
      id: 'spotify',
      description: 'Spotify Subscription',
      date: '25 Jan 2021',
      type: 'Shopping',
      cardLast4: '1234',
      amount: 150,
      isIncome: false,
      transactionId: '#12548796'
    },
    {
      id: 'mobile',
      description: 'Mobile Service',
      date: '25 Jan 2021',
      type: 'Service',
      cardLast4: '1234',
      amount: 340,
      isIncome: false,
      transactionId: '#12548796'
    },
    {
      id: 'emilly',
      description: 'Emilly Wilson',
      date: '25 Jan 2021',
      type: 'Transfer',
      cardLast4: '1234',
      amount: 780,
      isIncome: true,
      transactionId: '#12548796'
    }
  ];

  const sourceTxs = searchQuery ? transactions : defaultTransactions;

  const filteredTxs = sourceTxs.filter((tx) =>
    tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const defaultInvoices: Invoice[] = [
    {
      id: 'apple',
      title: 'Apple Store',
      time: '5h ago',
      amount: 450,
      bgColor: 'bg-[#DFFAF2]',
      textColor: 'text-[#15D7A9]',
    },
    {
      id: 'michael',
      title: 'Michael',
      time: '2 days ago',
      amount: 160,
      bgColor: 'bg-[#FFF5D9]',
      textColor: 'text-[#FFBB38]',
    },
    {
      id: 'playstation',
      title: 'Playstation',
      time: '5 days ago',
      amount: 1085,
      bgColor: 'bg-[#E7EDFF]',
      textColor: 'text-[#396AFF]',
    },
    {
      id: 'william',
      title: 'William',
      time: '10 days ago',
      amount: 90,
      bgColor: 'bg-[#FFE0EB]',
      textColor: 'text-[#FF82AC]',
    }
  ];

  const sourceInvoices = searchQuery ? invoices : defaultInvoices;

  const filteredInvoices = sourceInvoices.filter((inv) =>
    inv.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  const getTxRowDetails = (tx: Transaction) => {
    const desc = tx.description.toLowerCase();
    if (desc.includes('spotify')) {
      return {
        bgColor: '',
        textColor: '',
        icon: null,
        iconPath: '/icons/bell-loop.svg',
        status: 'Pending',
        cardDisplay: '1234 ****',
      };
    } else if (desc.includes('mobile')) {
      return {
        bgColor: '',
        textColor: '',
        icon: null,
        iconPath: '/icons/wrench.svg',
        status: 'Completed',
        cardDisplay: '1234 ****',
      };
    } else if (desc.includes('emilly') || desc.includes('wilson')) {
      return {
        bgColor: '',
        textColor: '',
        icon: null,
        iconPath: '/icons/user.svg',
        status: 'Completed',
        cardDisplay: '1234 ****',
      };
    }
    return {
      bgColor: tx.isIncome ? 'bg-[#DCFAF8]' : 'bg-[#FFE0EB]',
      textColor: tx.isIncome ? 'text-[#16DBCC]' : 'text-[#FF82AC]',
      icon: tx.isIncome ? ArrowDownLeft : ArrowUpRight,
      iconPath: '',
      status: 'Completed',
      cardDisplay: tx.cardLast4 ? `${tx.cardLast4} ****` : '1234 ****',
    };
  };

  const getInvoiceIcon = (inv: Invoice) => {
    const title = inv.title.toLowerCase();
    if (title.includes('apple')) return { iconPath: '/icons/apple.svg' };
    if (title.includes('michael')) return { iconPath: '/icons/user.svg' };
    if (title.includes('playstation')) return { iconPath: '/icons/playstation.svg' };
    if (title.includes('william')) return { iconPath: '/icons/user.svg' };
    return { icon: User };
  };

  const primaryCard = cards[0] || {
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234'
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-[30px]" data-purpose="stats-overview">
        {stats.map((stat, i) => {
          return (
            <div key={i} className="bg-white p-5 md:p-[25px] rounded-[25px] shadow-sm hover:shadow-md transition-all duration-300 border border-bank-border/40 flex items-center gap-5 select-none">
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center shrink-0">
                <img src={stat.iconPath} alt={stat.title} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-sm md:text-[16px] text-bank-muted font-medium mb-1">{stat.title}</p>
                <p className="text-xl md:text-[25px] font-bold text-[#232323] tracking-tight font-sans">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-8 space-y-4">
          <h2 className="text-[22px] font-semibold text-bank-navy font-display select-none">Last Transaction</h2>
          <div className="bg-white p-5 md:p-[25px] rounded-[25px] shadow-sm border border-bank-border">
            <div className="space-y-4 md:space-y-[20px]">
              {filteredTxs.map((tx, idx) => {
                const details = getTxRowDetails(tx);
                return (
                  <div key={tx.id || idx} className="flex items-center justify-between gap-2.5 hover:bg-gray-50/50 p-2 rounded-xl transition-all duration-150 select-none">
                    <div className="flex items-center gap-[15px] md:gap-[20px] w-2/5 min-w-0">
                      <div className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] rounded-[15px] flex items-center justify-center shrink-0">
                        {details.iconPath ? (
                          <img src={details.iconPath} alt={tx.description} className="w-full h-full object-contain" />
                        ) : (
                          <div className={`w-full h-full rounded-[15px] ${details.bgColor} flex items-center justify-center`}>
                            {details.icon && React.createElement(details.icon as React.ComponentType<any>, { className: `w-5 h-5 md:w-6 md:h-6 ${details.textColor}` })}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 overflow-hidden">
                        <p className="text-sm md:text-[16px] font-semibold text-[#343C6A] truncate font-display">{tx.description}</p>
                        <p className="text-xs md:text-[15px] text-bank-muted truncate">{tx.date}</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-[16px] text-[#718EBF] font-medium w-1/6 hidden sm:block">{tx.type}</p>
                    <p className="text-xs md:text-[16px] text-[#718EBF] font-normal w-1/6 hidden md:block">{details.cardDisplay}</p>
                    <p className="text-xs md:text-[16px] text-[#718EBF] font-semibold w-1/6 hidden sm:block">{details.status}</p>
                    <p className={`text-sm md:text-base font-bold text-right w-1/6 shrink-0 font-display ${
                      tx.isIncome ? 'text-[#41D43F]' : 'text-[#FE5C73]'
                    }`}>
                      {tx.isIncome ? '+' : '-'}${tx.amount}
                    </p>
                  </div>
                );
              })}

              {filteredTxs.length === 0 && (
                <p className="text-center py-8 text-bank-muted text-sm">No transaction matches that criteria.</p>
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between select-none">
            <h2 className="text-[22px] font-semibold text-bank-navy font-display">My Card</h2>
            <span className="text-[17px] text-bank-muted font-semibold">See All</span>
          </div>
          
          <div className="card-gradient-blue p-6 md:p-[25px] rounded-[25px] h-[235px] text-white flex flex-col justify-between shadow-md relative overflow-hidden select-none font-lato">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[12px] text-white/70 font-normal mb-1">Balance</p>
                <p className="text-[20px] font-bold">{formatCurrency(primaryCard.balance)}</p>
              </div>
              <img
                src="/icons/chip-white.svg"
                alt="Card Chip"
                className="w-[34.77px] h-[34.77px] opacity-90 select-none"
              />
            </div>
            
            <div className="flex gap-14 justify-start">
              <div>
                <p className="text-[11px] text-white/70 font-medium tracking-wider uppercase mb-1">CARD HOLDER</p>
                <p className="text-[15px] font-semibold">{primaryCard.cardHolder}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/70 font-medium tracking-wider uppercase mb-1">VALID THRU</p>
                <p className="text-[15px] font-semibold">{primaryCard.validThru}</p>
              </div>
            </div>

            <div className="flex justify-between items-center bg-gradient-to-b from-white/10 to-white/0 -mx-6 md:-mx-[25px] -mb-6 md:-mb-[25px] px-[25px] py-[20px] border-t border-white/15">
              <p className="text-[15px] sm:text-[18px] md:text-[22px] font-semibold tracking-wider whitespace-nowrap">
                {primaryCard.cardNumber}
              </p>
              <div className="flex -space-x-4">
                <div className="w-[30px] h-[30px] rounded-full bg-white/50" />
                <div className="w-[30px] h-[30px] rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-8 space-y-4">
          <h2 className="text-[22px] font-semibold text-bank-navy font-display select-none">Debit &amp; Credit Overview</h2>
          <div className="bg-white p-5 md:p-[30px] rounded-[25px] shadow-sm border border-bank-border">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-bank-bg pb-4">
              <p className="text-sm md:text-[16px] text-bank-muted">
                <span className="text-[#333B69] font-bold">$7,560</span> Debited &amp;{' '}
                <span className="text-[#333B69] font-bold">$5,420</span> Credited in this Week
              </p>
              <div className="flex items-center gap-6 select-none font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-[4px] bg-[#1A16F3]" />
                  <span className="text-[14px] text-bank-muted">Debit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-[4px] bg-[#FF82AC]" />
                  <span className="text-[14px] text-bank-muted">Credit</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between h-[210px] px-2 select-none" data-purpose="weekly-chart">
               {chartDays.map((dayData, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group relative cursor-pointer">
                  <div className="absolute bottom-full mb-3 bg-bank-navy text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 flex flex-col gap-0.5 select-text">
                    <span className="font-semibold text-[#FCAA0B]">Credit: ${dayData.credit * 12}</span>
                    <span className="font-semibold text-[#1A16F3]">Debit: ${dayData.debit * 12}</span>
                  </div>
                  
                  <div className="flex gap-1.5 items-end transform transition group-hover:scale-x-105">
                    <div
                      className="w-[12px] md:w-[24px] bg-[#1A16F3] rounded-full transition-all duration-300"
                      style={{ height: `${dayData.debit}px` }}
                    />
                    <div
                      className="w-[12px] md:w-[24px] bg-[#FCAA0B] rounded-full transition-all duration-300"
                      style={{ height: `${dayData.credit}px` }}
                    />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-semibold text-bank-muted">{dayData.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between select-none">
            <h2 className="text-[22px] font-semibold text-bank-navy font-display">Invoices Sent</h2>
          </div>
          
          <div className="bg-white p-5 md:p-[28px] rounded-[25px] shadow-sm space-y-[24px] border border-bank-border">
            {filteredInvoices.map((inv, idx) => {
              const iconData = getInvoiceIcon(inv);
              return (
                <div key={inv.id || idx} className="flex items-center justify-between hover:bg-gray-50/50 p-1 rounded-xl transition-all">
                  <div className="flex items-center gap-[15px] md:gap-[20px] min-w-0">
                    <div className="w-[50px] h-[50px] rounded-[18px] flex items-center justify-center shrink-0">
                      {iconData.iconPath ? (
                        <img src={iconData.iconPath} alt={inv.title} className="w-full h-full object-contain" />
                      ) : (
                        <div className={`w-full h-full rounded-[18px] ${inv.bgColor || 'bg-bank-blue/10'} flex items-center justify-center`}>
                          {iconData.icon && React.createElement(iconData.icon as React.ComponentType<any>, { className: `w-6 h-6 ${inv.textColor || 'text-bank-blue'}` })}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 overflow-hidden">
                      <p className="text-[15px] md:text-[16px] font-semibold text-bank-dark truncate font-display">{inv.title}</p>
                      <p className="text-[13px] md:text-[15px] text-bank-muted truncate">{inv.time}</p>
                    </div>
                  </div>
                  <p className="text-[15px] md:text-[16px] font-bold text-bank-muted shrink-0 font-sans">
                    ${inv.amount}
                  </p>
                </div>
              );
            })}

            {filteredInvoices.length === 0 && (
              <p className="text-center py-10 text-bank-muted text-sm">No invoices found matching criteria.</p>
            )}
          </div>
        </div>
      </section>

      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowInvoiceModal(false)} />
          <form
            onSubmit={handleInvoiceSubmit}
            className="bg-white rounded-[25px] p-6 md:p-8 max-w-sm w-full relative z-10 animate-scale-up space-y-6 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-bank-border pb-3">
              <h3 className="text-xl font-bold text-bank-navy font-display flex items-center gap-2">
                <Plus className="text-bank-indigo w-5 h-5" /> Issue Invoice Request
              </h3>
              <button type="button" onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-bank-navy">Recipient Title / Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Apple Store, Microsoft"
                  value={invTitle}
                  onChange={(e) => setInvTitle(e.target.value)}
                  className="border border-bank-border rounded-xl px-4 py-2 text-sm outline-none w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-bank-navy">Requested Amount (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={invAmount}
                  onChange={(e) => setInvAmount(e.target.value)}
                  className="border border-bank-border rounded-xl px-4 py-2 text-sm outline-none w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-bank-navy">Time interval banner</label>
                <input
                  type="text"
                  placeholder="e.g. Just now, 2 hours ago"
                  value={invTime}
                  onChange={(e) => setInvTime(e.target.value)}
                  className="border border-bank-border rounded-xl px-4 py-2 text-sm outline-none w-full"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-bank-border">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-bank-navy font-semibold rounded-xl text-xs"
                onClick={() => setShowInvoiceModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-bank-indigo hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Send Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
