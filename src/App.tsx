import React, { useState } from 'react';
import Layout from './components/Layout';
import TransactionsView from './components/TransactionsView';
import AccountsView from './components/AccountsView';
import SettingView from './components/SettingView';
import { UserProfile, UserPreferences, UserSecurity, Card, Transaction, Invoice } from './types';
import { Bell, Check, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('setting');
  const [searchQuery, setSearchQuery] = useState('');

  interface AlertEntry {
    id: string;
    title: string;
    description: string;
  }
  const [alerts, setAlerts] = useState<AlertEntry[]>([]);

  const addNotificationAlert = (title: string, description: string) => {
    const freshAlert: AlertEntry = {
      id: Math.random().toString(),
      title,
      description
    };
    setAlerts(prev => [freshAlert, ...prev]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(el => el.id !== freshAlert.id));
    }, 4500);
  };

  const removeAlertManual = (id: string) => {
    setAlerts(prev => prev.filter(el => el.id !== id));
  };

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Charlene Reed',
    username: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    password: '**********',
    dob: '25 January 1990',
    presentAddress: 'San Jose, California, USA',
    permanentAddress: 'San Jose, California, USA',
    city: 'San Jose',
    postalCode: '45962',
    country: 'USA',
    avatarUrl: '/icons/profil.svg'
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    currency: 'USD',
    timezone: '(GMT-12:00) International Date Line West',
    receiveDigitalCurrency: true,
    receiveMerchantOrder: false,
    accountRecommendations: true
  });

  const [userSecurity, setUserSecurity] = useState<UserSecurity>({
    twoFactorEnabled: true
  });

  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      balance: 5756,
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      cardType: 'blue'
    },
    {
      id: '2',
      balance: 5756,
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      cardType: 'white'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Spotify Subscription', transactionId: '#12548796', type: 'Shopping', cardLast4: '1234', date: '28 Jan, 12.30 AM', amount: 2500, isIncome: false },
    { id: '2', description: 'Freepik Sales', transactionId: '#12548796', type: 'Transfer', cardLast4: '1234', date: '25 Jan, 10.40 PM', amount: 750, isIncome: true },
    { id: '3', description: 'Mobile Service', transactionId: '#12548796', type: 'Service', cardLast4: '1234', date: '20 Jan, 10.40 PM', amount: 150, isIncome: false },
    { id: '4', description: 'Wilson', transactionId: '#12548796', type: 'Transfer', cardLast4: '1234', date: '15 Jan, 03.29 PM', amount: 1050, isIncome: false },
    { id: '5', description: 'Emilly', transactionId: '#12548796', type: 'Transfer', cardLast4: '1234', date: '14 Jan, 10.40 PM', amount: 840, isIncome: true },
    { id: '6', description: 'Amazon Web Services', transactionId: '#32145698', type: 'Service', cardLast4: '1234', date: '12 Jan, 08.15 AM', amount: 1200, isIncome: false },
    { id: '7', description: 'Playstation Network', transactionId: '#98745632', type: 'Shopping', cardLast4: '1234', date: '10 Jan, 11.20 PM', amount: 60, isIncome: false },
    { id: '8', description: 'App Store Purchase', transactionId: '#75395148', type: 'Shopping', cardLast4: '1234', date: '08 Jan, 09.10 AM', amount: 15, isIncome: false },
    { id: '9', description: 'Figma Pro Team', transactionId: '#15935746', type: 'Service', cardLast4: '1234', date: '05 Jan, 02.40 PM', amount: 45, isIncome: false },
    { id: '10', description: 'Google Workspace', transactionId: '#85296314', type: 'Service', cardLast4: '1234', date: '04 Jan, 01.30 PM', amount: 12, isIncome: false },
    { id: '11', description: 'Client Consulting Inc', transactionId: '#96385274', type: 'Transfer', cardLast4: '1234', date: '03 Jan, 11.00 AM', amount: 3200, isIncome: true },
    { id: '12', description: 'Netflix Premium', transactionId: '#74125896', type: 'Shopping', cardLast4: '1234', date: '02 Jan, 07.45 PM', amount: 20, isIncome: false },
    { id: '13', description: 'Starbucks Coffee', transactionId: '#36925814', type: 'Shopping', cardLast4: '1234', date: '01 Jan, 08.30 AM', amount: 7, isIncome: false },
    { id: '14', description: 'Upwork Payout', transactionId: '#14725836', type: 'Transfer', cardLast4: '1234', date: '30 Dec, 05.15 PM', amount: 1450, isIncome: true },
    { id: '15', description: 'GitHub Copilot', transactionId: '#25836914', type: 'Service', cardLast4: '1234', date: '28 Dec, 10.00 AM', amount: 10, isIncome: false },
    { id: '16', description: 'Uber Eats Business', transactionId: '#36914725', type: 'Shopping', cardLast4: '1234', date: '26 Dec, 01.20 PM', amount: 35, isIncome: false },
    { id: '17', description: 'DigitalOcean Cloud', transactionId: '#47258369', type: 'Service', cardLast4: '1234', date: '24 Dec, 09.00 AM', amount: 84, isIncome: false },
    { id: '18', description: 'Salaries Automated', transactionId: '#58369147', type: 'Transfer', cardLast4: '1234', date: '20 Dec, 06.00 PM', amount: 4800, isIncome: true },
    { id: '19', description: 'Dribbble Pro', transactionId: '#69147258', type: 'Shopping', cardLast4: '1234', date: '18 Dec, 03.30 PM', amount: 15, isIncome: false },
    { id: '20', description: 'Steam Games Sales', transactionId: '#71425836', type: 'Shopping', cardLast4: '1234', date: '15 Dec, 11.50 PM', amount: 120, isIncome: false }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      title: 'Apple Store',
      time: '5h ago',
      amount: 450,
      logoUrl: 'https://ui-avatars.com/api/?name=Apple+Store&background=random',
      bgColor: 'bg-[#DCFAF8]',
      textColor: 'text-bank-teal'
    },
    {
      id: '2',
      title: 'Michael Scott',
      time: '2 days ago',
      amount: 160,
      bgColor: 'bg-[#FFF5D9]',
      textColor: 'text-bank-yellow'
    },
    {
      id: '3',
      title: 'Playstation Inc',
      time: '5 days ago',
      amount: 1085,
      logoUrl: 'https://ui-avatars.com/api/?name=Playstation+Inc&background=random',
      bgColor: 'bg-[#E7EDFF]',
      textColor: 'text-bank-blue'
    },
    {
      id: '4',
      title: 'William',
      time: '10 days ago',
      amount: 90,
      bgColor: 'bg-[#FFE0EB]',
      textColor: 'text-bank-coral'
    },
  ]);

  const clearNotificationsAll = () => {
    setAlerts([]);
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'transactions':
        return (
          <TransactionsView
            cards={cards}
            setCards={setCards}
            transactions={transactions}
            setTransactions={setTransactions}
            searchQuery={searchQuery}
            addNotificationAlert={addNotificationAlert}
          />
        );
      case 'accounts':
        return (
          <AccountsView
            cards={cards}
            transactions={transactions}
            invoices={invoices}
            setInvoices={setInvoices}
            searchQuery={searchQuery}
            addNotificationAlert={addNotificationAlert}
          />
        );
      case 'setting':
        return (
          <SettingView
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
            userSecurity={userSecurity}
            setUserSecurity={setUserSecurity}
            addNotificationAlert={addNotificationAlert}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 select-none">
            <p className="text-2xl font-bold text-[#718EBF] font-display">
              halaman kosong :)
            </p>
          </div>
        );
    }
  };

  return (
    <Layout
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      userProfile={userProfile}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      unreadNotificationsCount={alerts.length}
      clearNotifications={clearNotificationsAll}
    >
      {alerts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 max-w-sm w-full">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-bank-dark/95 backdrop-blur-md text-white px-5 py-4 rounded-2xl flex items-start gap-3.5 shadow-2xl border border-white/5 animate-slide-in"
            >
              <div className="p-2 bg-bank-blue/20 rounded-xl text-bank-blue shrink-0">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="font-bold text-sm text-white font-display select-none">{alert.title}</h4>
                <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">{alert.description}</p>
              </div>
              <button
                onClick={() => removeAlertManual(alert.id)}
                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-lg shrink-0 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {renderCurrentView()}
    </Layout>
  );
}

