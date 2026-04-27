const AdvancedTrader = () => {
    return (
        <section className="bg-white px-6 py-16 md:px-10 md:py-24 flex flex-col md:flex-row items-center gap-16 font-inter">
            <div className="flex-1 w-full bg-[#0A0B0D] rounded-[40px] p-6 md:p-12 flex items-center justify-center">
                <img
                    src="/assets/clone-images/Advanced.png"
                    alt="Advanced Trading Interface"
                    className="w-full h-auto drop-shadow-2xl"
                />
            </div>
            <div className="flex-1 max-w-xl">
                <h2 className="text-[20px] md:text-[45px] text-[#0A0B0D] tracking-tighter leading-[0.95] mb-8">
                    Powerful tools, designed <br className="hidden lg:block" /> for the advanced trader.
                </h2>
                <p className="text-[8px] md:text-[16px] text-[#0A0B0D] mb-12   opacity-70 leading-relaxed">
                    Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
                </p>
                <button className="bg-[#0A0B0D] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all cursor-pointer">
                    Start trading
                </button>
            </div>
        </section>
    );
};

export default AdvancedTrader;
