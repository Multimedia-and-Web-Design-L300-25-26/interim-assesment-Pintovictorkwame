import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart2, ArrowLeftRight, Send, Gift,
  Compass, TrendingUp, ChevronDown, LogOut, Settings,
  Plus, ArrowUpRight, ArrowDownLeft, RefreshCw, Bell, Search,
} from 'lucide-react';
import { useAuth, API_BASE } from '../context/AuthContext';

const FALLBACK_CRYPTOS = [
  { name: 'Bitcoin', symbol: 'BTC', price: 65420.18, change24h: 2.34, image: '/assets/images/bitcoin.svg' },
  { name: 'Ethereum', symbol: 'ETH', price: 3218.44, change24h: -1.12, image: '/assets/images/ethereum.svg' },
  { name: 'Solana', symbol: 'SOL', price: 152.87, change24h: 5.76, image: '/assets/images/Solana.png' },
  { name: 'BNB', symbol: 'BNB', price: 412.30, change24h: 0.48, image: '/assets/images/BNB.png' },
  { name: 'XRP', symbol: 'XRP', price: 0.5823, change24h: -2.11, image: '/assets/images/XRP.png' },
  { name: 'Cardano', symbol: 'ADA', price: 0.4521, change24h: 1.05, image: '/assets/images/Cardano.png' },
];

const TIME_PERIODS = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

const PortfolioChart = () => {
  const w = 700, h = 120;
  const mid = h / 2;
  const pts = Array.from({ length: 40 }, (_, i) => ({
    x: (i / 39) * w,
    y: mid,
  }));
  const pathD = pts.reduce((d, p, i) => i === 0 ? `M${p.x},${p.y}` : `${d} L${p.x},${p.y}`, '');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 120 }}>
      <defs>
        <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0052FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#dash-grad)" />
      <path d={pathD} stroke="#0052FF" strokeWidth="2" fill="none" />
      <circle cx={w} cy={mid} r="5" fill="#0052FF" />
    </svg>
  );
};

const NavItem = ({ icon, label, active, onClick, to }) => {
  const base = `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-all w-full text-left`;
  const cls = active
    ? `${base} bg-[#0052FF]/10 text-[#0052FF]`
    : `${base} text-[#888A8F] hover:bg-[#1A1B1F] hover:text-white`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        <span className={active ? 'text-[#0052FF]' : 'text-[#5B616E]'}>{icon}</span>
        {label}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      <span className={active ? 'text-[#0052FF]' : 'text-[#5B616E]'}>{icon}</span>
      {label}
    </button>
  );
};

const Sidebar = ({ activeNav, setActiveNav, user, onLogout }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const initials = user?.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'CB';

  const navItems = [
    { id: 'home', icon: <LayoutDashboard size={18} />, label: 'Home' },
    { id: 'assets', icon: <BarChart2 size={18} />, label: 'Assets' },
    { id: 'trade', icon: <ArrowLeftRight size={18} />, label: 'Trade' },
    { id: 'pay', icon: <Send size={18} />, label: 'Pay' },
    { id: 'earn', icon: <Gift size={18} />, label: 'Earn' },
  ];

  return (
    <aside className="w-[240px] shrink-0 flex flex-col h-full bg-[#0A0B0D] border-r border-[#1A1B1F] px-3 py-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 px-3 mb-6">
        <img src="/assets/clone-images/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="h-6 brightness-0 invert" />
      </Link>

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeNav === item.id}
            onClick={() => setActiveNav(item.id)}
          />
        ))}

        <div className="my-3 border-t border-[#1A1B1F]" />

        <NavItem icon={<Compass size={18} />} label="Explore" to="/explore" />
        <NavItem icon={<TrendingUp size={18} />} label="Advanced Trade" active={false} onClick={() => {}} />
      </nav>

      {/* User area */}
      <div className="mt-4 border-t border-[#1A1B1F] pt-3">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1A1B1F] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-white text-[13px] font-semibold truncate">{user?.name || 'Account'}</p>
            <p className="text-[#5B616E] text-[11px] truncate">{user?.email || ''}</p>
          </div>
          <ChevronDown size={14} className={`text-[#5B616E] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {userMenuOpen && (
          <div className="mt-1 bg-[#1A1B1F] border border-[#2D2E33] rounded-xl overflow-hidden">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 text-[#888A8F] hover:text-white hover:bg-[#2D2E33] transition-colors text-[14px]"
            >
              <Settings size={16} />
              Settings
            </Link>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#888A8F] hover:text-[#FF4019] hover:bg-[#2D2E33] transition-colors text-[14px]"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [activePeriod, setActivePeriod] = useState('1D');
  const [cryptos, setCryptos] = useState([]);
  const [loadingCryptos, setLoadingCryptos] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/crypto?limit=10`, { credentials: 'include' });
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          setCryptos(data.data);
        } else {
          setCryptos(FALLBACK_CRYPTOS);
        }
      } catch {
        setCryptos(FALLBACK_CRYPTOS);
      } finally {
        setLoadingCryptos(false);
      }
    };
    fetchCryptos();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const topGainers = [...cryptos].sort((a, b) => b.change24h - a.change24h).slice(0, 4);

  return (
    <div className="flex h-screen bg-[#0A0B0D] font-inter overflow-hidden">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} user={user} onLogout={handleLogout} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[14px] text-gray-700 focus:outline-none focus:border-[#0052FF] w-[260px] transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0052FF]" />
            </button>
            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[11px] font-bold">
                {user?.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'CB'}
              </div>
            </Link>
          </div>
        </div>

        <div className="px-8 py-8 max-w-[1100px]">

          {/* Portfolio header */}
          <div className="mb-8">
            <p className="text-gray-500 text-[13px] font-medium mb-1 uppercase tracking-wider">Total balance</p>
            <div className="flex items-baseline gap-3 mb-1">
              <h1 className="text-[42px] font-bold text-gray-900 tracking-tight">$0.00</h1>
              <span className="text-[15px] font-medium text-gray-400">USD</span>
            </div>
            <p className="text-[14px] text-gray-400">
              <span className="text-gray-400">$0.00</span>{' '}
              <span className="text-gray-400">(0.00%)</span>{' '}
              <span className="text-gray-400">Today</span>
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 mb-8">
            {[
              { icon: <Plus size={18} />, label: 'Buy', color: 'bg-[#0052FF] text-white hover:bg-[#1652F0]' },
              { icon: <ArrowUpRight size={18} />, label: 'Send', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
              { icon: <ArrowDownLeft size={18} />, label: 'Receive', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
              { icon: <RefreshCw size={18} />, label: 'Convert', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
            ].map(({ icon, label, color }) => (
              <button key={label} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-colors ${color}`}>
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              {TIME_PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
                    activePeriod === p
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <PortfolioChart />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-[12px] text-gray-400">No activity yet</span>
              <span className="text-[12px] text-gray-400">Add funds to start trading</span>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Assets table - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="text-[16px] font-bold text-gray-900">Your assets</h2>
                  <Link to="/explore" className="text-[#0052FF] text-[13px] font-semibold hover:underline">
                    View all
                  </Link>
                </div>

                {/* Empty state */}
                <div className="px-6 py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                    <BarChart2 size={28} className="text-gray-300" />
                  </div>
                  <p className="text-gray-900 font-semibold text-[16px] mb-1">No assets yet</p>
                  <p className="text-gray-500 text-[14px] mb-5">Buy your first crypto to get started.</p>
                  <button className="bg-[#0052FF] text-white px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#1652F0] transition-colors">
                    Buy crypto
                  </button>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">

              {/* Market movers */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h2 className="text-[15px] font-bold text-gray-900">Top gainers today</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {loadingCryptos ? (
                    Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="px-5 py-3.5 flex items-center gap-3 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-gray-100" />
                        <div className="flex-1">
                          <div className="h-3.5 bg-gray-100 rounded w-16 mb-1.5" />
                          <div className="h-3 bg-gray-100 rounded w-10" />
                        </div>
                        <div className="h-3.5 bg-gray-100 rounded w-12" />
                      </div>
                    ))
                  ) : topGainers.map((coin) => (
                    <div key={coin.symbol} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {coin.image ? (
                          <img src={coin.image} alt={coin.symbol} className="w-6 h-6 object-contain" />
                        ) : (
                          <span className="text-[11px] font-bold text-gray-500">{coin.symbol?.slice(0, 2)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-[14px] font-semibold truncate">{coin.name}</p>
                        <p className="text-gray-400 text-[12px]">{coin.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 text-[13px] font-semibold">
                          ${typeof coin.price === 'number' ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : coin.price}
                        </p>
                        <p
                          className="text-[12px] font-medium"
                          style={{ color: coin.change24h >= 0 ? '#05B169' : '#FF4019' }}
                        >
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3.5 border-t border-gray-50">
                  <Link to="/explore" className="text-[#0052FF] text-[13px] font-semibold hover:underline">
                    View all assets →
                  </Link>
                </div>
              </div>

              {/* Verification card */}
              <div className="bg-[#0052FF]/5 border border-[#0052FF]/15 rounded-2xl p-5">
                <p className="text-gray-900 font-semibold text-[15px] mb-1.5">Complete your profile</p>
                <p className="text-gray-500 text-[13px] mb-4 leading-relaxed">
                  Verify your identity to unlock higher limits and full trading access.
                </p>
                <Link
                  to="/verify-id"
                  className="block text-center bg-[#0052FF] text-white rounded-full py-2.5 text-[14px] font-bold hover:bg-[#1652F0] transition-colors"
                >
                  Verify identity
                </Link>
              </div>
            </div>

          </div>

          {/* Market overview */}
          <div className="mt-6 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-gray-900">Market overview</h2>
              <Link to="/explore" className="text-[#0052FF] text-[13px] font-semibold hover:underline">
                Explore all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['Asset', 'Price', '24h change', 'Market cap', ''].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-[12px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingCryptos
                    ? Array.from({ length: 5 }, (_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-100" />
                              <div>
                                <div className="h-3.5 bg-gray-100 rounded w-20 mb-1.5" />
                                <div className="h-3 bg-gray-100 rounded w-10" />
                              </div>
                            </div>
                          </td>
                          {[1, 2, 3, 4].map((j) => (
                            <td key={j} className="px-6 py-4"><div className="h-3.5 bg-gray-100 rounded w-16" /></td>
                          ))}
                        </tr>
                      ))
                    : cryptos.slice(0, 6).map((coin) => (
                        <tr key={coin.symbol} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                {coin.image ? (
                                  <img src={coin.image} alt={coin.symbol} className="w-7 h-7 object-contain" />
                                ) : (
                                  <span className="text-[12px] font-bold text-gray-500">{coin.symbol?.slice(0, 2)}</span>
                                )}
                              </div>
                              <div>
                                <p className="text-gray-900 font-semibold text-[14px]">{coin.name}</p>
                                <p className="text-gray-400 text-[12px]">{coin.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-900 font-semibold text-[14px] whitespace-nowrap">
                            ${typeof coin.price === 'number' ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : coin.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="text-[13px] font-semibold px-2 py-1 rounded-full"
                              style={{
                                color: coin.change24h >= 0 ? '#05B169' : '#FF4019',
                                background: coin.change24h >= 0 ? '#05B16915' : '#FF401915',
                              }}
                            >
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-[13px] whitespace-nowrap">
                            —
                          </td>
                          <td className="px-6 py-4">
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0052FF] text-white px-4 py-1.5 rounded-full text-[13px] font-semibold hover:bg-[#1652F0]">
                              Buy
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
