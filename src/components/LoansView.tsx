import React, { useState } from 'react';
import { Briefcase, Coins, Sparkles, Scale, Info, Layers, Layers2 } from 'lucide-react';
import { ActiveLoan } from '../types';

interface LoansViewProps {
  addNotificationAlert: (title: string, desc: string) => void;
}

const INITIAL_LOANS: ActiveLoan[] = [
  { id: '1', loanName: 'Personal Medical Refinance', totalAmount: 15000, leftToPay: 8400, durationMonths: 36, monthlyPayment: 340 },
  { id: '2', loanName: 'Model S Vehicle Financing', totalAmount: 45000, leftToPay: 31200, durationMonths: 60, monthlyPayment: 780 },
  { id: '3', loanName: 'San Jose Property Mortgage', totalAmount: 380000, leftToPay: 342000, durationMonths: 240, monthlyPayment: 1850 },
];

export default function LoansView({ addNotificationAlert }: LoansViewProps) {
  const [loansList, setLoansList] = useState<ActiveLoan[]>(INITIAL_LOANS);
  const [loanPrincipal, setLoanPrincipal] = useState(10000);
  const [loanDuration, setLoanDuration] = useState(24);
  const [loanInterestRate, setLoanInterestRate] = useState(5.5);

  const calculateMonthlyPayment = () => {
    const monthlyRate = (loanInterestRate / 100) / 12;
    const payment = (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanDuration));
    return isNaN(payment) || !isFinite(payment) ? 0 : payment;
  };

  const handleApplyNewLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyAmt = calculateMonthlyPayment();
    const newAppliedLoan: ActiveLoan = {
      id: Math.random().toString(),
      loanName: `SME Business Capital Limit`,
      totalAmount: loanPrincipal,
      leftToPay: loanPrincipal,
      durationMonths: loanDuration,
      monthlyPayment: Math.round(monthlyAmt)
    };

    setLoansList([newAppliedLoan, ...loansList]);
    addNotificationAlert("Loan Disbursed Instantly", `Your SBA Credit Line has been auto-approved for $${newAppliedLoan.totalAmount}.`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-bank-border flex items-center gap-4">
          <div className="p-3.5 bg-bank-blue/10 rounded-2xl text-bank-blue">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-bank-muted uppercase tracking-wider">Aggregate Borrowings</p>
            <p className="text-2xl font-black text-bank-navy font-display">{formatCurrency(381600)}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-bank-border flex items-center gap-4">
          <div className="p-3.5 bg-bank-teal/10 rounded-2xl text-bank-teal">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-bank-muted uppercase tracking-wider">Average Rate Index</p>
            <p className="text-2xl font-black text-bank-teal font-display">4.2% Fixed</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-bank-border flex items-center gap-4">
          <div className="p-3.5 bg-bank-yellow/10 rounded-2xl text-bank-yellow">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-bank-muted uppercase tracking-wider">Debt-to-Asset ratio</p>
            <p className="text-2xl font-black text-bank-navy font-display">14.3% Good</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-7 bg-white p-6 rounded-3xl border border-bank-border shadow-sm space-y-6">
          <div className="flex gap-2.5 items-center select-none pb-4 border-b border-bank-bg">
            <Layers2 className="text-bank-indigo w-6 h-6" />
            <div>
              <h3 className="text-lg font-bold text-bank-navy font-display">Underwriting Estimator</h3>
              <p className="text-xs text-bank-muted">Adjust sliders to calculate immediate monthly installment rates</p>
            </div>
          </div>

          <form onSubmit={handleApplyNewLoan} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-bank-navy font-display">
                <span>Principal Borrowing (USD)</span>
                <span className="font-bold text-bank-indigo font-mono">{formatCurrency(loanPrincipal)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={loanPrincipal}
                onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                className="w-full accent-bank-indigo cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-bank-navy font-display">
                <span>Duration Period (Months)</span>
                <span className="font-bold text-bank-indigo font-mono">{loanDuration} Mos</span>
              </div>
              <input
                type="range"
                min="12"
                max="120"
                step="6"
                value={loanDuration}
                onChange={(e) => setLoanDuration(Number(e.target.value))}
                className="w-full accent-bank-indigo cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-bank-navy font-display">
                <span>Assumed Interest Rate (FICO Dependent)</span>
                <span className="font-bold text-bank-indigo font-mono">{loanInterestRate}% APR</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="15.5"
                step="0.5"
                value={loanInterestRate}
                onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                className="w-full accent-bank-indigo cursor-pointer"
              />
            </div>

            <div className="bg-bank-bg rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-bank-muted uppercase font-bold">Estimated dues/mo</p>
                <p className="text-3xl font-extrabold text-bank-indigo font-mono mt-0.5">
                  {formatCurrency(calculateMonthlyPayment())}
                </p>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-bank-indigo text-white hover:bg-blue-700 font-bold text-sm rounded-xl transition duration-200 shadow-md transform hover:scale-102 cursor-pointer"
              >
                Apply for Loan
              </button>
            </div>
          </form>
        </div>

        <div className="xl:col-span-5 bg-white p-6 rounded-3xl border border-bank-border shadow-sm select-none flex flex-col justify-between">
          <div className="pb-4 border-b border-bank-bg h-max">
            <h3 className="text-lg font-bold text-bank-navy font-display">Borrowing Eligibility Status</h3>
            <p className="text-xs text-bank-muted">Review current limits parameters</p>
          </div>

          <div className="space-y-4 py-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-bank-muted">Current Debt-to-Income:</span>
              <span className="text-bank-teal font-extrabold">14.3% Good</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-bank-muted">Internal Credit Tier:</span>
              <span className="text-bank-indigo font-extrabold">PLATINUM LEVEL AAA</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-bank-muted">Eligible Max Borrowing:</span>
              <span className="text-bank-navy font-extrabold">$250,000</span>
            </div>
          </div>

          <div className="flex gap-2 text-xs text-bank-muted bg-bank-bg/50 border border-bank-border p-3.5 rounded-xl">
            <Info className="w-5 h-5 text-bank-blue shrink-0" />
            <p>Underwriting models auto-disburse limits allocations immediately upon submission of requests above.</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[25px] p-6 border border-bank-border shadow-sm">
        <h3 className="text-lg font-bold text-bank-navy font-display mb-6 select-none">Current Active Loans Portfolio</h3>
        <div className="overflow-x-auto font-medium">
          <table className="w-full text-left border-collapse min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-bank-bg/85 text-bank-muted font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 text-left">Loan Name Identifier</th>
                <th className="pb-3">Approved Limit</th>
                <th className="pb-3">Outstanding Left</th>
                <th className="pb-3">Pre-scheduled Term</th>
                <th className="pb-3 text-right">Dues/Mo</th>
              </tr>
            </thead>
            <tbody className="text-bank-navy text-[15px] font-semibold">
              {loansList.map((loan, i) => (
                <tr key={loan.id} className="border-b border-bank-bg/20 hover:bg-gray-50/50">
                  <td className="py-4 font-bold font-display text-bank-dark flex items-center gap-2">
                    <span className="bg-bank-indigo/5 text-bank-indigo font-bold rounded-lg px-2.5 py-1 text-xs">{`#LN-0${i + 1}`}</span>
                    <span>{loan.loanName}</span>
                  </td>
                  <td className="py-4 font-mono">{formatCurrency(loan.totalAmount)}</td>
                  <td className="py-4 font-mono text-bank-coral">{formatCurrency(loan.leftToPay)}</td>
                  <td className="py-4 font-normal">{loan.durationMonths} Months</td>
                  <td className="py-4 text-right text-bank-indigo font-bold font-mono">{formatCurrency(loan.monthlyPayment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
