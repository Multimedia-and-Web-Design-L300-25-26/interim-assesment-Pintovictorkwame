import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';

const Explore = () => {
    const assets = [
        { name: 'Bitcoin', symbol: 'BTC', price: '$64,126.83', change: '+1.02%', isUp: true, icon: '/assets/images/bitcoin.svg', marketCap: '$1.2T', volume: '$32.4B' },
        { name: 'Ethereum', symbol: 'ETH', price: '$3,433.53', change: '+2.25%', isUp: true, icon: '/assets/images/ethereum.svg', marketCap: '$412B', volume: '$15.2B' },
        { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '0.00%', isUp: true, icon: '/assets/images/Tether.png', marketCap: '$104B', volume: '$45.1B' },
        { name: 'BNB', symbol: 'BNB', price: '$569.54', change: '-1.34%', isUp: false, icon: '/assets/images/BNB.png', marketCap: '$85.2B', volume: '$1.8B' },
        { name: 'Solana', symbol: 'SOL', price: '$145.80', change: '+8.94%', isUp: true, icon: '/assets/images/Solana.png', marketCap: '$65.1B', volume: '$4.2B' },
        { name: 'XRP', symbol: 'XRP', price: '$0.58', change: '-0.94%', isUp: false, icon: '/assets/images/XRP.png', marketCap: '$31.8B', volume: '$1.1B' },
        { name: 'USDC', symbol: 'USDC', price: '$1.00', change: '--', isUp: true, icon: '/assets/images/USDC.png', marketCap: '$28.5B', volume: '$4.1B' },
        { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '+0.54%', isUp: true, icon: '/assets/images/Cardano.png', marketCap: '$16.2B', volume: '$450M' },
        { name: 'Avalanche', symbol: 'AVAX', price: '$35.20', change: '-2.1%', isUp: false, icon: '/assets/images/Avalanche.png', marketCap: '$13.4B', volume: '$320M' },
        { name: 'Dogecoin', symbol: 'DOGE', price: '$0.15', change: '+4.2%', isUp: true, icon: '/assets/images/Dogecoin.png', marketCap: '$21.8B', volume: '$1.5B' }
    ];

    return (
        <>
            <Navbar />
            <main className="flex-grow bg-white min-h-screen">
                <div className="max-w-[1240px] mx-auto px-6 py-12">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div>
                            <h1 className="text-[32px] md:text-[40px] font-bold text-[#0A0B0D] mb-2 font-inter tracking-tight">Explore the cryptoeconomy</h1>
                            <p className="text-[#5B616E] text-[16px] font-medium">Discover new assets, check prices, and track the market.</p>
                        </div>

                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search size={18} className="text-[#5B616E]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for an asset"
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-full text-[15px] focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition-colors shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="whitespace-nowrap bg-[#0A0B0D] text-white px-5 py-2 rounded-full font-bold text-[14px]">All assets</button>
                        <button className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] hover:bg-gray-200 px-5 py-2 rounded-full font-bold text-[14px] transition-colors cursor-pointer">Tradable</button>
                        <button className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] hover:bg-gray-200 px-5 py-2 rounded-full font-bold text-[14px] transition-colors cursor-pointer">Gainers</button>
                        <button className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] hover:bg-gray-200 px-5 py-2 rounded-full font-bold text-[14px] transition-colors cursor-pointer">Losers</button>
                        <button className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] hover:bg-gray-200 px-5 py-2 rounded-full font-bold text-[14px] transition-colors cursor-pointer">DeFi</button>
                        <button className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] hover:bg-gray-200 px-5 py-2 rounded-full font-bold text-[14px] transition-colors cursor-pointer">Layer 1</button>
                        <button className="whitespace-nowrap bg-gray-100 text-[#0A0B0D] hover:bg-gray-200 px-5 py-2 rounded-full font-bold text-[14px] transition-colors cursor-pointer">NFTs</button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider pl-4">Name</th>
                                    <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right">Price</th>
                                    <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right">Change</th>
                                    <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right hidden md:table-cell">Market Cap</th>
                                    <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right hidden lg:table-cell">Volume (24h)</th>
                                    <th className="py-4 text-[#5B616E] font-semibold text-[13px] uppercase tracking-wider text-right pr-4">Trade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset, index) => (
                                    <tr key={asset.symbol} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <td className="py-5 pl-4 flex items-center gap-4">
                                            <span className="text-[#5B616E] font-medium w-4 hidden sm:block">{index + 1}</span>
                                            <img src={asset.icon} alt={asset.name} className="w-8 h-8 rounded-full border border-gray-100" />
                                            <div>
                                                <div className="font-bold text-[#0A0B0D] text-[16px]">{asset.name}</div>
                                                <div className="text-[#5B616E] font-medium text-[14px]">{asset.symbol}</div>
                                            </div>
                                        </td>
                                        <td className="py-5 text-right font-medium text-[#0A0B0D] text-[16px]">
                                            {asset.price}
                                        </td>
                                        <td className={`py-5 text-right font-medium text-[16px] ${asset.isUp ? 'text-[#00D180]' : 'text-[#FF4019]'}`}>
                                            {asset.change}
                                        </td>
                                        <td className="py-5 text-right font-medium text-[#0A0B0D] text-[16px] hidden md:table-cell">
                                            {asset.marketCap}
                                        </td>
                                        <td className="py-5 text-right font-medium text-[#0A0B0D] text-[16px] hidden lg:table-cell">
                                            {asset.volume}
                                        </td>
                                        <td className="py-5 text-right pr-4">
                                            <button className="bg-[#0052FF] text-white px-4 py-2 rounded-full font-bold text-[14px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                Buy
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Explore;
