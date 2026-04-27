import { Globe } from 'lucide-react';

const Footer = () => {
    const column1 = [
        {
            title: 'Company',
            links: ['About', 'Careers', 'Affiliates', 'Blog', 'Press', 'Security', 'Investors', 'Vendors', 'Legal & privacy', 'Cookie policy', 'Cookie preferences'],
        },
        {
            title: 'Learn',
            links: ['Coinbase Bytes newsletter', 'Crypto basics', 'Tips & tutorials', 'Crypto glossary', 'Market updates', 'What is Bitcoin?', 'What is crypto?', 'What is a blockchain?', 'How to set up a crypto wallet?', 'How to send crypto?', 'Taxes'],
        }
    ];

    const column2 = [
        {
            title: 'Individuals',
            links: ['Buy & sell', 'Earn free crypto', 'Base App', 'Coinbase One', 'Debit Card'],
        },
        {
            title: 'Businesses',
            links: ['Asset Listings', 'Coinbase Business', 'Payments', 'Commerce'],
        },
        {
            title: 'Institutional',
            links: ['International Exchange', 'Derivatives Exchange', 'Verified Pools'],
        }
    ];

    const column3 = [
        {
            title: 'Developers',
            links: ['Developer Platform', 'Base', 'Server Wallets', 'Embedded Wallets', 'Base Accounts (Smart Wallets)', 'Onramp & Offramp', 'x402', 'Trade API', 'Paymaster', 'OnchainKit'],
        },
        {
            title: 'Products',
            links: ['Faucet', 'Exchange API', 'International Exchange API', 'Prime API', 'Derivatives API'],
        }
    ];

    const column4 = [
        {
            title: 'Support',
            links: ['Help center', 'Contact us', 'Create account', 'ID verification', 'Account information', 'Payment methods', 'Account access', 'Supported crypto', 'Status'],
        },
        {
            title: 'Asset prices',
            links: ['NVIDIA price', 'Apple price', 'Microsoft price', 'Amazon price'],
        },
    ];

    const allColumns = [column1, column2, column3, column4];

    return (
        <footer className="bg-gray-100 px-6 py-20 md:px-10 border-t border-gray-50 font-inter">
            <div className="max-w-[1440px] mx-auto">


                <div className="flex flex-col  md:flex-row gap-16 md:gap-24 mb-24">
                    <div className="w-10 h-10 bg-[#0052FF] rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        C
                    </div>
                    <div className="flex-grow grid  grid-cols-2 md:grid-cols-4 gap-12">
                        {allColumns.map((column, colIdx) => (
                            <div key={colIdx} className="space-y-12">
                                {column.map((section) => (
                                    <div key={section.title}>
                                        <h4 className="font-bold text-[#0A0B0D] mb-4 text-[14px]">{section.title}</h4>
                                        <ul className="space-y-4">
                                            {section.links.map((link) => (
                                                <li key={link}>
                                                    <a href="#" className="text-[#5B616E] text-[14px] font-medium hover:text-[#0052FF] transition-colors">
                                                        {link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-50 gap-8">
                    <div className="flex items-center gap-10 text-gray-600  text-[17px]">
                        <span className="text-bold">© 2026 Coinbase</span>
                        <a href="#" className="hover:text-[#0052FF]">Privacy</a>
                        <a href="#" className="hover:text-[#0052FF]">Terms & Conditions</a>
                    </div>
                    <div className="flex items-center gap-10">

                        <div className="flex items-center gap-2 text-gray-600 text-[17px] cursor-pointer">
                            <Globe size={16} strokeWidth={2.5} /> Global • English
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
