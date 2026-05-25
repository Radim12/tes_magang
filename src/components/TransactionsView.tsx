import React, { useState } from 'react';
import { Download, Search, Plus, ArrowUp, ArrowDown, X } from 'lucide-react';
import { Card, Transaction } from '../types';

interface TransactionsViewProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  searchQuery: string;
  addNotificationAlert: (title: string, desc: string) => void;
}

export default function TransactionsView({
  cards,
  setCards,
  transactions,
  setTransactions,
  searchQuery,
  addNotificationAlert
}: TransactionsViewProps) {
  const [activeTableTab, setActiveTableTab] = useState<'all' | 'income' | 'expense'>('all');

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardBalance, setNewCardBalance] = useState(5000);
  const [newCardType, setNewCardType] = useState<'blue' | 'white' | 'dark'>('blue');

  const [showAddTxModal, setShowAddTxModal] = useState(false);
  const [txDesc, setTxDesc] = useState('');
  const [txType, setTxType] = useState('Shopping');
  const [txAmount, setTxAmount] = useState('');
  const [txFlow, setTxFlow] = useState<'income' | 'expense'>('expense');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCardNumber = `${Math.floor(1000 + Math.random() * 9000)} **** **** ${Math.floor(1000 + Math.random() * 9000)}`;
    const randomExpiry = `${Math.floor(1 + Math.random() * 12)}/${Math.floor(26 + Math.random() * 5)}`;
    
    const newCard: Card = {
      id: Math.random().toString(),
      balance: Number(newCardBalance),
      cardHolder: newCardHolder || 'Eddy Cusuma',
      validThru: randomExpiry,
      cardNumber: formattedCardNumber,
      cardType: newCardType
    };

    setCards([...cards, newCard]);
    setShowAddCardModal(false);
    setNewCardHolder('');
    setNewCardBalance(5000);
    addNotificationAlert("Premium Card Provisioned", `Card holder ${newCard.cardHolder} has a new active card.`);
  };

  const handleAddTxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDesc || !txAmount) return;

    const parsedAmount = Number(txAmount);
    const mockTx: Transaction = {
      id: Math.random().toString(),
      description: txDesc,
      transactionId: `#${Math.floor(10000000 + Math.random() * 90000000)}`,
      type: txType,
      cardLast4: cards[0] ? cards[0].cardNumber.slice(-4) : '1234',
      date: `${new Date().getDate()} May, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      amount: parsedAmount,
      isIncome: txFlow === 'income'
    };

    setTransactions([mockTx, ...transactions]);
    setShowAddTxModal(false);
    setTxDesc('');
    setTxAmount('');
    addNotificationAlert("Transaction Logged", `${mockTx.description} was loaded into ledger successfully.`);
  };

  const triggerDownloadAction = (txId: string, desc: string) => {
    addNotificationAlert("Downloading Statement", `PDF Receipt document for ${desc} (${txId}) compiled and saved.`);
  };

  const expenseData = [
    { month: 'Aug', amount: 65, active: false },
    { month: 'Sep', amount: 95, active: false },
    { month: 'Oct', amount: 75, active: false },
    { month: 'Nov', amount: 50, active: false },
    { month: 'Dec', amount: 100, active: true },
    { month: 'Jan', amount: 80, active: false },
  ];

  const formatAmount = (tx: Transaction) => {
    const sign = tx.isIncome ? '+' : '-';
    const desc = tx.description;
    if (desc === 'Spotify Subscription') return '-$2,500';
    if (desc === 'Freepik Sales') return '+$750';
    if (desc === 'Mobile Service') return '-$150';
    if (desc === 'Wilson') return '-$1050';
    if (desc === 'Emilly') return '+$840';
    return `${sign}$${tx.amount.toLocaleString('en-US')}`;
  };

  const filteredTxs = transactions.filter((tx) => {
    const matchesTab =
      activeTableTab === 'all' ||
      (activeTableTab === 'income' && tx.isIncome) ||
      (activeTableTab === 'expense' && !tx.isIncome);

    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTxs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTxs = filteredTxs.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row gap-8">
        
        <div className="flex-1 xl:flex-[2] space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[22px] font-semibold text-bank-navy font-display select-none">My Cards</h3>
            <button
              onClick={() => setShowAddCardModal(true)}
              className="text-bank-navy hover:text-bank-blue font-semibold text-[17px] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {cards.slice(0, 2).map((card, i) => {
              const isBlue = card.cardType === 'blue';
              return (
                <div
                  key={card.id || i}
                  className={`h-[235px] rounded-[25px] p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-sm select-none font-lato ${
                    isBlue
                      ? 'card-gradient-blue text-white'
                      : 'bg-white border border-[#DFEAF2] text-[#343C6A]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-xs ${isBlue ? 'text-white/70' : 'text-[#718EBF]'} mb-1`}>Balance</p>
                      <p className="text-[20px] font-semibold">{formatCurrency(card.balance)}</p>
                    </div>
                    <img
                      src={isBlue ? "/icons/chip-white.svg" : "/icons/chip-gray.svg"}
                      alt="Card Chip"
                      className="w-[34.77px] h-[34.77px] opacity-90 select-none"
                    />
                  </div>

                  <div className="flex gap-14">
                    <div>
                      <p className={`text-[11.5px] uppercase tracking-wider mb-1 ${isBlue ? 'text-white/70' : 'text-[#718EBF]'}`}>CARD HOLDER</p>
                      <p className="text-[15px] font-semibold">{card.cardHolder}</p>
                    </div>
                    <div>
                      <p className={`text-[11.5px] uppercase tracking-wider mb-1 ${isBlue ? 'text-white/70' : 'text-[#718EBF]'}`}>VALID THRU</p>
                      <p className="text-[15px] font-semibold">{card.validThru}</p>
                    </div>
                  </div>

                  <div className={`h-[70px] -mx-6 -mb-6 px-6 flex items-center justify-between border-t ${
                    isBlue ? 'bg-gradient-to-b from-white/15 to-transparent border-white/10' : 'border-[#DFEAF2]'
                  }`}>
                    <p className={`text-[16px] sm:text-[18px] md:text-[22px] tracking-wider font-semibold whitespace-nowrap ${
                      isBlue ? 'text-white' : 'text-[#343C6A]'
                    }`}>
                      {card.cardNumber}
                    </p>
                    <div className="flex -space-x-4 select-none">
                      <div className={`w-[30px] h-[30px] rounded-full ${isBlue ? 'bg-white/50 backdrop-blur-sm' : 'bg-[#9199AF]/35'}`} />
                      <div className={`w-[30px] h-[30px] rounded-full ${isBlue ? 'bg-white/30 backdrop-blur-sm' : 'bg-[#9199AF]/20'}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 space-y-4 min-w-[300px]">
          <h3 className="text-[22px] font-semibold text-bank-navy font-display select-none">My Expense</h3>
          <div className="bg-white rounded-[25px] p-6 h-[235px] flex items-end justify-between relative shadow-sm border border-bank-border">
            <div className="flex flex-col items-center gap-3 w-full px-2">
              <div className="flex items-end justify-[#C9CCD8] justify-between w-full h-[140px] px-1 select-none">
                {expenseData.map((bar, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full relative group cursor-pointer w-[32px]">
                    {bar.month === 'Dec' && (
                      <span className="text-[12px] font-bold text-[#343C6A] mb-1.5 select-none block text-center whitespace-nowrap animate-fade-in">
                        $12,500
                      </span>
                    )}
                    <div
                      style={{ height: `${bar.amount}px` }}
                      className={`w-[26px] md:w-[30px] rounded-[10px] transition-all duration-300 transform group-hover:scale-y-105 ${
                        bar.active ? 'bg-[#16DBCC]' : 'bg-[#EDF2F6] hover:bg-gray-200'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between w-full text-[13px] text-bank-muted font-medium px-1 select-none">
                {expenseData.map((bar, i) => (
                  <span key={i} className="w-[32px] text-center">{bar.month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-[22px] font-semibold text-bank-navy font-display select-none">Recent Transactions</h3>
        </div>

        <div className="border-b border-[#EAF0F6]">
          <div className="flex gap-1 md:gap-12 select-none overflow-x-auto">
            <button
              onClick={() => { setActiveTableTab('all'); setCurrentPage(1); }}
              className={`pb-3 border-b-[3px] font-semibold text-[15px] px-2 whitespace-nowrap transition-all cursor-pointer outline-none ${
                activeTableTab === 'all' ? 'border-[#1814F3] text-[#1814F3]' : 'border-transparent text-[#718EBF] hover:text-[#343C6A]'
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => { setActiveTableTab('income'); setCurrentPage(1); }}
              className={`pb-3 border-b-[3px] font-semibold text-[15px] px-2 whitespace-nowrap transition-all cursor-pointer outline-none ${
                activeTableTab === 'income' ? 'border-[#1814F3] text-[#1814F3]' : 'border-transparent text-[#718EBF] hover:text-[#343C6A]'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => { setActiveTableTab('expense'); setCurrentPage(1); }}
              className={`pb-3 border-b-[3px] font-semibold text-[15px] px-2 whitespace-nowrap transition-all cursor-pointer outline-none ${
                activeTableTab === 'expense' ? 'border-[#1814F3] text-[#1814F3]' : 'border-transparent text-[#718EBF] hover:text-[#343C6A]'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[25px] overflow-hidden p-4 md:p-[25px] border border-bank-border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] select-none">
              <thead>
                <tr className="text-[#718EBF] text-[15px] md:text-[16px] border-b border-[#EAF0F6]">
                  <th className="px-6 py-4 font-semibold text-left">Description</th>
                  <th className="px-6 py-4 font-semibold text-left">Transaction ID</th>
                  <th className="px-6 py-4 font-semibold text-left">Type</th>
                  <th className="px-6 py-4 font-semibold text-left">Card</th>
                  <th className="px-6 py-4 font-semibold text-left">Date</th>
                  <th className="px-6 py-4 font-semibold text-left">Amount</th>
                  <th className="px-6 py-4 font-semibold text-left">Receipt</th>
                </tr>
              </thead>
              <tbody className="text-bank-navy text-[15px] font-medium animate-fade-in">
                {activeTableTab !== 'all' || currentPage === 2 || currentPage === 3 || currentPage === 4 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-20">
                      <div className="flex flex-col items-center justify-center py-8">
                        <span className="text-lg font-bold text-[#718EBF] font-display select-none">
                          isi kosong :)
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {paginatedTxs.map((tx, idx) => {
                      const isIncome = tx.isIncome;
                      const ArrowIcon = isIncome ? ArrowDown : ArrowUp;
                      const amountColor = isIncome ? 'text-[#41D43F]' : 'text-[#FE5C73]';
                      const cardDisplay = tx.cardLast4 ? `${tx.cardLast4} ****` : '1234 ****';

                      return (
                        <tr
                          key={tx.id || idx}
                          className="border-b border-[#F2F4F7] hover:bg-gray-50/50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 flex items-center gap-4">
                            <div className="w-[30px] h-[30px] rounded-full border border-[#DFEAF2] flex items-center justify-center shrink-0 bg-white text-[#1814F3]">
                              <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <span className="font-semibold text-[#343C6A] font-display">{tx.description}</span>
                          </td>
                          <td className="px-6 py-4 text-[#232323] text-[15px]">{tx.transactionId}</td>
                          <td className="px-6 py-4 text-[#232323] text-[15px]">{tx.type}</td>
                          <td className="px-6 py-4 text-[#232323] text-[15px]">{cardDisplay}</td>
                          <td className="px-6 py-4 text-[#232323] text-[15px]">{tx.date}</td>
                          <td className={`px-6 py-4 font-bold text-[16px] ${amountColor}`}>
                            {formatAmount(tx)}
                          </td>
                          <td className="px-6 py-4 text-left">
                            <button
                              onClick={() => triggerDownloadAction(tx.transactionId, tx.description)}
                              className="px-5 py-2 border border-[#123288] text-[#123288] hover:bg-[#123288] hover:text-white rounded-full text-[13px] md:text-[15px] font-semibold transition duration-200 active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Download className="w-4 h-4" strokeWidth={2.5} /> Download
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    
                    {paginatedTxs.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-bank-muted">
                          No matching transactions found. Try resetting filters or logging a statement entry.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {activeTableTab === 'all' && (
          <div className="flex items-center justify-end gap-1.5 md:gap-3 pt-6 pb-2 select-none">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1.5 md:gap-2 font-bold text-[15px] font-display px-2 py-2 transition-all duration-150 ${
                currentPage === 1 
                  ? 'text-[#1814F3]/30 cursor-not-allowed' 
                  : 'text-[#1814F3] hover:opacity-80 active:scale-95 cursor-pointer'
              }`}
            >
              <svg className="w-4 h-4 shrink-0 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Previous</span>
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-[40px] h-[40px] font-bold text-[15px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1814F3] text-white rounded-[9px] scale-100 shadow-sm'
                      : 'text-[#1814F3] rounded-[9px] hover:bg-blue-50/50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1.5 md:gap-2 font-bold text-[15px] font-display px-2 py-2 transition-all duration-150 ${
                currentPage === totalPages 
                  ? 'text-[#1814F3]/30 cursor-not-allowed' 
                  : 'text-[#1814F3] hover:opacity-80 active:scale-95 cursor-pointer'
              }`}
            >
              <span>Next</span>
              <svg className="w-4 h-4 shrink-0 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {showAddCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowAddCardModal(false)} />
          <form
            onSubmit={handleAddCardSubmit}
            className="bg-white rounded-[25px] p-6 md:p-8 max-w-md w-full relative z-10 animate-scale-up space-y-6 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-bank-border pb-3">
              <h3 className="text-xl font-bold text-bank-navy font-display">Apply for Premium Card</h3>
              <button type="button" onClick={() => setShowAddCardModal(false)} className="text-gray-400 hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-bank-navy">Card Holder Name</label>
                <input
                  type="text"
                  placeholder="e.g. Eddy Cusuma"
                  value={newCardHolder}
                  onChange={(e) => setNewCardHolder(e.target.value)}
                  className="border border-bank-border rounded-xl px-4 py-2.5 text-sm outline-none w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-bank-navy">Initial Allocation Balance</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={newCardBalance}
                  onChange={(e) => setNewCardBalance(Number(e.target.value))}
                  className="border border-bank-border rounded-xl px-4 py-2.5 text-sm outline-none w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-bank-navy">Card Aesthetics Layout</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewCardType('blue')}
                    className={`p-3 rounded-xl font-bold text-xs text-center border transition-all ${
                      newCardType === 'blue' ? 'border-bank-blue bg-bank-blue/5 text-bank-blue' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    Cosmic Blue Gradient
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCardType('white')}
                    className={`p-3 rounded-xl font-bold text-xs text-center border transition-all ${
                      newCardType === 'white' ? 'border-bank-navy bg-gray-50 text-bank-navy' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    Polar White Matte
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-bank-border">
              <button
                type="button"
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-bank-navy font-semibold rounded-xl text-xs"
                onClick={() => setShowAddCardModal(false)}
              >
                Dismiss
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-bank-indigo hover:bg-blue-700 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-md"
              >
                Provision Account
              </button>
            </div>
          </form>
        </div>
      )}

      {showAddTxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowAddTxModal(false)} />
          <form
            onSubmit={handleAddTxSubmit}
            className="bg-white rounded-[25px] p-6 md:p-8 max-w-md w-full relative z-10 animate-scale-up space-y-6 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-bank-border pb-3">
              <h3 className="text-xl font-bold text-bank-navy font-display">Log Statement Record</h3>
              <button type="button" onClick={() => setShowAddTxModal(false)} className="text-gray-400 hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-bank-navy">Statement Description</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Cloud Invoice"
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  className="border border-bank-border rounded-xl px-4 py-2.5 text-sm outline-none w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-bank-navy">Category</label>
                  <select
                    value={txType}
                    onChange={(e) => setTxType(e.target.value)}
                    className="border border-bank-border rounded-xl px-3 py-2.5 text-sm bg-white outline-none w-full"
                  >
                    <option value="Shopping">Shopping</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Service">Service</option>
                    <option value="Salary">Salary</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-bank-navy">Flow Direction</label>
                  <select
                    value={txFlow}
                    onChange={(e) => setTxFlow(e.target.value as 'income' | 'expense')}
                    className="border border-bank-border rounded-xl px-3 py-2.5 text-sm bg-white outline-none w-full"
                  >
                    <option value="expense">Expense (Outflow)</option>
                    <option value="income">Income (Inflow)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-bank-navy">Transaction Amount (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="border border-bank-border rounded-xl px-4 py-2.5 text-sm outline-none w-full"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-bank-border">
              <button
                type="button"
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-bank-navy font-semibold rounded-xl text-xs"
                onClick={() => setShowAddTxModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-bank-indigo hover:bg-blue-700 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-md"
              >
                Log Transaction
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
