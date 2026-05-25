import React, { useState } from 'react';
import { Pencil, Check, Settings2, Sliders, Shield, ChevronDown } from 'lucide-react';
import { UserProfile, UserPreferences, UserSecurity } from '../types';

interface SettingViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  userPreferences: UserPreferences;
  setUserPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  userSecurity: UserSecurity;
  setUserSecurity: React.Dispatch<React.SetStateAction<UserSecurity>>;
  addNotificationAlert: (title: string, desc: string) => void;
}

const AVATAR_POOL = [
  "/icons/profil.svg",
  "https://ui-avatars.com/api/?name=Avatar+1&background=random",
  "https://ui-avatars.com/api/?name=Avatar+2&background=random",
  "https://ui-avatars.com/api/?name=Avatar+3&background=random",
  "https://ui-avatars.com/api/?name=Avatar+4&background=random",
  "https://ui-avatars.com/api/?name=Avatar+5&background=random"
];

export default function SettingView({
  userProfile,
  setUserProfile,
  userPreferences,
  setUserPreferences,
  userSecurity,
  setUserSecurity,
  addNotificationAlert
}: SettingViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [profileForm, setProfileForm] = useState<UserProfile>({ ...userProfile });
  const [prefForm, setPrefForm] = useState<UserPreferences>({ ...userPreferences });
  const [securityForm, setSecurityForm] = useState<UserSecurity>({ ...userSecurity });

  const [currentPassword, setCurrentPassword] = useState('••••••••••');
  const [newPassword, setNewPassword] = useState('••••••••••');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({ ...profileForm });
    addNotificationAlert("Profile Updated", "Your profile credentials have been saved and synced.");
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserPreferences({ ...prefForm });
    addNotificationAlert("Preferences Updated", "Your regional currency and notifications were updated.");
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserSecurity({ ...securityForm });
    addNotificationAlert("Security Settings Saved", "Security layers and backup triggers verified.");
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 max-w-7xl mx-auto">
      <div className="bg-white rounded-[20px] md:rounded-[30px] shadow-sm p-4 md:p-8 min-h-[600px] flex flex-col">
        <div className="flex border-b border-[#F4F5F7] mb-10 overflow-x-auto gap-2 md:gap-[40px]" data-purpose="tab-navigation">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`pb-2 font-medium text-sm md:text-[15px] border-b-[3px] rounded-t-lg transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'profile'
                ? 'text-[#1814F3] border-[#1814F3]'
                : 'text-[#718EBF] border-transparent hover:text-[#1814F3]'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`pb-2 font-medium text-sm md:text-[15px] border-b-[3px] rounded-t-lg transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'preferences'
                ? 'text-[#1814F3] border-[#1814F3]'
                : 'text-[#718EBF] border-transparent hover:text-[#1814F3]'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`pb-2 font-medium text-sm md:text-[15px] border-b-[3px] rounded-t-lg transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === 'security'
                ? 'text-[#1814F3] border-[#1814F3]'
                : 'text-[#718EBF] border-transparent hover:text-[#1814F3]'
            }`}
          >
            Security
          </button>
        </div>

        {activeSubTab === 'profile' && (
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start animate-fade-in duration-300">
            <div className="relative w-[130px] h-[130px] mx-auto md:mx-0 flex-shrink-0" data-purpose="avatar-upload">
              <img
                alt="Large Profile Pic"
                className="w-full h-full rounded-full object-cover"
                src={profileForm.avatarUrl}
              />
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute bottom-1 right-2 bg-[#1814F3] p-2.5 rounded-full border-[3px] border-white shadow-sm text-white hover:bg-blue-800 hover:scale-105 transition-all cursor-pointer w-[38px] h-[38px] flex items-center justify-center"
                title="Change Avatar image"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Your Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">User Name</label>
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Password</label>
                  <input
                    type="password"
                    value={profileForm.password || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profileForm.dob}
                      placeholder="e.g. 25 January 1990"
                      onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                      className="w-full h-[50px] px-5 pr-12 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                    />
                    <div className="absolute right-[20px] top-1/2 -translate-y-1/2 pointer-events-none text-[#718EBF]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Present Address</label>
                  <input
                    type="text"
                    value={profileForm.presentAddress}
                    onChange={(e) => setProfileForm({ ...profileForm, presentAddress: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Permanent Address</label>
                  <input
                    type="text"
                    value={profileForm.permanentAddress}
                    onChange={(e) => setProfileForm({ ...profileForm, permanentAddress: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Postal Code</label>
                  <input
                    type="text"
                    value={profileForm.postalCode}
                    onChange={(e) => setProfileForm({ ...profileForm, postalCode: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-normal text-[#384C6F]">Country</label>
                  <input
                    type="text"
                    value={profileForm.country}
                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                    className="w-full h-[50px] px-5 bg-white border border-[#DFEAF2] rounded-[15px] text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-[#1814F3] hover:bg-blue-800 text-white font-medium py-3 px-[70px] rounded-[15px] text-base hover:scale-102 active:scale-95 shadow-md active:shadow-sm cursor-pointer transition-all h-[50px] flex items-center justify-center whitespace-nowrap"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSubTab === 'preferences' && (
          <form onSubmit={handlePreferencesSubmit} className="flex-1 flex flex-col gap-10 justify-start animate-fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-[15px] font-normal text-[#384C6F]">Currency</label>
                <div className="relative">
                  <select
                    value={prefForm.currency}
                    onChange={(e) => setPrefForm({ ...prefForm, currency: e.target.value })}
                    className="w-full h-[50px] bg-white border border-[#DFEAF2] rounded-[15px] px-5 text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none appearance-none cursor-pointer bg-[image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22%23718EBF%22_stroke-width=%222%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_d=%22M19_9l-7_7-7-7%22/%3E%3C/svg%3E')] bg-[size:16px] bg-[position:right_20px_center] pr-12 transition-all"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[15px] font-normal text-[#384C6F]">Time Zone</label>
                <div className="relative">
                  <select
                    value={prefForm.timezone}
                    onChange={(e) => setPrefForm({ ...prefForm, timezone: e.target.value })}
                    className="w-full h-[50px] bg-white border border-[#DFEAF2] rounded-[15px] px-5 text-[#718EBF] text-[15px] focus:ring-1 focus:ring-bank-indigo/30 focus:border-bank-indigo outline-none appearance-none cursor-pointer bg-[image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22%23718EBF%22_stroke-width=%222%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_d=%22M19_9l-7_7-7-7%22/%3E%3C/svg%3E')] bg-[size:16px] bg-[position:right_20px_center] pr-12 transition-all"
                  >
                    <option value="(GMT-12:00) International Date Line West">(GMT-12:00) International Date Line West</option>
                    <option value="(GMT-08:00) Pacific Time (US & Canada)">(GMT-08:00) Pacific Time (US & Canada)</option>
                    <option value="(GMT+00:00) Greenwich Mean Time (London)">(GMT+00:00) Greenwich Mean Time (London)</option>
                    <option value="(GMT+08:00) Singapore, Beijing, Tokyo">(GMT+08:00) Singapore, Beijing, Tokyo</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#333B69] font-medium text-base md:text-[16px]">Notification</h3>
              <div className="space-y-4 flex flex-col gap-1">
                <div className="flex items-center gap-[15px]">
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prefForm.receiveDigitalCurrency}
                      onChange={(e) => setPrefForm({ ...prefForm, receiveDigitalCurrency: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-[52px] h-[28px] bg-[#E8F1FF] rounded-full peer peer-focus:outline-none transition-all duration-300 peer-checked:bg-[#16DBCC] relative after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all after:duration-300 peer-checked:after:translate-x-[24px]" />
                  </label>
                  <span className="text-[#384C6F] font-normal text-[15px]">
                    I send or receive digita currency
                  </span>
                </div>

                <div className="flex items-center gap-[15px]">
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prefForm.receiveMerchantOrder}
                      onChange={(e) => setPrefForm({ ...prefForm, receiveMerchantOrder: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-[52px] h-[28px] bg-[#E8F1FF] rounded-full peer peer-focus:outline-none transition-all duration-300 peer-checked:bg-[#16DBCC] relative after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all after:duration-300 peer-checked:after:translate-x-[24px]" />
                  </label>
                  <span className="text-[#384C6F] font-normal text-[15px]">
                    I receive merchant order
                  </span>
                </div>

                <div className="flex items-center gap-[15px]">
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prefForm.accountRecommendations}
                      onChange={(e) => setPrefForm({ ...prefForm, accountRecommendations: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-[52px] h-[28px] bg-[#E8F1FF] rounded-full peer peer-focus:outline-none transition-all duration-300 peer-checked:bg-[#16DBCC] relative after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all after:duration-300 peer-checked:after:translate-x-[24px]" />
                  </label>
                  <span className="text-[#384C6F] font-normal text-[15px]">
                    There are recommendation for my account
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#1814F3] hover:bg-blue-800 text-white font-medium py-3 px-[70px] rounded-[15px] text-base hover:scale-102 active:scale-95 shadow-md active:shadow-sm cursor-pointer transition-all h-[50px] flex items-center justify-center whitespace-nowrap"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {activeSubTab === 'security' && (
          <form onSubmit={handleSecuritySubmit} className="flex-1 flex flex-col gap-8 justify-start animate-fade-in duration-300">
            <div>
              <h3 className="text-[#333B69] font-medium text-base md:text-[16px] mb-4">Two-factor Authentication</h3>
              <div className="flex items-center gap-[15px]">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={securityForm.twoFactorEnabled}
                    onChange={(e) => setSecurityForm({ ...securityForm, twoFactorEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-[52px] h-[28px] bg-[#E8F1FF] rounded-full peer peer-focus:outline-none transition-all duration-300 peer-checked:bg-bank-teal relative after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all after:duration-300 peer-checked:after:translate-x-[24px]" />
                </label>
                <span className="text-[#384C6F] font-normal text-[15px]">
                  Enable or disable two factor authentication
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#333B69] font-medium text-base md:text-[16px]">Change Password</h3>
              
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full max-w-[500px] space-y-4">
                  <div>
                    <label className="block text-[#384C6F] text-[15px] mb-2 font-normal">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full h-[50px] px-5 rounded-[15px] border border-[#E6E9F4] focus:ring-1 focus:ring-bank-indigo/50 tracking-widest text-bank-navy text-[15px] bg-white outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#384C6F] text-[15px] mb-2 font-normal">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-[50px] px-5 rounded-[15px] border border-[#E6E9F4] focus:ring-1 focus:ring-bank-indigo/50 tracking-widest text-bank-navy text-[15px] bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="w-full md:w-auto flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#1814F3] hover:bg-blue-800 text-white font-medium py-3 px-[70px] rounded-[15px] text-base hover:scale-102 active:scale-95 shadow-md active:shadow-sm cursor-pointer transition-all h-[50px] flex items-center justify-center whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowAvatarModal(false)} />
          <div className="bg-white rounded-3xl p-6 shadow-2xl relative max-w-md w-full z-10 animate-scale-up">
            <h3 className="text-xl font-bold text-bank-navy mb-4 font-display">Choose Profile Photo</h3>
            <p className="text-sm text-bank-muted mb-6">Select a standard headshot avatar of your choosing.</p>
            <div className="grid grid-cols-3 gap-4">
              {AVATAR_POOL.map((url, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setProfileForm({ ...profileForm, avatarUrl: url });
                    setShowAvatarModal(false);
                  }}
                  className="relative group aspect-square rounded-full overflow-hidden border-2 border-transparent hover:border-bank-blue p-1 transition-all"
                >
                  <img src={url} alt={`Avatar option ${i + 1}`} className="w-full h-full rounded-full object-cover" />
                  {profileForm.avatarUrl === url && (
                    <div className="absolute inset-0 bg-bank-blue/20 flex items-center justify-center rounded-full">
                      <Check className="text-white w-6 h-6 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-bank-navy font-semibold rounded-xl text-sm"
                onClick={() => setShowAvatarModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
