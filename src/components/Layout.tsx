import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userProfile: UserProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadNotificationsCount: number;
  clearNotifications: () => void;
}

export default function Layout({
  children,
  currentTab,
  setCurrentTab,
  userProfile,
  searchQuery,
  setSearchQuery,
  unreadNotificationsCount,
  clearNotifications
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', iconStr: 'dashboard' },
    { id: 'transactions', name: 'Transactions', iconStr: 'transactions' },
    { id: 'accounts', name: 'Accounts', iconStr: 'accounts' },
    { id: 'investments', name: 'Investments', iconStr: 'investments' },
    { id: 'credit-cards', name: 'Credit Cards', iconStr: 'credit-cards' },
    { id: 'loans', name: 'Loans', iconStr: 'loans' },
    { id: 'services', name: 'Services', iconStr: 'services' },
    { id: 'privileges', name: 'My Privileges', iconStr: 'privileges' },
    { id: 'setting', name: 'Setting', iconStr: 'setting' },
  ];

  const getHeaderTitle = () => {
    const activeItem = menuItems.find(item => item.id === currentTab);
    return activeItem ? activeItem.name : 'Banking Portals';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bank-bg font-sans">
      <aside className="hidden lg:flex flex-col w-[250px] bg-white border-r border-bank-border shrink-0">
        <div className="h-[100px] flex items-center px-8 gap-3 border-b border-rose-50/10">
          <div className="flex items-center justify-center bg-bank-blue/10 p-2 rounded-xl">
            <img
              src="/logo.png"
              alt="BankDash Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <h1 className="text-[25px] font-extrabold text-[#343C6A] tracking-tight font-display">
            BankDash<span className="text-bank-blue">.</span>
          </h1>
        </div>

        <nav className="flex-1 py-6 sidebar-scroll overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-5 px-8 py-4 transition-all duration-200 relative group font-medium text-[16px] ${
                  isActive
                    ? 'text-bank-blue bg-bank-blue/[0.02]'
                    : 'text-[#B1B1B1] hover:text-bank-navy hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-bank-indigo rounded-r-lg" />
                )}
                <div
                  className={`w-[22px] h-[22px] transition-colors duration-200 ${
                    isActive ? 'bg-bank-indigo' : 'bg-[#B1B1B1] group-hover:bg-bank-navy'
                   }`}
                  style={{
                    WebkitMask: `url('/icons/${item.iconStr}.svg') center/contain no-repeat`,
                    mask: `url('/icons/${item.iconStr}.svg') center/contain no-repeat`
                  }}
                />
                <span className="font-semibold">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-[260px] bg-white border-r border-bank-border transition-transform duration-300 transform lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-[90px] flex items-center justify-between px-6 border-b border-bank-border shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="BankDash Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-extrabold text-[#343C6A] font-display">
              BankDash.
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-bank-navy hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-5 px-6 py-3.5 transition-all duration-200 relative ${
                  isActive
                    ? 'text-bank-blue bg-bank-blue/[0.02] font-semibold'
                    : 'text-[#B1B1B1] hover:text-bank-navy'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-bank-indigo rounded-r-lg" />
                )}
                <div
                  className={`w-5 h-5 ${isActive ? 'bg-bank-indigo' : 'bg-[#B1B1B1]'}`}
                  style={{
                    WebkitMask: `url('/icons/${item.iconStr}.svg') center/contain no-repeat`,
                    mask: `url('/icons/${item.iconStr}.svg') center/contain no-repeat`
                  }}
                />
                <span className="text-[15px]">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white h-[90px] md:h-[100px] px-6 md:px-10 flex items-center justify-between border-b border-bank-border shrink-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-bank-navy hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-[22px] md:text-[28px] font-semibold text-bank-navy font-display select-none">
              {getHeaderTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden md:block w-[255px]">
              <span className="absolute inset-y-0 left-5 flex items-center text-[#8BA3CB]">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </span>
              <input
                type="text"
                placeholder="Search for something"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bank-bg border-none rounded-full pl-14 pr-5 py-3 text-[15px] text-bank-navy placeholder-[#8BA3CB] font-normal focus:ring-2 focus:ring-bank-blue/20 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-bank-navy font-semibold text-xs py-1 px-2 hover:bg-gray-100 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setCurrentTab('setting')}
                className="w-10 h-10 md:w-[50px] md:h-[50px] bg-bank-bg rounded-full flex items-center justify-center text-bank-muted hover:text-bank-blue hover:bg-bank-blue/5 border border-transparent hover:border-bank-blue/10 transition-all cursor-pointer"
                title="Portal Settings"
              >
                <Settings className="w-5 h-5 md:w-[25px] md:h-[25px]" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                  className="w-10 h-10 md:w-[50px] md:h-[50px] bg-bank-bg rounded-full flex items-center justify-center text-bank-coral hover:bg-bank-coral/10 hover:text-[#FD3B53] border border-transparent hover:border-bank-coral/15 transition-all relative cursor-pointer"
                  title="Notifications Alert"
                >
                  <Bell className="w-5 h-5 md:w-[25px] md:h-[25px]" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-2.5 h-2.5 bg-bank-coral border-2 border-white rounded-full animate-ping-once" />
                  )}
                </button>

                {showNotificationsDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotificationsDropdown(false)}
                    />
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-bank-border rounded-2xl shadow-xl z-50 p-4 animate-in fade-in-50 duration-200">
                      <div className="flex items-center justify-between pb-3 border-b border-bank-border mb-3">
                        <span className="font-semibold text-bank-navy">Notifications</span>
                        {unreadNotificationsCount > 0 && (
                          <button
                            onClick={() => {
                              clearNotifications();
                              setShowNotificationsDropdown(false);
                            }}
                            className="text-xs text-bank-indigo font-semibold hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {unreadNotificationsCount === 0 ? (
                          <p className="text-center py-6 text-sm text-bank-muted">
                            No unread notifications at this time.
                          </p>
                        ) : (
                          <>
                            <div className="p-2 rounded-xl bg-bank-blue/5 hover:bg-bank-blue/10 transition text-xs flex gap-2">
                              <span className="w-2 h-2 mt-1.5 rounded-full bg-bank-indigo shrink-0" />
                              <div>
                                <p className="font-semibold text-bank-navy">Profile Saved</p>
                                <p className="text-bank-muted mt-0.5">Your settings have been synchronized securely.</p>
                              </div>
                            </div>
                            <div className="p-2 rounded-xl bg-bank-blue/5 hover:bg-bank-blue/10 transition text-xs flex gap-2">
                              <span className="w-2 h-2 mt-1.5 rounded-full bg-bank-indigo shrink-0" />
                              <div>
                                <p className="font-semibold text-bank-navy">Card Added Successfully</p>
                                <p className="text-bank-muted mt-0.5">Your new premium credit card is active.</p>
                              </div>
                            </div>
                            <div className="p-2 rounded-xl bg-bank-blue/5 hover:bg-bank-blue/10 transition text-xs flex gap-2">
                              <span className="w-2 h-2 mt-1.5 rounded-full bg-bank-indigo shrink-0" />
                              <div>
                                <p className="font-semibold text-bank-navy">New Deposit Credited</p>
                                <p className="text-bank-muted mt-0.5">+$840 loaded into savings from Emilly Wilson.</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div 
                onClick={() => setCurrentTab('setting')}
                className="w-11 h-11 md:w-[60px] md:h-[60px] rounded-full overflow-hidden border border-bank-border shadow-xs cursor-pointer hover:ring-2 hover:ring-bank-blue/40 hover:scale-105 active:scale-95 transition-all"
                title={`${userProfile.name} profile settings`}
              >
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover select-none"
                  src={userProfile.avatarUrl}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="md:hidden px-6 py-3 bg-white border-b border-bank-border shrink-0">
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-[#8BA3CB]">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search in transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bank-bg border-none rounded-full pl-11 pr-10 py-2.5 text-sm text-bank-navy placeholder-[#8BA3CB] focus:ring-2 focus:ring-bank-blue/20 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-xs py-1 px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-bank-bg relative">
          {children}
        </main>
      </div>
    </div>
  );
}
