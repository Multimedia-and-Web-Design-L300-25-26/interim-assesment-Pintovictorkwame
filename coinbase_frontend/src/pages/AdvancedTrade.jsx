import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Bell, TrendingUp, TrendingDown, Settings, BarChart2, BookOpen, RefreshCw, List, ArrowUpDown } from 'lucide-react';
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

const genOrderBook = (midPrice, side) =>
  Array.from({ length: 7 }, (_, i) => {
    const offset = (i + 1) * (midPrice * 0.0004);
    const price = side === 'ask' ? midPrice + offset : midPrice - offset;
    const size = parseFloat((Math.random() * 0.8 + 0.05).toFixed(4));
    return { price, size };
  });

const genTrades = (midPrice) =>
  Array.from({ length: 10 }, (_, i) => ({
    price: midPrice + (Math.random() - 0.5) * midPrice * 0.003,
    size: parseFloat((Math.random() * 0.5 + 0.01).toFixed(4)),
    side: Math.random() > 0.5 ? 'buy' : 'sell',
    time: new Date(Date.now() - i * 3000).toLocaleTimeString('en-US', { hour12: false }),
  }));

const CandlestickChart = ({ price }) => {
  const candles = Array.from({ length: 42 }, (_, i) => {
    const open = price + (Math.sin(i * 0.4) * price * 0.015) + (Math.random() - 0.5) * price * 0.01;
    const close = open + (Math.random() - 0.46) * price * 0.012;
    const high = Math.max(open, close) + Math.random() * price * 0.005;
    const low = Math.min(open, close) - Math.random() * price * 0.005;
    return { open, close, high, low, bull: close >= open };
  });

  const prices = candles.flatMap((c) => [c.high, c.low]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;
  const w = 600, h = 180;
  const slotW = w / candles.length;
  const bodyW = slotW * 0.6;
  const toY = (p) => h - ((p - minP) / range) * (h - 8) - 4;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      {candles.map((c, i) => {
        const cx = i * slotW + slotW / 2;
        const bodyTop = Math.min(toY(c.open), toY(c.close));
        const bodyH = Math.max(Math.abs(toY(c.open) - toY(c.close)), 2);
        const col = c.bull ? '#05B169' : '#FF4019';
        return (
          <g key={i}>
            <line x1={cx} y1={toY(c.high)} x2={cx} y2={toY(c.low)} stroke={col} strokeWidth="1" />
            <rect x={cx - bodyW / 2} y={bodyTop} width={bodyW} height={bodyH} fill={col} />
          </g>
        );
      })}
    </svg>
  );
};

const AdvancedTrade = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [tab, setTab] = useState('buy');
  const [orderType, setOrderType] = useState('limit');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [rightPanel, setRightPanel] = useState('book');
  const [chartPeriod, setChartPeriod] = useState('1h');
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
        const first = coins[0];
        setSelected(first);
        setLimitPrice(first?.price?.toFixed(2) || '');
      } catch {
        setCryptos(FALLBACK_CRYPTOS);
        setSelected(FALLBACK_CRYPTOS[0]);
        setLimitPrice(FALLBACK_CRYPTOS[0].price.toFixed(2));
      }
    })();
  }, []);

  const asks = selected ? genOrderBook(selected.price, 'ask') : [];
  const bids = selected ? genOrderBook(selected.price, 'bid') : [];
  const trades = selected ? genTrades(selected.price) : [];
  const spread = asks[0] && bids[0] ? (asks[0].price - bids[0].price).toFixed(2) : '—';

  return (
    <div className="flex h-screen bg-[#0A0B0D] font-inter overflow-hidden">
      <DashboardSidebar />

      <main className="flex-1 overflow-hidden bg-[#0A0B0D] flex flex-col">
        <div className="bg-[#111214] border-b border-[#1A1B1F] px-4 py-2.5 flex items-center gap-4 shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="flex items-center gap-2 hover:bg-[#1A1B1F] px-2.5 py-1.5 rounded-xl transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#2D2E33] overflow-hidden flex items-center justify-center">
                {selected?.image ? (
                  <img src={selected.image} alt={selected.symbol} className="w-5 h-5 object-contain" />
                ) : (
                  <span className="text-[9px] font-bold text-white">{selected?.symbol?.slice(0, 2)}</span>
                )}
              </div>
              <span className="text-white font-bold text-[15px]">{selected?.symbol || 'BTC'}-USD</span>
              <ChevronDown size={14} className="text-[#5B616E]" />
            </button>

            {showPicker && (
              <div className="absolute top-full left-0 mt-1 w-[220px] bg-[#111214] border border-[#2D2E33] rounded-xl shadow-xl z-30 overflow-hidden">
                <div className="p-2 border-b border-[#1A1B1F]">
                  <input
                    type="text"
                    placeholder="Search pairs..."
                    className="w-full px-3 py-2 bg-[#1A1B1F] text-white rounded-lg text-[13px] focus:outline-none border border-[#2D2E33] placeholder:text-[#5B616E]"
                  />
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {cryptos.map((coin) => (
                    <button
                      key={coin.symbol}
                      onClick={() => {
                        setSelected(coin);
                        setLimitPrice(coin.price?.toFixed(2) || '');
                        setShowPicker(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#1A1B1F] text-left transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#2D2E33] overflow-hidden flex items-center justify-center shrink-0">
                        {coin.image ? (
                          <img src={coin.image} alt={coin.symbol} className="w-4 h-4 object-contain" />
                        ) : (
                          <span className="text-[8px] font-bold text-white">{coin.symbol?.slice(0, 2)}</span>
                        )}
                      </div>
                      <span className="text-white text-[13px] font-semibold flex-1">{coin.symbol}-USD</span>
                      <span className="text-[#5B616E] text-[12px]">
                        ${coin.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selected && (
            <div className="flex items-center gap-5 text-[13px]">
              <span className="text-white font-bold text-[17px]">
                ${selected.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span
                className="flex items-center gap-1 font-semibold"
                style={{ color: selected.change24h >= 0 ? '#05B169' : '#FF4019' }}
              >
                {selected.change24h >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {selected.change24h >= 0 ? '+' : ''}{selected.change24h?.toFixed(2)}%
                <span className="text-[#5B616E] font-normal ml-0.5">24h</span>
              </span>
              <span className="text-[#5B616E]">
                24h High <span className="text-white font-medium">
                  ${(selected.price * 1.021).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </span>
              <span className="text-[#5B616E]">
                24h Low <span className="text-white font-medium">
                  ${(selected.price * 0.972).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </span>
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-[#1A1B1F] transition-colors">
              <Settings size={15} className="text-[#5B616E]" />
            </button>
            <button className="relative p-2 rounded-lg hover:bg-[#1A1B1F] transition-colors">
              <Bell size={15} className="text-[#5B616E]" />
            </button>
            <Link
              to="/profile"
              className="w-7 h-7 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[11px] font-bold"
            >
              {initials}
            </Link>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">

          <div className="flex-1 flex flex-col border-r border-[#1A1B1F] overflow-hidden">
            <div className="bg-[#111214] border-b border-[#1A1B1F] px-4 py-1.5 flex items-center gap-1">
              {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
                    chartPeriod === p ? 'bg-[#1A1B1F] text-white' : 'text-[#5B616E] hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
              <div className="w-px h-4 bg-[#2D2E33] mx-1" />
              <button className="flex items-center gap-1 text-[12px] text-[#5B616E] hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#1A1B1F]">
                <BarChart2 size={13} />
                Indicators
              </button>
            </div>

            <div className="flex-1 bg-[#0D0E10] px-4 pt-4 pb-2 min-h-0">
              {selected && <CandlestickChart price={selected.price} />}
            </div>

            <div className="bg-[#111214] border-t border-[#1A1B1F] flex flex-col" style={{ height: 170 }}>
              <div className="flex border-b border-[#1A1B1F] shrink-0">
                {['Open orders (0)', 'Order history', 'Trade history'].map((t, i) => (
                  <button
                    key={t}
                    className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
                      i === 0
                        ? 'text-white border-b-2 border-[#0052FF]'
                        : 'text-[#5B616E] hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <List size={18} className="text-[#2D2E33] mx-auto mb-2" />
                  <p className="text-[#5B616E] text-[12px]">No open orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[210px] shrink-0 flex flex-col border-r border-[#1A1B1F] bg-[#0D0E10]">
            <div className="flex border-b border-[#1A1B1F] shrink-0">
              <button
                onClick={() => setRightPanel('book')}
                className={`flex-1 py-2 text-[12px] font-semibold flex items-center justify-center gap-1 transition-colors ${
                  rightPanel === 'book' ? 'text-white' : 'text-[#5B616E] hover:text-white'
                }`}
              >
                <BookOpen size={12} /> Book
              </button>
              <button
                onClick={() => setRightPanel('trades')}
                className={`flex-1 py-2 text-[12px] font-semibold flex items-center justify-center gap-1 transition-colors ${
                  rightPanel === 'trades' ? 'text-white' : 'text-[#5B616E] hover:text-white'
                }`}
              >
                <RefreshCw size={12} /> Trades
              </button>
            </div>

            {rightPanel === 'book' ? (
              <div className="flex-1 overflow-y-auto text-[11px] font-mono">
                <div className="grid grid-cols-2 px-3 py-1 border-b border-[#1A1B1F] sticky top-0 bg-[#0D0E10]">
                  <span className="text-[#5B616E]">Price</span>
                  <span className="text-[#5B616E] text-right">Size</span>
                </div>
                {asks.slice().reverse().map((a, i) => (
                  <div key={i} className="relative grid grid-cols-2 px-3 py-0.5 hover:bg-[#FF4019]/5">
                    <div
                      className="absolute inset-0 bg-[#FF4019]/10"
                      style={{ width: `${Math.min(a.size / 1.2, 1) * 100}%` }}
                    />
                    <span className="text-[#FF4019] relative z-10">
                      {a.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[#888A8F] text-right relative z-10">{a.size.toFixed(4)}</span>
                  </div>
                ))}
                <div className="px-3 py-1.5 border-y border-[#1A1B1F] bg-[#111214] flex justify-between">
                  <span className="text-white font-bold text-[12px]">
                    ${selected?.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[#5B616E] text-[10px]">Spread ${spread}</span>
                </div>
                {bids.map((b, i) => (
                  <div key={i} className="relative grid grid-cols-2 px-3 py-0.5 hover:bg-[#05B169]/5">
                    <div
                      className="absolute inset-0 bg-[#05B169]/10"
                      style={{ width: `${Math.min(b.size / 1.2, 1) * 100}%` }}
                    />
                    <span className="text-[#05B169] relative z-10">
                      {b.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[#888A8F] text-right relative z-10">{b.size.toFixed(4)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto text-[11px] font-mono">
                <div className="grid grid-cols-3 px-3 py-1 border-b border-[#1A1B1F] sticky top-0 bg-[#0D0E10]">
                  <span className="text-[#5B616E]">Price</span>
                  <span className="text-[#5B616E] text-right">Size</span>
                  <span className="text-[#5B616E] text-right">Time</span>
                </div>
                {trades.map((t, i) => (
                  <div key={i} className="grid grid-cols-3 px-3 py-0.5 hover:bg-[#1A1B1F]">
                    <span style={{ color: t.side === 'buy' ? '#05B169' : '#FF4019' }}>
                      {t.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[#888A8F] text-right">{t.size.toFixed(4)}</span>
                    <span className="text-[#5B616E] text-right">{t.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-[250px] shrink-0 flex flex-col bg-[#111214]">
            <div className="flex border-b border-[#1A1B1F] shrink-0">
              {['buy', 'sell'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-[14px] font-bold capitalize transition-colors ${
                    tab === t
                      ? t === 'buy'
                        ? 'text-[#05B169] border-b-2 border-[#05B169]'
                        : 'text-[#FF4019] border-b-2 border-[#FF4019]'
                      : 'text-[#5B616E]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-1 bg-[#0A0B0D] rounded-xl p-1">
                {['market', 'limit', 'stop'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-colors ${
                      orderType === type ? 'bg-[#1A1B1F] text-white' : 'text-[#5B616E] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex justify-between text-[12px]">
                <span className="text-[#5B616E]">Available</span>
                <span className="text-white font-medium">$0.00 USD</span>
              </div>

              {orderType !== 'market' && (
                <div>
                  <label className="text-[11px] text-[#5B616E] uppercase tracking-wider mb-1.5 block">
                    Limit price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full bg-[#0A0B0D] border border-[#2D2E33] text-white rounded-xl px-3 pr-12 py-2.5 text-[13px] focus:outline-none focus:border-[#0052FF] font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B616E] text-[11px]">USD</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] text-[#5B616E] uppercase tracking-wider mb-1.5 block">
                  Amount ({selected?.symbol || 'BTC'})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00000"
                    className="w-full bg-[#0A0B0D] border border-[#2D2E33] text-white rounded-xl px-3 pr-12 py-2.5 text-[13px] focus:outline-none focus:border-[#0052FF] font-mono placeholder:text-[#2D2E33]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B616E] text-[11px]">
                    {selected?.symbol}
                  </span>
                </div>
                {amount && selected?.price && (
                  <p className="text-[#5B616E] text-[11px] mt-1 flex items-center gap-1">
                    <ArrowUpDown size={10} />
                    ≈ ${(parseFloat(amount) * selected.price).toFixed(2)} USD
                  </p>
                )}
              </div>

              <div className="flex gap-1.5">
                {['25%', '50%', '75%', '100%'].map((pct) => (
                  <button
                    key={pct}
                    className="flex-1 py-1.5 bg-[#0A0B0D] hover:bg-[#1A1B1F] text-[#5B616E] hover:text-white rounded-lg text-[11px] font-semibold transition-colors border border-[#1A1B1F]"
                  >
                    {pct}
                  </button>
                ))}
              </div>

              <div className="bg-[#0A0B0D] rounded-xl p-3 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-[#5B616E]">Est. total</span>
                  <span className="text-white">
                    {amount && selected?.price
                      ? `$${(parseFloat(amount) * selected.price).toFixed(2)}`
                      : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B616E]">Fee (0.6%)</span>
                  <span className="text-white">
                    {amount && selected?.price
                      ? `$${(parseFloat(amount) * selected.price * 0.006).toFixed(4)}`
                      : '—'}
                  </span>
                </div>
              </div>

              <button
                className="w-full rounded-xl py-3 text-[14px] font-bold transition-colors"
                style={{
                  background: tab === 'buy' ? '#05B169' : '#FF4019',
                  color: 'white',
                }}
              >
                {tab === 'buy' ? `Buy ${selected?.symbol || ''}` : `Sell ${selected?.symbol || ''}`}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdvancedTrade;
