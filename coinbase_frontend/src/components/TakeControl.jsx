import { Link } from 'react-router-dom';

const TakeControl = () => {
    return (
        <>
            <section className="bg-white px-6 py-16 md:px-10 md:py-32 flex flex-col md:flex-row items-center justify-between gap-16 font-inter border-t border-gray-50">
                <div className="flex-1 max-w-xl text-center md:text-left">
                    <h2 className="text-[20px] md:text-[80px] text-[#0A0B0D] tracking-tighter leading-[0.95] mb-8">
                        Take control <br /> of your money
                    </h2>
                    <p className="text-[8px] md:text-[17px] text-[#0A0B0D] mb-12 font-medium opacity-60">
                        Start your portfolio today and discover crypto
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-md mx-auto md:mx-0">
                        <input
                            type="email"
                            placeholder="satoshi@nakamoto.com"
                            className="w-full sm:flex-grow px-5 py-[18px] border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-1 focus:ring-[#0052FF] transition-all placeholder:text-gray-400"
                        />
                        <Link to="/signup" className="w-full sm:w-50 bg-[#0052FF] text-white px-8 py-[16px] rounded-full text-center text-lg font-bold  hover:bg-blue-700 transition-all cursor-pointer">
                            Sign up
                        </Link>
                    </div>
                </div>
                <div className="flex-1 w-full flex items-center justify-center relative">
                    <div className="w-full max-w-2xl aspect-square relative flex items-center justify-center">
                        <div className="absolute w-full h-full rounded-full border border-gray-50 opacity-50 animate-pulse"></div>
                        <div className="absolute w-[80%] h-[80%] rounded-full border border-gray-100"></div>
                        <div className="absolute w-[60%] h-[60%] rounded-full border border-gray-200"></div>
                        <img
                            src="/assets/clone-images/image.png"
                            alt="Crypto Assets"
                            className="w-full h-auto z-10 scale-110 md:scale-110 drop-shadow-2xl"
                        />
                    </div>
                </div>

            </section>
            <div className="mb-24 text-center">
                <p className="text-[#5B616E] text-[14px] leading-relaxed max-w-5xl mx-auto">
                    DEX trading is offered by Coinbase Bermuda Technologies Ltd. <br /><br />
                    Products and features may not be available in all regions. Information is for or informational purposes only, and is not (i) an offer, or solicitation of an offer, to invest in, or to buy or sell, any interests or shares, or to participate in any investment or trading strategy or (ii) intended to provide accounting, legal, or tax advice, or investment recommendations. Trading cryptocurrency comes with risk.
                </p>
            </div>
        </>
    );
};

export default TakeControl;
