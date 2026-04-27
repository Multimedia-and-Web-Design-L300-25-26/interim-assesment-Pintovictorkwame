const CryptoBasics = () => {
    const articles = [
        {
            title: 'USDC: The digital dollar for the global crypto economy',
            image: '/assets/images/hero_bg.png',
            bgColor: 'bg-[#0A0B0D]'
        },
        {
            title: 'Can crypto really replace your bank account?',
            image: '/assets/clone-images/institutions_upsell.png',
            bgColor: 'bg-[#1652F0]'
        },
        {
            title: 'When is the best time to invest in crypto?',
            image: '/assets/clone-images/navigation-upsell.png',
            bgColor: 'bg-[#F4F6F8]'
        }
    ];

    return (
        <section className="bg-white px-6 py-16 md:px-10 md:py-24 font-inter border-t border-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                <h2 className="text-[20px] md:text-[70px] text-[#0A0B0D] tracking-tighter leading-[0.95] max-w-xl">
                    New to crypto? <br /> Learn some <br /> crypto basics
                </h2>
                <div className="max-w-md">
                    <p className="text-[8px] md:text-[17px] text-[#0A0B0D] mb-8 font-medium opacity-70 leading-relaxed">
                        Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
                    </p>
                    <button className="bg-[#0A0B0D] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all cursor-pointer">
                        Read More
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className={`aspect-[16/10] rounded-[24px] overflow-hidden mb-8 ${article.bgColor} p-8 flex items-center justify-center`}>
                            <img src={article.image} alt={article.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0A0B0D] leading-tight group-hover:text-[#0052FF] transition-colors">
                            {article.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CryptoBasics;
