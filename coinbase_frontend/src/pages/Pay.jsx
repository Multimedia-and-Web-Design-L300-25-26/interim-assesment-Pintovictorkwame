import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Copy, Check, ChevronDown, AlertCircle, QrCode } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';

const ASSETS = [
  { name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin Network', address: '1A2b3C4d5E6f7G8h9I0j1K2L3M4N5O6P' },
  { name: 'Ethereum', symbol: 'ETH', network: 'ERC-20', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { name: 'Solana', symbol: 'SOL', network: 'Solana', address: 'DRpbCBMxVnDK7maPGv6e9MKvRujWKnR1xHBQFb2ATGQ' },
  { name: 'BNB', symbol: 'BNB', network: 'BEP-20', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { name: 'XRP', symbol: 'XRP', network: 'XRP Ledger', address: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh' },
];

const QRPlaceholder = () => (
  <div className="w-[176px] h-[176px] bg-white border-2 border-gray-200 rounded-2xl p-3 flex items-center justify-center">
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {/* Corner finder patterns */}
      <rect x="2" y="2" width="22" height="22" rx="2" fill="none" stroke="#111827" strokeWidth="3" />
      <rect x="7" y="7" width="12" height="12" rx="1" fill="#111827" />
      <rect x="56" y="2" width="22" height="22" rx="2" fill="none" stroke="#111827" strokeWidth="3" />
      <rect x="61" y="7" width="12" height="12" rx="1" fill="#111827" />
      <rect x="2" y="56" width="22" height="22" rx="2" fill="none" stroke="#111827" strokeWidth="3" />
      <rect x="7" y="61" width="12" height="12" rx="1" fill="#111827" />
      {/* Data modules */}
      {[30,34,38,42,46,50,54,58,62,66,70].map((x) =>
        [30,34,38,42,46,50,54,58,62,66,70].map((y) => {
          const seed = (x * 3 + y * 7) % 11;
          return seed > 5 ? <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="#111827" /> : null;
        })
      )}
      {[30,34,38,42,46].map((x) =>
        [2,6,10,14,18].map((y) => {
          const seed = (x * 5 + y * 3) % 7;
          return seed > 3 ? <rect key={`t-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#111827" /> : null;
        })
      )}
      {[2,6,10,14,18].map((x) =>
        [30,34,38,42,46].map((y) => {
          const seed = (x * 7 + y * 2) % 9;
          return seed > 4 ? <rect key={`l-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#111827" /> : null;
        })
      )}
    </svg>
  </div>
);

const Pay = () => {
  const [tab, setTab] = useState('send');
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CB';

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAsset.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const AssetPicker = () => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
      {ASSETS.map((a) => (
        <button
          key={a.symbol}
          onClick={() => { setSelectedAsset(a); setShowPicker(false); }}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
        >
          <div className="flex-1">
            <p className="text-gray-900 text-[14px] font-semibold">{a.name}</p>
            <p className="text-gray-400 text-[12px]">{a.symbol} · {a.network}</p>
          </div>
          <p className="text-gray-500 text-[13px]">0.00 {a.symbol}</p>
        </button>
      ))}
    </div>
  );

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

        <div className="px-8 py-8 max-w-[700px] mx-auto">
          <h1 className="text-[28px] font-bold text-gray-900 mb-6">Pay</h1>

          <div className="flex gap-1 mb-8 bg-gray-50 rounded-2xl p-1.5">
            {['send', 'receive'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-xl text-[14px] font-semibold capitalize transition-colors ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'send' ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5">
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  From
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#0052FF] transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 font-semibold text-[14px]">{selectedAsset.name}</p>
                      <p className="text-gray-400 text-[12px]">Balance: 0.00 {selectedAsset.symbol}</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${showPicker ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {showPicker && <AssetPicker />}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[16px]">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-16 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[16px] font-semibold text-gray-900 focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0052FF] text-[13px] font-semibold hover:underline">
                    Max
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  To
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={`${selectedAsset.symbol} address or Coinbase username`}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-900 focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-amber-700 text-[13px] leading-relaxed">
                  Only send <strong>{selectedAsset.symbol}</strong> on the{' '}
                  <strong>{selectedAsset.network}</strong>. Sending to the wrong network may result in permanent loss.
                </p>
              </div>

              <button
                disabled={!amount || !recipient}
                className="w-full bg-[#0052FF] text-white rounded-full py-3.5 text-[15px] font-bold hover:bg-[#1652F0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5">
              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  Asset
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#0052FF] transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 font-semibold text-[14px]">{selectedAsset.name}</p>
                      <p className="text-gray-400 text-[12px]">{selectedAsset.network}</p>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${showPicker ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {showPicker && <AssetPicker />}
                </div>
              </div>

              <div className="flex flex-col items-center py-4 gap-4">
                <QRPlaceholder />
                <p className="text-gray-500 text-[13px]">Your {selectedAsset.symbol} address</p>
                <div className="flex items-center gap-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <p className="flex-1 text-gray-700 text-[12px] font-mono truncate">{selectedAsset.address}</p>
                  <button onClick={handleCopy} className="shrink-0 transition-colors">
                    {copied
                      ? <Check size={16} className="text-[#05B169]" />
                      : <Copy size={16} className="text-[#0052FF]" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-[#05B169] text-[12px] font-medium -mt-2">Address copied!</p>
                )}
              </div>

              <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-amber-700 text-[13px] leading-relaxed">
                  Only send <strong>{selectedAsset.symbol}</strong> to this address via the{' '}
                  <strong>{selectedAsset.network}</strong>. Sending other assets may result in permanent loss.
                </p>
              </div>

              <button className="w-full bg-gray-100 text-gray-700 rounded-full py-3 text-[14px] font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <QrCode size={16} />
                Share address
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Pay;
