import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const AccountSelection = () => {
    const options = [
        {
            id: 'personal',
            title: 'Personal',
            description: 'Trade crypto as an individual.',
            icon: <img src="/assets/clone-images/personal.svg" alt="Personal" className="w-6 h-6" />,
            path: '/signup/form'
        },
        {
            id: 'business',
            title: 'Business',
            description: 'Manage teams and portfolios, accept crypto payments, access APIs, and more',
            icon: <img src="/assets/clone-images/business.svg" alt="Business" className="w-6 h-6" />,
            path: '/signup/form'
        },
        {
            id: 'developer',
            title: 'Developer',
            description: 'Build onchain using developer tooling.',
            icon: <img src="/assets/clone-images/developer.svg" alt="Developer" className="w-6 h-6" />,
            path: '/signup/form'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0A0B0D] flex flex-col items-center justify-center font-inter p-6">
            <div className="w-full max-w-[560px] flex flex-col">
                <Link to="/" className="mb-12 self-start">
                    <img
                        src="/assets/clone-images/coinbaseLogoNavigation-4.svg"
                        alt="Coinbase"
                        className="h-8 md:h-10 invert brightness-0"
                    />
                </Link>

                <h1 className="text-white text-[28px] md:text-[36px] font-semibold mb-10 tracking-tight">
                    What kind of account are you creating?
                </h1>

                <div className="space-y-4">
                    {options.map((option) => (
                        <Link
                            key={option.id}
                            to={option.path}
                            className="flex items-center gap-6 p-6 bg-[#1A1B1F] border border-[#2D2E33] rounded-2xl hover:bg-[#2D2E33] transition-all group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#1A1B1F] border border-[#2D2E33] flex items-center justify-center shrink-0 group-hover:border-[#5B616E] transition-colors">
                                {option.icon}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-white text-[18px] font-semibold mb-1">
                                    {option.title}
                                </h3>
                                <p className="text-[#888A8F] text-[15px] leading-relaxed">
                                    {option.description}
                                </p>
                            </div>
                            <ChevronRight className="text-[#5B616E] group-hover:text-white transition-colors" size={20} />
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/login" className="text-[#0052FF] font-semibold text-[15px] hover:underline">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccountSelection;
