import React, { useState } from 'react';
import { Landmark, ArrowUpRight, ArrowDownLeft, Sliders, TrendingUp, Sparkles, Coins, Zap } from 'lucide-react';
import { Transaction } from '../types';

interface InvestmentsViewProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  addNotificationAlert: (title: string, desc: string) => void;
}

const PORTFOLIO_STOCKS = [
  { name: 'Apple Inc.', symbol: 'AAPL', holdings: 120, price: 184.20, change: 1.45, category: 'Tech' },
  { name: 'Tesla Motors', symbol: 'TSLA', holdings: 45, price: 175.80, change: -2.33, category: 'Automotive' },
  { name: 'Microsoft Corp.', symbol: 'MSFT', holdings: 62, price: 415.50, change: 0.85, category: 'Tech' },
  { name: 'NVIDIA Corp.', symbol: 'NVDA', holdings: 15, price: 920.10, change: 5.62, category: 'Semiconductors' },
];

export default function InvestmentsView({
  transactions,
  setTransactions,
  addNotificationAlert
}: InvestmentsViewProps) {
  const [selectedStock, setSelectedStock] = useState(PORTFOLIO_STOCKS[0]);
  const [purchaseShares, setPurchaseShares] = useState(5);
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');

  const idxData = [
    { title: 'DOW JONES', idxValue: '39,131.53', change: '+1.02%', isGreen: true },
    { title: 'NASDAQ INDEX', idxValue: '16,274.94', change: '+1.60%', isGreen: true },
    { title: 'S&P 500', idxValue: '5,211.49', change: '-0.24%', isGreen: false },
  ];

  const handleOrderSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const orderCost = purchaseShares * selectedStock.price;
    
    const tradeTx: Transaction = {
      id: Math.random().toString(),
      description: `${tradeAction === 'buy' ? 'Shares Purchase' : 'Shares Sale'} of ${selectedStock.symbol}`,
      transactionId: `#TRD${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'Service',
      cardLast4: '3456',
      date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      amount: orderCost,
      isIncome: tradeAction === 'sell'
    };

    setTransactions([tradeTx, ...transactions]);
    addNotificationAlert(
      "Shares Placed Successful",
      `Dispatched broker order to ${tradeAction.toUpperCase()} ${purchaseShares} shares of ${selectedStock.symbol} (${formatCurrency(orderCost)}).`
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        {idxData.map((idx, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-bank-border flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-bank-muted uppercase tracking-wider">{idx.title}</p>
              <p className="text-2xl font-black text-bank-navy mt-1 font-display font-mono">{idx.idxValue}</p>
            </div>
            <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg ${
              idx.isGreen ? 'bg-bank-teal/10 text-bank-teal' : 'bg-bank-coral/10 text-bank-coral'
            }`}>
              {idx.change}
            </span>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-8 bg-white p-6 rounded-3xl shadow-sm border border-bank-border space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-bank-bg pb-4">
            <div>
              <h3 className="text-xl font-bold text-bank-navy font-display select-none">Portfolio Asset Value</h3>
              <p className="text-sm text-bank-muted">Live asset progress mapping</p>
            </div>
            <div className="flex bg-bank-bg p-1 rounded-lg text-xs font-semibold text-bank-muted">
              <button type="button" className="px-3 py-1.5 rounded-md bg-white text-bank-navy shadow-xs">1W</button>
              <button type="button" className="px-3 py-1.5 rounded-md">1M</button>
              <button type="button" className="px-3 py-1.5 rounded-md">1Y</button>
            </div>
          </div>

          <div className="h-[210px] w-full pt-4 relative">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M 0 140 C 50 150, 100 90, 150 120 C 200 150, 250 80, 300 40 C 350 20, 420 90, 500 30"
                fill="none"
                stroke="#16DBCC"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="150" cy="120" r="5" fill="#16DBCC" stroke="#fff" strokeWidth="2" />
              <circle cx="300" cy="40" r="5" fill="#16DBCC" stroke="#fff" strokeWidth="2" />
              <circle cx="500" cy="30" r="5" fill="#16DBCC" stroke="#fff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-xs font-bold text-bank-muted px-1 font-mono">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-bank-border space-y-6 flex flex-col justify-between">
          <div className="select-none">
            <h3 className="text-xl font-bold text-bank-navy font-display flex items-center gap-2">
              <Zap className="text-bank-yellow w-5 h-5 fill-bank-yellow" /> Brokerage Portal
            </h3>
            <p className="text-xs text-bank-muted">Execute instant secure buy/sell asset orders</p>
          </div>

          <form onSubmit={handleOrderSubmission} className="space-y-4">
            <div className="grid grid-cols-2 p-1 bg-bank-bg rounded-xl select-none">
              <button
                type="button"
                onClick={() => setTradeAction('buy')}
                className={`py-2 text-xs font-bold text-center rounded-lg transition-all ${
                  tradeAction === 'buy' ? 'bg-bank-indigo text-white' : 'text-bank-muted hover:text-bank-navy'
                }`}
              >
                BUY ASSETS
              </button>
              <button
                type="button"
                onClick={() => setTradeAction('sell')}
                className={`py-2 text-xs font-bold text-center rounded-lg transition-all ${
                  tradeAction === 'sell' ? 'bg-bank-coral text-white' : 'text-bank-muted hover:text-bank-navy'
                }`}
              >
                SELL ASSETS
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-bank-navy">Asset Token</label>
              <select
                value={selectedStock.symbol}
                onChange={(e) => {
                  const s = PORTFOLIO_STOCKS.find(st => st.symbol === e.target.value);
                  if (s) setSelectedStock(s);
                }}
                className="w-full bg-bank-bg border-none rounded-xl py-2.5 px-3 text-sm font-semibold select-none text-bank-navy outline-none"
              >
                {PORTFOLIO_STOCKS.map((st, i) => (
                  <option key={i} value={st.symbol}>
                    {st.name} ({st.symbol}) - {formatCurrency(st.price)}/sh
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-bank-navy">
                <span>Shares count: {purchaseShares}</span>
                <span>Total: {formatCurrency(purchaseShares * selectedStock.price)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={purchaseShares}
                onChange={(e) => setPurchaseShares(Number(e.target.value))}
                className="w-full accent-bank-blue cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className={`w-full font-bold text-sm py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer ${
                tradeAction === 'buy'
                  ? 'bg-bank-indigo text-white hover:bg-blue-700'
                  : 'bg-bank-coral text-white hover:bg-red-500'
              }`}
            >
              Confirm Broker Order
            </button>
          </form>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-6 border border-bank-border shadow-sm">
        <h3 className="text-lg font-bold text-bank-navy font-display mb-6 select-none">Active Investment Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-bank-bg/80 text-bank-muted font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 text-left">Company Token</th>
                <th className="pb-3">Shares Owned</th>
                <th className="pb-3">Current Price</th>
                <th className="pb-3">Total Asset Value</th>
                <th className="pb-3 text-right">Day Progress</th>
              </tr>
            </thead>
            <tbody className="text-bank-navy font-semibold text-[15px]">
              {PORTFOLIO_STOCKS.map((st, i) => (
                <tr key={i} className="border-b border-bank-bg/20 hover:bg-gray-50/50">
                  <td className="py-4 font-bold font-display flex items-center gap-2">
                    <span className="bg-bank-indigo/5 text-bank-indigo rounded-lg px-2 py-1 select-none text-xs font-bold">
                      {st.symbol}
                    </span>
                    <span>{st.name}</span>
                  </td>
                  <td className="py-4 font-mono">{st.holdings} sh</td>
                  <td className="py-4 font-mono">{formatCurrency(st.price)}</td>
                  <td className="py-4 font-mono">{formatCurrency(st.holdings * st.price)}</td>
                  <td className={`py-4 text-right font-bold font-display ${
                    st.change >= 0 ? 'text-bank-teal' : 'text-bank-coral'
                  }`}>
                    {st.change >= 0 ? '+' : ''}{st.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
