import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Info } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';

const STAKING_ASSETS = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    apy: '3.5%',
    minAmount: '$1',
    description: 'Earn rewards by staking ETH and helping secure the Ethereum network.',
    risk: 'Low',
    lockup: 'Flexible',
    image: '/assets/images/ethereum.svg',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    apy: '5.2%',
    minAmount: '$1',
    description: 'Delegate SOL to validators and earn staking rewards on Solana.',
    risk: 'Low',
    lockup: 'Flexible',
    image: '/assets/images/Solana.png',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    apy: '3.8%',
    minAmount: '$1',
    description: 'Delegate ADA to a stake pool and earn passive rewards.',
    risk: 'Low',
    lockup: 'Flexible',
    image: '/assets/images/Cardano.png',
  },
  {
    name: 'Cosmos',
    symbol: 'ATOM',
    apy: '17.2%',
    minAmount: '$1',
    description: 'Stake ATOM to help secure the Cosmos Hub and earn high rewards.',
    risk: 'Medium',
    lockup: '21 day unbonding',
    image: null,
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    apy: '12%',
    minAmount: '$1',
    description: 'Nominate validators to earn staking rewards on Polkadot.',
    risk: 'Medium',
    lockup: '28 day unbonding',
    image: null,
  },
  {
    name: 'Polygon',
    symbol: 'POL',
    apy: '4.5%',
    minAmount: '$1',
    description: 'Delegate POL to validators and earn rewards on the Polygon network.',
    risk: 'Low',
    lockup: 'Flexible',
    image: null,
  },
];

const Earn = () => {
  const [stakeModal, setStakeModal] = useState(null);
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CB';

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
            <h1 className="text-[28px] font-bold text-gray-900 mb-2">Earn rewards</h1>
            <p className="text-gray-500 text-[15px]">
              Grow your crypto by staking. Earn rewards automatically — no lock-up required for most assets.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Total staked', value: '$0.00', sub: 'across 0 assets' },
              { label: 'Total earned', value: '$0.00', sub: 'all-time rewards' },
              { label: 'Est. monthly', value: '$0.00', sub: 'based on staked amount' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <p className="text-gray-500 text-[12px] font-medium uppercase tracking-wider mb-2">{label}</p>
                <p className="text-gray-900 font-bold text-[22px]">{value}</p>
                <p className="text-gray-400 text-[13px] mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[18px] font-bold text-gray-900 mb-4">Eligible assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAKING_ASSETS.map((asset) => (
              <div
                key={asset.symbol}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    {asset.image ? (
                      <img src={asset.image} alt={asset.symbol} className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-[13px] font-bold text-gray-500">{asset.symbol.slice(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-bold text-[15px]">{asset.name}</p>
                    <p className="text-gray-400 text-[12px]">{asset.symbol}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#05B169] font-bold text-[18px]">{asset.apy}</p>
                    <p className="text-gray-400 text-[11px]">APY</p>
                  </div>
                </div>

                <p className="text-gray-500 text-[13px] mb-4 leading-relaxed">{asset.description}</p>

                <div className="flex items-center justify-between text-[12px] mb-4 pb-4 border-b border-gray-50">
                  <div>
                    <p className="text-gray-400 mb-0.5">Min. investment</p>
                    <p className="text-gray-700 font-semibold">{asset.minAmount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-0.5">Lockup</p>
                    <p className="text-gray-700 font-semibold">{asset.lockup}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 mb-0.5">Risk</p>
                    <p
                      className="font-semibold"
                      style={{ color: asset.risk === 'Low' ? '#05B169' : '#FF9500' }}
                    >
                      {asset.risk}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStakeModal(asset)}
                  className="w-full bg-[#0052FF] text-white rounded-full py-2.5 text-[14px] font-bold hover:bg-[#1652F0] transition-colors"
                >
                  Stake {asset.symbol}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl">
            <Info size={16} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-gray-500 text-[13px] leading-relaxed">
              Staking rewards are not guaranteed and APY rates may change over time. Staking involves risk
              including the potential loss of principal. This is a demo application — no real funds are involved.
            </p>
          </div>
        </div>
      </main>

      {stakeModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setStakeModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {stakeModal.image ? (
                  <img src={stakeModal.image} alt={stakeModal.symbol} className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-[13px] font-bold text-gray-500">{stakeModal.symbol.slice(0, 2)}</span>
                )}
              </div>
              <div>
                <p className="text-gray-900 font-bold text-[16px]">Stake {stakeModal.name}</p>
                <p className="text-[#05B169] font-semibold text-[14px]">{stakeModal.apy} APY</p>
              </div>
            </div>
            <p className="text-gray-500 text-[13px] mb-5">
              You have no {stakeModal.symbol} available to stake. Buy {stakeModal.symbol} first to start earning rewards.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStakeModal(null)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-full text-[14px] font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <Link
                to="/trade"
                className="flex-1 py-2.5 bg-[#0052FF] text-white rounded-full text-[14px] font-bold hover:bg-[#1652F0] transition-colors text-center"
              >
                Buy {stakeModal.symbol}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earn;
