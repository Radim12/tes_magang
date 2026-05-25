import React, { useState } from 'react';
import { Search, Sliders, Play, Settings2, Code, ShieldCheck, Mail, Send, BellDot } from 'lucide-react';

interface ServicesViewProps {
  addNotificationAlert: (title: string, desc: string) => void;
}

const INITIAL_SERVICES = [
  { id: '1', title: 'Personal Finance Autopilot', category: 'Management', desc: 'Auto-categorizes bank statements and models monthly budgets.', active: true, icon: Settings2 },
  { id: '2', title: 'Automated Bills Settlement', category: 'Transactions', desc: 'Pre-schedule and settle gas, rent, and cloud server subscriptions dynamically.', active: false, icon: Send },
  { id: '3', title: 'Real-time SMS Vault Alerts', category: 'Integrations', desc: 'Dispatches instant safety codes for transfers exceeding limit thresholds.', active: true, icon: BellDot },
  { id: '4', title: 'Multi-Signature Corporate Vault', category: 'Integrations', desc: 'Requires multi-partner cryptographic signatures before fund dispatches.', active: false, icon: ShieldCheck },
  { id: '5', title: 'Web Developer API Sandbox', category: 'Integrations', desc: 'Connect third-party apps securely using public sandbox key modules.', active: true, icon: Code },
  { id: '6', title: 'Capital Overdraft Protection', category: 'Management', desc: 'Zeroes out overdraft fees by routing auxiliary reserves automatically.', active: true, icon: Play },
];

export default function ServicesView({ addNotificationAlert }: ServicesViewProps) {
  const [servicesList, setServicesList] = useState(INITIAL_SERVICES);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Transactions' | 'Management' | 'Integrations'>('all');
  const [serviceSearch, setServiceSearch] = useState('');

  const toggleServiceActive = (id: string, name: string, currentlyActive: boolean) => {
    setServicesList(prev => prev.map(srv => {
      if (srv.id === id) {
        return { ...srv, active: !srv.active };
      }
      return srv;
    }));
    addNotificationAlert(
      currentlyActive ? "Service Deactivated" : "Service Activated",
      `The premium utility "${name}" status has been toggled.`
    );
  };

  const filteredServices = servicesList.filter(s => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                          s.desc.toLowerCase().includes(serviceSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-bank-border pb-4 select-none">
        <div>
          <h3 className="text-xl font-bold text-bank-navy font-display">Service Directory</h3>
          <p className="text-xs text-bank-muted">Toggle background bank parameters on/off as you need</p>
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <span className="absolute inset-y-0 left-4 flex items-center text-[#8BA3CB]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search service..."
            value={serviceSearch}
            onChange={(e) => setServiceSearch(e.target.value)}
            className="w-full bg-white border border-bank-border rounded-full pl-11 pr-5 py-2 text-sm text-bank-navy outline-none"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 select-none">
        {(['all', 'Transactions', 'Management', 'Integrations'] as const).map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-bold text-xs border uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-bank-indigo border-bank-indigo text-white shadow-xs'
                : 'bg-white border-bank-border text-bank-muted hover:text-bank-navy'
            }`}
          >
            {cat === 'all' ? 'All Services' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((srv, i) => {
          const IconComponent = srv.icon;
          return (
            <div
              key={srv.id || i}
              className={`bg-white p-6 rounded-2xl border transition-all duration-300 shadow-xs flex flex-col justify-between h-[210px] ${
                srv.active ? 'border-bank-blue/35 shadow-md shadow-blue-50/20' : 'border-bank-border'
              }`}
            >
              <div className="flex justify-between items-start gap-3 select-none">
                <div className={`p-3 rounded-xl shrink-0 ${
                  srv.active ? 'bg-bank-blue/5 text-bank-indigo' : 'bg-gray-100 text-bank-muted'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={srv.active}
                    onChange={() => toggleServiceActive(srv.id, srv.title, srv.active)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-bank-teal" />
                </label>
              </div>

              <div className="space-y-1.5 pt-4">
                <h4 className="text-[16px] font-bold text-bank-navy truncate font-display">{srv.title}</h4>
                <p className="text-xs text-bank-muted line-clamp-2 leading-relaxed">{srv.desc}</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-bank-bg/60 select-none">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-bank-blue bg-bank-blue/5 px-2.5 py-1 rounded-md">
                  {srv.category}
                </span>
                <span className={`text-[11px] font-extrabold font-display ${srv.active ? 'text-bank-teal' : 'text-bank-muted'}`}>
                  {srv.active ? 'ONLINE/ACTIVE' : 'HOLD/STANDBY'}
                </span>
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <p className="text-center col-span-full py-12 text-bank-muted">
            No secure services found for that filter.
          </p>
        )}
      </div>
    </div>
  );
}
