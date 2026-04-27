const CoinbaseOne = () => {
    return (
        <section className="bg-white px-6 py-16 md:px-10 md:py-24 flex flex-col md:flex-row items-center gap-16 font-inter border-t border-gray-50">
            <div className="flex-1 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-[10px] md:text-[15px] text-[#0A0B0D] mb-8 uppercase tracking-widest">
                    <span className="w-4 h-4 bg-[#0052FF] rounded-full flex items-center justify-center text-white text-[8px]">C</span>
                    COINBASE ONE
                </div>
                <h2 className="text-[20px] md:text-[45px] text-[#0A0B0D] tracking-tighter leading-[0.95] mb-8">
                    Zero trading fees, <br /> more rewards.
                </h2>
                <p className="text-[8px] md:text-[16px] text-[#0A0B0D] mb-12 font-medium  opacity-70 leading-relaxed">
                    Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
                </p>
                <button className="bg-[#0A0B0D] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all cursor-pointer">
                    Claim free trial
                </button>
            </div>
            <div className="flex-1 w-full bg-[#F4F6F8] rounded-[40px] overflow-hidden flex items-center justify-center p-8 md:p-12">
                <img
                    src="/assets/clone-images/zero_fees_us.png"
                    alt="Coinbase One App View"
                    className="w-full max-w-md rounded-[24px] shadow-2xl"
                />
            </div>
        </section>
    );
};

export default CoinbaseOne;
