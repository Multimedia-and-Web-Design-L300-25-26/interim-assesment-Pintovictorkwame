const FeatureItem = ({ title, description, imageUrl, reverse = false }) => {
    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between px-6 py-20 md:px-24 md:py-32 gap-16 border-t border-gray-50 bg-white`}>
            <div className="flex-1 max-w-xl text-center md:text-left">
                <h2 className="text-45px md:text-[45px] text-[#0A0B0D] mb-8 tracking-tight leading-tight">
                    {title}
                </h2>
                <p className="text-lg md:text-xl text-[#5B616E] mb-10 leading-relaxed font-medium">
                    {description}
                </p>
                <button className="text-[#1652F0] font-bold text-lg flex items-center gap-2 hover:gap-3 transition-all group mx-auto md:mx-0 cursor-pointer">
                    Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
            <div className="flex-1 flex justify-center w-full">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full max-w-lg rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
            </div>
        </div>
    );
};

const FeatureSections = () => {
    return (
        <section className="bg-white">
            <FeatureItem
                title="Zero fees, more potential"
                description="Experience the power of the world's most trusted exchange with zero fees on select trades for eligible users in the US."
                imageUrl="/assets/clone-images/zero_fees_us.png"
            />

            <FeatureItem
                title="Professional-grade trading"
                description="Get more control with Advanced Trade. Access deep liquidity, professional charts, and real-time order books all in one place."
                imageUrl="/assets/clone-images/Advanced.png"
                reverse={true}
            />

            <FeatureItem
                title="Solutions for institutions"
                description="Secure storage, high-level compliance, and a full suite of institutional solutions for businesses and asset managers."
                imageUrl="/assets/clone-images/institutions_upsell.png"
            />

            <FeatureItem
                title="Bridge to the onchain world"
                description="Interact with the next generation of the internet. Move money onchain with our simple, secure protocol."
                imageUrl="/assets/clone-images/onchain_payment_protocol.png"
                reverse={true}
            />
        </section>
    );
};

export default FeatureSections;
