import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 md:px-10 md:py-24 gap-12 bg-white overflow-hidden font-inter">
            <div className="flex-1 order-2 md:order-1 relative">
                <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-blue-100/30">
                    <img
                        src="/assets/clone-images/hero__4_.avif"
                        alt="Coinbase App"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
            <div className="flex-1 max-w-2xl text-left order-1 md:order-2">
                <h1 className="text-[48px] md:text-[80px] text-[#0A0B0D] tracking-tighter leading-[0.95] mb-6">
                    The future of <br /> finance is here.
                </h1>
                <p className="text-[18px] md:text-[17px] text-[#0A0B0D] mb-10 font-medium max-w-md opacity-70 leading-relaxed">
                    Trade crypto and more on a platform you can trust.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-md">
                    <input
                        type="email"
                        placeholder="satoshi@nakamoto.com"
                        className="w-full sm:flex-grow px-5 py-[16px] border border-gray-600 rounded-xl text-lg focus:outline-none focus:ring-1 focus:ring-[#0052FF] transition-all placeholder:text-gray-400"
                    />
                    <Link to="/signup" className="w-full sm:w-50 bg-[#0052FF] text-white px-8 py-[16px] rounded-full text-center text-lg font-bold hover:bg-blue-700 transition-all cursor-pointer">
                        Sign up
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
