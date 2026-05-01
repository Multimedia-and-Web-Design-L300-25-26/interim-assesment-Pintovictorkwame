import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, X, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth, API_BASE } from '../context/AuthContext';

const FILTERS = [
  { key: 'all', label: 'All assets' },
  { key: 'gainers', label: 'Gainers' },
  { key: 'new', label: 'New listings' },
];

const formatPrice = (price) => {
  if (typeof price !== 'number') return String(price);
  if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(4)}`;
};

const SkeletonRows = () =>
  Array.from({ length: 8 }, (_, i) => (
    <tr key={i} className="border-b border-gray-100 animate-pulse">
      <td className="py-5 pl-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-100" />
          <div>
            <div className="h-4 bg-gray-100 rounded w-24 mb-1.5" />
            <div className="h-3 bg-gray-100 rounded w-12" />
          </div>
        </div>
      </td>
      <td className="py-5 text-right"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
      <td className="py-5 text-right"><div className="h-4 bg-gray-100 rounded w-14 ml-auto" /></td>
      <td className="py-5 text-right hidden md:table-cell"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
      <td className="py-5 text-right hidden lg:table-cell"><div className="h-4 bg-gray-100 rounded w-16 ml-auto" /></td>
      <td className="py-5 pr-4" />
    </tr>
  ));

const Explore = () => {
  const [filter, setFilter] = useState('all');
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', symbol: '', price: '', image: '', change24h: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const load = async () => {
      try {
        let url;
        if (filter === 'gainers') url = `${API_BASE}/api/crypto/gainers?limit=50`;
        else if (filter === 'new') url = `${API_BASE}/api/crypto/new?limit=50`;
        else url = `${API_BASE}/api/crypto?page=${page}&limit=20`;

        const res = await window.fetch(url, { credentials: 'include' });
        const data = await res.json();

        if (!cancelled && data.success) {
          if (filter === 'all' && page > 1) {
            setCryptos((prev) => [...prev, ...(data.data || [])]);
          } else {
            setCryptos(data.data || []);
          }
          if (data.pagination) {
            setTotalPages(data.pagination.totalPages);
          }
        }
      } catch {

      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [filter, page]);

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    setCryptos([]);
    setPage(1);
    setSearch('');
    setFilter(newFilter);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError('');

    const price = parseFloat(addForm.price);
    const change24h = parseFloat(addForm.change24h);

    if (isNaN(price) || price < 0) {
      setAddError('Price must be a valid non-negative number.');
      return;
    }
    if (isNaN(change24h)) {
      setAddError('24h change must be a valid number (e.g. 2.5 or -1.3).');
      return;
    }

    setAddLoading(true);
    try {
      const res = await window.fetch(`${API_BASE}/api/crypto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: addForm.name.trim(),
          symbol: addForm.symbol.trim().toUpperCase(),
          price,
          change24h,
          ...(addForm.image.trim() && { image: addForm.image.trim() }),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setAddError(data.message || 'Failed to add cryptocurrency.');
      } else {
        setAddSuccess(true);
        setAddForm({ name: '', symbol: '', price: '', image: '', change24h: '' });
        setTimeout(() => {
          setShowAddModal(false);
          setAddSuccess(false);
          setCryptos([]);
          setPage(1);
          setFilter('new');
        }, 1500);
      }
    } catch {
      setAddError('Could not connect to the server. Make sure the backend is running.');
    } finally {
      setAddLoading(false);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setAddError('');
    setAddSuccess(false);
    setAddForm({ name: '', symbol: '', price: '', image: '', change24h: '' });
  };

  const displayed = search.trim()
    ? cryptos.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : cryptos;

  const tableHeader = (
    <thead>
      <tr className="border-b border-gray-200">
        <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider pl-4">Name</th>
        <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right">Price</th>
        <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right">24h change</th>
        <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right hidden md:table-cell">Market cap</th>
        <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right hidden lg:table-cell">Volume (24h)</th>
        <th className="py-4 pr-4" />
      </tr>
    </thead>
  );

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white min-h-screen">
        <div className="max-w-[1240px] mx-auto px-6 py-12">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#0A0B0D] mb-2 font-inter tracking-tight">
                Explore the cryptoeconomy
              </h1>
              <p className="text-[#5B616E] text-[16px] font-medium">
                Discover new assets, check prices, and track the market.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-[#5B616E]" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for an asset"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-full text-[15px] focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition-colors shadow-sm"
                />
              </div>
              {user?.role === 'admin' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="shrink-0 flex items-center gap-2 bg-[#0052FF] text-white px-5 py-3 rounded-full font-bold text-[14px] hover:bg-[#1652F0] transition-colors"
                >
                  <Plus size={16} />
                  Add crypto
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-[14px] transition-colors ${
                  filter === key
                    ? 'bg-[#0A0B0D] text-white'
                    : 'bg-gray-100 text-[#0A0B0D] hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
            {['Losers', 'DeFi', 'Layer 1', 'NFTs'].map((label) => (
              <button
                key={label}
                disabled
                className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] px-5 py-2 rounded-full font-bold text-[14px] opacity-40 cursor-not-allowed"
              >
                {label}
              </button>
            ))}
          </div>

          {filter !== 'all' && (
            <p className="text-[#5B616E] text-[14px] mb-5">
              {filter === 'gainers'
                ? 'Cryptocurrencies with the highest positive 24h price change, sorted highest to lowest.'
                : 'Most recently added cryptocurrencies, sorted newest to oldest.'}
            </p>
          )}

          <div className="overflow-x-auto">
            {loading && cryptos.length === 0 ? (
              <table className="w-full text-left border-collapse">
                {tableHeader}
                <tbody><SkeletonRows /></tbody>
              </table>
            ) : displayed.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-[16px] font-medium">
                  {search
                    ? `No results for "${search}"`
                    : filter === 'gainers'
                    ? 'No assets with a positive 24h change in the database yet.'
                    : 'No cryptocurrencies in the database yet.'}
                </p>
                {!search && user?.role === 'admin' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-5 bg-[#0052FF] text-white px-6 py-2.5 rounded-full font-bold text-[14px] hover:bg-[#1652F0] transition-colors"
                  >
                    Add your first crypto
                  </button>
                )}
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                {tableHeader}
                <tbody>
                  {displayed.map((coin, index) => (
                    <tr
                      key={coin._id || coin.symbol}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                    >
                      <td className="py-5 pl-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[#5B616E] font-medium w-5 text-[13px] hidden sm:block">
                            {filter === 'all' ? (page - 1) * 20 + index + 1 : index + 1}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                            {coin.image ? (
                              <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-8 h-8 object-contain"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            ) : (
                              <span className="text-[11px] font-bold text-gray-500">{coin.symbol?.slice(0, 2)}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-[#0A0B0D] text-[15px]">{coin.name}</div>
                            <div className="text-[#5B616E] font-medium text-[13px]">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-right font-semibold text-[#0A0B0D] text-[15px]">
                        {formatPrice(coin.price)}
                      </td>
                      <td className="py-5 text-right font-semibold text-[15px]">
                        <span
                          className="inline-flex items-center gap-1 justify-end"
                          style={{ color: coin.change24h >= 0 ? '#00D180' : '#FF4019' }}
                        >
                          {coin.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-5 text-right font-medium text-[#5B616E] text-[15px] hidden md:table-cell">—</td>
                      <td className="py-5 text-right font-medium text-[#5B616E] text-[15px] hidden lg:table-cell">—</td>
                      <td className="py-5 text-right pr-4">
                        <Link
                          to="/trade"
                          className="bg-[#0052FF] text-white px-4 py-2 rounded-full font-bold text-[14px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Buy
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filter === 'all' && !loading && !search && page < totalPages && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3 rounded-full font-bold text-[15px] transition-colors"
              >
                Load more
              </button>
            </div>
          )}

          {loading && cryptos.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Loader2 size={24} className="animate-spin text-[#0052FF]" />
            </div>
          )}

        </div>
      </main>
      <Footer />

      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[480px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-[18px] font-bold text-gray-900">Add cryptocurrency</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                    Name <span className="text-[#FF4019]">*</span>
                  </label>
                  <input
                    type="text"
                    value={addForm.name}
                    onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Bitcoin"
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                    Symbol <span className="text-[#FF4019]">*</span>
                  </label>
                  <input
                    type="text"
                    value={addForm.symbol}
                    onChange={(e) => setAddForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))}
                    placeholder="BTC"
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                    Price (USD) <span className="text-[#FF4019]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={addForm.price}
                    onChange={(e) => setAddForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="65000"
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                    24h Change (%) <span className="text-[#FF4019]">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={addForm.change24h}
                    onChange={(e) => setAddForm((f) => ({ ...f, change24h: e.target.value }))}
                    placeholder="2.5"
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Image URL <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  type="url"
                  value={addForm.image}
                  onChange={(e) => setAddForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://example.com/bitcoin.png"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-[#0052FF] transition-colors"
                />
                {addForm.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={addForm.image}
                      alt="preview"
                      className="w-7 h-7 rounded-full object-contain bg-gray-100"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-gray-400 text-[12px]">Image preview</span>
                  </div>
                )}
              </div>

              {addError && (
                <p className="text-[#FF4019] text-[13px] bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                  {addError}
                </p>
              )}
              {addSuccess && (
                <p className="text-[#05B169] text-[13px] bg-green-50 border border-green-100 rounded-xl px-3 py-2.5 font-medium">
                  ✓ Cryptocurrency added! Redirecting to new listings…
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-[14px] hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading || addSuccess}
                  className="flex-1 py-3 bg-[#0052FF] text-white rounded-full font-bold text-[14px] hover:bg-[#1652F0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {addLoading
                    ? <><Loader2 size={15} className="animate-spin" /> Adding…</>
                    : 'Add cryptocurrency'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
