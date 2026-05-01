import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Search, Bell, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth, API_BASE } from '../context/AuthContext';

const FALLBACK_CRYPTOS = [
  { name: 'Bitcoin', symbol: 'BTC', price: 65420.18, change24h: 2.34, image: '/assets/images/bitcoin.svg' },
  { name: 'Ethereum', symbol: 'ETH', price: 3218.44, change24h: -1.12, image: '/assets/images/ethereum.svg' },
  { name: 'Solana', symbol: 'SOL', price: 152.87, change24h: 5.76, image: '/assets/images/Solana.png' },
  { name: 'BNB', symbol: 'BNB', price: 412.30, change24h: 0.48, image: '/assets/images/BNB.png' },
  { name: 'XRP', symbol: 'XRP', price: 0.5823, change24h: -2.11, image: '/assets/images/XRP.png' },
  { name: 'Cardano', symbol: 'ADA', price: 0.4521, change24h: 1.05, image: '/assets/images/Cardano.png' },
];

const Assets = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CB';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/crypto?limit=20`, { credentials: 'include' });
        const data = await res.json();
        setCryptos(data.success && data.data?.length > 0 ? data.data : FALLBACK_CRYPTOS);
      } catch {
        setCryptos(FALLBACK_CRYPTOS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen bg-[#0A0B0D] font-inter overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto bg-white">
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
            <Link
              to="/profile"
              className="w-7 h-7 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[11px] font-bold"
            >
              {initials}
            </Link>
          </div>
        </div>

        <div className="px-8 py-8 max-w-[1100px]">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-gray-900 mb-1">Assets</h1>
            <p className="text-gray-500 text-[14px]">Your portfolio and crypto holdings</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total balance', value: '$0.00', sub: '0 assets' },
              { label: '24h change', value: '$0.00', sub: '0.00%' },
              { label: 'All-time return', value: '$0.00', sub: '0.00%' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <p className="text-gray-500 text-[12px] font-medium uppercase tracking-wider mb-2">{label}</p>
                <p className="text-gray-900 font-bold text-[22px]">{value}</p>
                <p className="text-gray-400 text-[13px] mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-1 mb-6 border-b border-gray-100">
            {[
              { key: 'holdings', label: 'Holdings' },
              { key: 'all', label: 'All assets' },
              { key: 'watchlist', label: 'Watchlist' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-3 text-[14px] font-semibold transition-colors border-b-2 -mb-px ${
                  tab === key
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-400 border-transparent hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'holdings' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm py-16 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <BarChart2 size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold text-[17px] mb-2">No holdings yet</p>
              <p className="text-gray-500 text-[14px] mb-6 max-w-[280px]">
                Buy your first cryptocurrency to see your portfolio here.
              </p>
              <Link
                to="/trade"
                className="bg-[#0052FF] text-white px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#1652F0] transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Buy crypto
              </Link>
            </div>
          )}

          {tab === 'watchlist' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm py-16 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <TrendingUp size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold text-[17px] mb-2">Your watchlist is empty</p>
              <p className="text-gray-500 text-[14px] mb-6 max-w-[280px]">Add assets to track their performance.</p>
              <Link
                to="/explore"
                className="bg-[#0052FF] text-white px-6 py-2.5 rounded-full text-[14px] font-bold hover:bg-[#1652F0] transition-colors"
              >
                Explore assets
              </Link>
            </div>
          )}

          {tab === 'all' && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['Asset', 'Price', '24h change', 'Market cap', 'Volume (24h)', ''].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-[12px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading
                    ? Array.from({ length: 6 }, (_, i) => (
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
                          {[1, 2, 3, 4, 5].map((j) => (
                            <td key={j} className="px-6 py-4">
                              <div className="h-3.5 bg-gray-100 rounded w-16" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : cryptos.map((coin) => (
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
                            ${typeof coin.price === 'number'
                              ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })
                              : coin.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="text-[13px] font-semibold flex items-center gap-1"
                              style={{ color: coin.change24h >= 0 ? '#05B169' : '#FF4019' }}
                            >
                              {coin.change24h >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-[13px]">—</td>
                          <td className="px-6 py-4 text-gray-400 text-[13px]">—</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link
                                to="/trade"
                                className="bg-[#0052FF] text-white px-4 py-1.5 rounded-full text-[13px] font-semibold hover:bg-[#1652F0]"
                              >
                                Buy
                              </Link>
                              <Link
                                to="/trade"
                                className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-[13px] font-semibold hover:bg-gray-200"
                              >
                                Sell
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Assets;
