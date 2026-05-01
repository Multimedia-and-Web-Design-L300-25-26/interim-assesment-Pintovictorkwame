import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Shield, CreditCard, Bell, Lock,
  ChevronRight, Check, AlertCircle, Smartphone, Key,
  LogOut, Copy, ExternalLink, Crown,
} from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

const SECTIONS = [
  { id: 'profile', icon: <User size={17} />, label: 'Profile' },
  { id: 'security', icon: <Shield size={17} />, label: 'Security' },
  { id: 'payment', icon: <CreditCard size={17} />, label: 'Payment methods' },
  { id: 'notifications', icon: <Bell size={17} />, label: 'Notifications' },
  { id: 'privacy', icon: <Lock size={17} />, label: 'Privacy' },
];

const InfoRow = ({ label, value, masked, badge }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (value) navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 group">
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-gray-900 text-[15px] font-medium truncate">
          {masked ? '••••••••' : value || <span className="text-gray-400 font-normal">Not set</span>}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        {badge && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#05B16920', color: '#05B169' }}>
            {badge}
          </span>
        )}
        {value && !masked && (
          <button
            onClick={copy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700"
          >
            {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
          </button>
        )}
      </div>
    </div>
  );
};

const SecurityItem = ({ icon, title, description, status, statusColor, action }) => (
  <div className="flex items-center gap-4 py-5 border-b border-gray-50 last:border-0">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-900 font-semibold text-[15px]">{title}</p>
      <p className="text-gray-500 text-[13px] mt-0.5">{description}</p>
    </div>
    <div className="flex items-center gap-3 shrink-0">
      {status && (
        <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: `${statusColor}20`, color: statusColor }}>
          {status}
        </span>
      )}
      {action && (
        <button className="text-[#0052FF] text-[13px] font-semibold hover:underline whitespace-nowrap">
          {action}
        </button>
      )}
    </div>
  </div>
);

const PaymentEmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
      <CreditCard size={28} className="text-gray-300" />
    </div>
    <p className="text-gray-900 font-semibold text-[16px] mb-1">No payment methods</p>
    <p className="text-gray-500 text-[14px] mb-5">Link a bank account or card to buy and sell crypto.</p>
    <button className="bg-[#0052FF] text-white px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#1652F0] transition-colors">
      Add payment method
    </button>
  </div>
);

const NotificationRow = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
    <div className="flex-1 pr-8">
      <p className="text-gray-900 font-medium text-[15px]">{label}</p>
      <p className="text-gray-500 text-[13px] mt-0.5">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${enabled ? 'bg-[#0052FF]' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? 'translate-x-5.5' : 'translate-x-0.5'}`}
        style={{ transform: enabled ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  </div>
);

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    accountActivity: true,
    news: false,
    marketing: false,
  });
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMsg, setAdminMsg] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleBecomeAdmin = async () => {
    setAdminLoading(true);
    setAdminMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/make-admin`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setAdminMsg('You are now an admin! You can add cryptocurrencies on the Explore page.');
      } else {
        setAdminMsg(data.message || 'Something went wrong.');
      }
    } catch {
      setAdminMsg('Could not reach the server.');
    } finally {
      setAdminLoading(false);
    }
  };

  const toggleNotif = (key) => setNotifications((n) => ({ ...n, [key]: !n[key] }));

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CB';

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-[14px] font-medium"
        >
          <ArrowLeft size={18} />
          Dashboard
        </Link>
        <div className="flex-1" />
        <Link to="/" className="flex items-center">
          <img src="/assets/clone-images/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="h-6" />
        </Link>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8">

        {user?.role !== 'admin' ? (
          <div className="bg-gradient-to-r from-[#0052FF] to-[#7B2FFF] rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Crown size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-[16px]">Examiner / Tester Access</p>
                <p className="text-white/80 text-[13px]">Click the button to become an admin and unlock the ability to add cryptocurrencies on the Explore page.</p>
              </div>
            </div>
            <button
              onClick={handleBecomeAdmin}
              disabled={adminLoading}
              className="shrink-0 bg-white text-[#0052FF] font-bold px-6 py-3 rounded-full text-[14px] hover:bg-gray-100 transition-colors disabled:opacity-60 flex items-center gap-2 shadow-md"
            >
              {adminLoading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Crown size={16} />
              )}
              {adminLoading ? 'Upgrading…' : 'Become Admin'}
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#05B169] to-[#00875A] rounded-2xl p-5 mb-6 flex items-center gap-4 shadow-md">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Crown size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-[16px]">Admin Access Active</p>
              <p className="text-white/80 text-[13px]">You can add new cryptocurrencies from the Explore page.</p>
            </div>
            <span className="ml-auto bg-white/20 text-white text-[12px] font-bold px-3 py-1.5 rounded-full">ADMIN</span>
          </div>
        )}

        {adminMsg && (
          <div className="mb-6 px-5 py-4 rounded-2xl bg-[#0052FF]/10 border border-[#0052FF]/20 text-[#0052FF] text-[14px] font-medium">
            {adminMsg}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[22px] font-bold">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#05B169] border-2 border-white flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 text-[20px] font-bold truncate">{user?.name || 'Coinbase User'}</h1>
            <p className="text-gray-500 text-[14px]">{user?.email || ''}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#05B16915] text-[#05B169]">
                Verified
              </span>
              <span className="text-gray-400 text-[12px]">Member since {memberSince}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500 transition-colors text-[14px] font-medium"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>

        <div className="flex gap-6">
          <aside className="w-[200px] shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-[14px] font-medium transition-colors border-l-2 ${
                    activeSection === s.id
                      ? 'border-[#0052FF] text-[#0052FF] bg-[#0052FF]/5'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            {activeSection === 'profile' && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-[16px] font-bold text-gray-900">Personal information</h2>
                    <button className="text-[#0052FF] text-[13px] font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="px-6">
                    <InfoRow label="Full name" value={user?.name} />
                    <InfoRow label="Email address" value={user?.email} badge="Verified" />
                    <InfoRow label="Phone number" value={null} />
                    <InfoRow label="Date of birth" value={null} />
                    <InfoRow label="Account role" value={user?.role === 'admin' ? 'Administrator' : 'Personal'} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50">
                    <h2 className="text-[16px] font-bold text-gray-900">Account level</h2>
                  </div>
                  <div className="px-6 py-5">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 flex items-center justify-center">
                        <Shield size={22} className="text-[#0052FF]" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-[16px]">Level 2 — Verified</p>
                        <p className="text-gray-500 text-[13px]">Identity verification complete</p>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Daily buy limit', value: '$25,000' },
                        { label: 'Daily sell limit', value: '$25,000' },
                        { label: 'Withdrawals', value: 'Enabled' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-gray-500 text-[14px]">{label}</span>
                          <span className="text-gray-900 text-[14px] font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/verify-id"
                      className="mt-5 flex items-center justify-between p-4 bg-[#0052FF]/5 rounded-xl border border-[#0052FF]/15 hover:bg-[#0052FF]/8 transition-colors"
                    >
                      <div>
                        <p className="text-[#0052FF] font-semibold text-[14px]">Upgrade to Level 3</p>
                        <p className="text-gray-500 text-[12px] mt-0.5">Higher limits and institutional features</p>
                      </div>
                      <ChevronRight size={18} className="text-[#0052FF]" />
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50">
                    <h2 className="text-[16px] font-bold text-gray-900">Linked accounts</h2>
                  </div>
                  <div className="px-6 py-5">
                    {[
                      { provider: 'Google', connected: false },
                      { provider: 'Apple', connected: false },
                    ].map(({ provider, connected }) => (
                      <div key={provider} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <p className="text-gray-900 text-[14px] font-medium">{provider}</p>
                        <button className={`text-[13px] font-semibold px-3 py-1.5 rounded-full transition-colors ${connected ? 'text-red-500 hover:bg-red-50' : 'text-[#0052FF] hover:bg-[#0052FF]/5'}`}>
                          {connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50">
                    <h2 className="text-[16px] font-bold text-gray-900">Security settings</h2>
                  </div>
                  <div className="px-6">
                    <SecurityItem
                      icon={<Smartphone size={18} />}
                      title="2-Step Verification"
                      description="Add an extra layer of security using an authenticator app or SMS"
                      status="Not enabled"
                      statusColor="#FF9500"
                      action="Enable"
                    />
                    <SecurityItem
                      icon={<Key size={18} />}
                      title="Passkeys"
                      description="Sign in securely with Face ID, fingerprint, or your device PIN"
                      status="Not set up"
                      statusColor="#FF9500"
                      action="Add passkey"
                    />
                    <SecurityItem
                      icon={<Lock size={18} />}
                      title="Password"
                      description="Last changed: never"
                      action="Change password"
                    />
                    <SecurityItem
                      icon={<Shield size={18} />}
                      title="Account activity alerts"
                      description="Get notified of logins from new devices"
                      status="Active"
                      statusColor="#05B169"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-[16px] font-bold text-gray-900">Active sessions</h2>
                    <button className="text-red-500 text-[13px] font-semibold hover:underline">Sign out all</button>
                  </div>
                  <div className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-5 h-5">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8M12 17v4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-[14px]">Current session</p>
                        <p className="text-gray-500 text-[13px]">Web browser · Active now</p>
                        <p className="text-gray-400 text-[12px] mt-0.5">This device</p>
                      </div>
                      <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#05B16915] text-[#05B169]">
                        Current
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-900 font-semibold text-[14px]">Secure your account</p>
                    <p className="text-amber-700 text-[13px] mt-0.5 leading-relaxed">
                      Enable 2-step verification and a passkey to significantly improve your account security.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="text-[16px] font-bold text-gray-900">Payment methods</h2>
                  <button className="bg-[#0052FF] text-white text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-[#1652F0] transition-colors">
                    Add method
                  </button>
                </div>
                <PaymentEmptyState />
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h2 className="text-[16px] font-bold text-gray-900">Notification preferences</h2>
                </div>
                <div className="px-6">
                  <NotificationRow
                    label="Price alerts"
                    description="Get notified when your watchlist assets hit your target price"
                    enabled={notifications.priceAlerts}
                    onToggle={() => toggleNotif('priceAlerts')}
                  />
                  <NotificationRow
                    label="Account activity"
                    description="Login alerts, password changes, and security events"
                    enabled={notifications.accountActivity}
                    onToggle={() => toggleNotif('accountActivity')}
                  />
                  <NotificationRow
                    label="Crypto news"
                    description="Breaking news and market updates for your holdings"
                    enabled={notifications.news}
                    onToggle={() => toggleNotif('news')}
                  />
                  <NotificationRow
                    label="Marketing emails"
                    description="Product updates, promotions, and tips from Coinbase"
                    enabled={notifications.marketing}
                    onToggle={() => toggleNotif('marketing')}
                  />
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50">
                    <h2 className="text-[16px] font-bold text-gray-900">Privacy & data</h2>
                  </div>
                  <div className="px-6">
                    {[
                      { label: 'Download my data', desc: 'Export a copy of your account data', action: 'Request download' },
                      { label: 'Privacy policy', desc: 'Read how we handle your information', action: 'View', icon: <ExternalLink size={13} /> },
                      { label: 'Cookie preferences', desc: 'Manage how we use cookies', action: 'Manage' },
                    ].map(({ label, desc, action, icon }) => (
                      <div key={label} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-gray-900 font-medium text-[15px]">{label}</p>
                          <p className="text-gray-500 text-[13px] mt-0.5">{desc}</p>
                        </div>
                        <button className="flex items-center gap-1 text-[#0052FF] text-[13px] font-semibold hover:underline shrink-0 ml-4">
                          {action}
                          {icon}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-red-50">
                    <h2 className="text-[16px] font-bold text-red-600">Danger zone</h2>
                  </div>
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 font-medium text-[15px]">Close account</p>
                        <p className="text-gray-500 text-[13px] mt-0.5">Permanently delete your Coinbase account and all data</p>
                      </div>
                      <button className="text-red-500 text-[13px] font-semibold border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors shrink-0 ml-4">
                        Close account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
