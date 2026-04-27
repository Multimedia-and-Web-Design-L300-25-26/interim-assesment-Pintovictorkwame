const CryptoTable = () => {
    const assets = [
        { name: 'Bitcoin', symbol: 'BTC', price: 'GHS 725,126.83', change: '1.02%', isUp: false, icon: '/assets/images/bitcoin.svg' },
        { name: 'Ethereum', symbol: 'ETH', price: 'GHS 20,933.53', change: '2.25%', isUp: false, icon: '/assets/images/ethereum.svg' },
        { name: 'Tether', symbol: 'USDT', price: 'GHS 10.77', change: '0.00%', isUp: true, icon: '/assets/images/Tether.png' },
        { name: 'BNB', symbol: 'BNB', price: 'GHS 6,669.54', change: '1.34%', isUp: false, icon: '/assets/images/BNB.png' },
        { name: 'XRP', symbol: 'XRP', price: 'GHS 14.58', change: '0.94%', isUp: false, icon: '/assets/images/XRP.png' },
        { name: 'USDC', symbol: 'USDC', price: 'GHS 10.77', change: '--', isUp: true, icon: '/assets/images/USDC.png' },
    ];

    return (
        <section className="bg-white px-6 py-16 md:px-10 md:py-24 flex flex-col md:flex-row items-center gap-12 font-inter border-t border-gray-50">
            <div className="flex-1 max-w-xl">
                <h2 className="text-[20px] md:text-[45px] text-[#0A0B0D] tracking-tighter leading-[0.95] mb-8">
                    Explore crypto like Bitcoin, Ethereum, and Dogecoin.
                </h2>
                <p className="text-[8px] md:text-[16px] text-[#0A0B0D] mb-12 font-medium  opacity-70 leading-relaxed">
                    Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
                </p>
                <button className="bg-[#0A0B0D] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all cursor-pointer">
                    See more assets
                </button>
            </div>
            <div className="flex-1 w-full bg-[#0A0B0D] rounded-[40px] p-8 text-white shadow-2xl overflow-hidden max-w-xl">
                <div className="flex gap-6 mb-10">
                    <button className="bg-[#2D2E33] px-5 py-2 rounded-full font-bold text-base cursor-pointer">Tradable</button>
                    <button className="text-[#888A8F] font-bold text-base hover:text-white transition-colors cursor-pointer">Top gainers</button>
                    <button className="text-[#888A8F] font-bold text-base hover:text-white transition-colors cursor-pointer">New on Coinbase</button>
                </div>
                <div className="space-y-6">
                    {assets.map((asset) => (
                        <div key={asset.symbol} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={asset.icon} alt={asset.name} className="w-10 h-10 rounded-full bg-white p-0.5" />
                                <span className="text-xl md:text-2xl font-bold tracking-tight">{asset.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-xl md:text-2xl font-bold tracking-tight mb-0.5">{asset.price}</div>
                                <div className={`text-sm md:text-base font-bold flex items-center justify-end gap-1 ${asset.isUp ? 'text-[#00D180]' : 'text-[#FF4019]'}`}>
                                    {asset.isUp ? '↑' : '↓'} {asset.change}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CryptoTable;
