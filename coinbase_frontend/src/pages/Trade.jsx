import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, Info, ArrowUpDown } from 'lucide-react';
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

const TIME_PERIODS = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

const PriceChart = ({ change }) => {
  const positive = (change ?? 0) >= 0;
  const color = positive ? '#05B169' : '#FF4019';
  const w = 500, h = 120;
  const pts = Array.from({ length: 30 }, (_, i) => ({
    x: (i / 29) * w,
    y: h / 2 + (positive ? -1 : 1) * (i / 29) * 35 + Math.sin(i * 0.9) * 10,
  }));
  const pathD = pts.reduce((d, p, i) => (i === 0 ? `M${p.x},${p.y}` : `${d} L${p.x},${p.y}`), '');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 120 }}>
      <defs>
        <linearGradient id="trade-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#trade-grad)" />
      <path d={pathD} stroke={color} strokeWidth="2" fill="none" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4" fill={color} />
    </svg>
  );
};

const Trade = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('buy');
  const [amount, setAmount] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [orderType, setOrderType] = useState('market');
  const [period, setPeriod] = useState('1D');
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CB';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/crypto?limit=20`, { credentials: 'include' });
        const data = await res.json();
        const coins = data.success && data.data?.length > 0 ? data.data : FALLBACK_CRYPTOS;
        setCryptos(coins);
        setSelected(coins[0]);
      } catch {
        setCryptos(FALLBACK_CRYPTOS);
        setSelected(FALLBACK_CRYPTOS[0]);
      }
    })();
  }, []);

  const coinAmt = selected && amount ? (parseFloat(amount) / selected.price).toFixed(6) : null;

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
          <h1 className="text-[28px] font-bold text-gray-900 mb-6">Trade</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <div className="relative mb-4">
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
                  >
                    {selected && (
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {selected.image ? (
                          <img src={selected.image} alt={selected.symbol} className="w-7 h-7 object-contain" />
                        ) : (
                          <span className="text-[12px] font-bold text-gray-500">{selected.symbol?.slice(0, 2)}</span>
                        )}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-gray-900 font-bold text-[18px]">{selected?.name || 'Select asset'}</p>
                      <p className="text-gray-400 text-[13px]">{selected?.symbol}/USD</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 ml-1 transition-transform ${showPicker ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {showPicker && (
                    <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
                      <div className="p-3 border-b border-gray-50">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl text-[14px] focus:outline-none border border-gray-100"
                        />
                      </div>
                      <div className="max-h-[240px] overflow-y-auto">
                        {cryptos.map((coin) => (
                          <button
                            key={coin.symbol}
                            onClick={() => { setSelected(coin); setShowPicker(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                          >
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
                            <p className="text-gray-700 text-[13px] font-medium shrink-0">
                              ${typeof coin.price === 'number'
                                ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : coin.price}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selected && (
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-[32px] font-bold text-gray-900">
                      ${typeof selected.price === 'number'
                        ? selected.price.toLocaleString(undefined, { maximumFractionDigits: 2 })
                        : selected.price}
                    </span>
                    <span
                      className="text-[15px] font-semibold"
                      style={{ color: selected.change24h >= 0 ? '#05B169' : '#FF4019' }}
                    >
                      {selected.change24h >= 0 ? '+' : ''}{selected.change24h?.toFixed(2)}%
                    </span>
                    <span className="text-gray-400 text-[13px]">Today</span>
                  </div>
                )}

                <div className="flex gap-1 mb-4">
                  {TIME_PERIODS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
                        period === p ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <PriceChart change={selected?.change24h} />
              </div>

              {selected && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-4">{selected.name} stats</h3>
                  <div className="grid grid-cols-2 gap-x-8">
                    {[
                      {
                        label: 'Price',
                        value: `$${typeof selected.price === 'number'
                          ? selected.price.toLocaleString(undefined, { maximumFractionDigits: 2 })
                          : selected.price}`,
                      },
                      {
                        label: '24h change',
                        value: `${selected.change24h >= 0 ? '+' : ''}${selected.change24h?.toFixed(2)}%`,
                        color: selected.change24h >= 0 ? '#05B169' : '#FF4019',
                      },
                      { label: 'Market cap', value: '—' },
                      { label: 'Volume (24h)', value: '—' },
                      { label: 'Circulating supply', value: '—' },
                      { label: 'All-time high', value: '—' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50">
                        <span className="text-gray-500 text-[13px]">{label}</span>
                        <span
                          className="text-[13px] font-semibold"
                          style={{ color: color || '#111827' }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden sticky top-[88px]">
                <div className="flex border-b border-gray-100">
                  {['buy', 'sell'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 py-3.5 text-[15px] font-bold capitalize transition-colors ${
                        tab === t
                          ? 'text-gray-900 border-b-2 border-gray-900'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                      Order type
                    </label>
                    <div className="flex gap-2">
                      {['market', 'limit'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setOrderType(type)}
                          className={`flex-1 py-2 rounded-xl text-[13px] font-semibold capitalize transition-colors ${
                            orderType === type
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[16px] font-medium">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[16px] font-semibold text-gray-900 focus:outline-none focus:border-[#0052FF] transition-colors"
                      />
                    </div>
                    {coinAmt && (
                      <p className="text-gray-400 text-[12px] mt-1.5 flex items-center gap-1">
                        <ArrowUpDown size={11} />
                        ≈ {coinAmt} {selected?.symbol}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {['$10', '$50', '$100', '$500'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(v.replace('$', ''))}
                        className="flex-1 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-[12px] font-semibold text-gray-600 transition-colors"
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-500">Coinbase fee (1.5%)</span>
                      <span className="text-gray-700 font-medium">
                        {amount ? `$${(parseFloat(amount) * 0.015).toFixed(2)}` : '$0.00'}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-[14px]">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <span className="text-gray-900 font-bold">
                        {amount ? `$${(parseFloat(amount) * 1.015).toFixed(2)}` : '$0.00'}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-[#0052FF] text-white rounded-full py-3.5 text-[15px] font-bold hover:bg-[#1652F0] transition-colors">
                    {tab === 'buy' ? 'Preview buy' : 'Preview sell'}
                  </button>

                  <p className="text-gray-400 text-[12px] text-center flex items-center justify-center gap-1">
                    <Info size={12} />
                    Quoted price is indicative and may change
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trade;
