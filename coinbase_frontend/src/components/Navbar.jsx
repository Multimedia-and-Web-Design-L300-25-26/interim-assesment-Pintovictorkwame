import { useState, useEffect } from 'react';
import { Search, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationDropdown from './NavigationDropdown';
import { menus } from '../data/navigationMenu';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const toggleMobileAccordion = (menuName) => {
        setExpandedMobileMenu(prev => prev === menuName ? null : menuName);
    };

    return (
        <div className="sticky top-0 z-[60] bg-white border-b border-gray-100" onMouseLeave={() => !isMobileMenuOpen && setActiveMenu(null)}>
            <nav className="flex items-center justify-between px-6 py-4 lg:px-10 bg-white font-inter relative z-50">
                <div className="flex items-center gap-8">
                    <Link to="/" onMouseEnter={() => setActiveMenu(null)}>
                        <img
                            src="/assets/clone-images/coinbaseLogoNavigation-4.svg"
                            alt="Coinbase"
                            className="h-8 md:h-10 cursor-pointer"
                        />
                    </Link>
                    <div className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-[#0A0B0D]">
                        <Link to="/explore" className="hover:text-[#1652F0] transition-colors" onMouseEnter={() => setActiveMenu(null)}>Cryptocurrencies</Link>
                        <a href="#" className="hover:text-[#1652F0] transition-colors py-4" onMouseEnter={() => setActiveMenu('Individuals')}>Individuals</a>
                        <a href="#" className="hover:text-[#1652F0] transition-colors py-4" onMouseEnter={() => setActiveMenu('Businesses')}>Businesses</a>
                        <a href="#" className="hover:text-[#1652F0] transition-colors py-4" onMouseEnter={() => setActiveMenu('Institutions')}>Institutions</a>
                        <a href="#" className="hover:text-[#1652F0] transition-colors py-4" onMouseEnter={() => setActiveMenu('Developers')}>Developers</a>
                        <a href="#" className="hover:text-[#1652F0] transition-colors py-4" onMouseEnter={() => setActiveMenu('Company')}>Company</a>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-4" onMouseEnter={() => setActiveMenu(null)}>
                    <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300">
                        <Search size={16} strokeWidth={2.5} />
                    </div>
                    <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300">
                        <Globe size={16} strokeWidth={2.5} />
                    </div>
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="bg-gray-100 text-black px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-gray-300 transition-all shadow-sm cursor-pointer inline-flex items-center justify-center"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className="w-9 h-9 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[12px] font-bold hover:bg-[#1652F0] transition-colors"
                            >
                                {user.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'CB'}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-gray-100 text-black px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-gray-300 transition-all shadow-sm cursor-pointer inline-flex items-center justify-center">
                                Sign in
                            </Link>
                            <Link to="/signup" className="bg-[#0052FF] text-white px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-blue-700 transition-all shadow-sm cursor-pointer inline-flex items-center justify-center">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex lg:hidden items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">
                        <Search size={20} strokeWidth={2.5} className="text-[#0A0B0D]" />
                    </div>
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="bg-[#0052FF] text-white px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/signup" className="bg-[#0052FF] text-white px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
                            Sign up
                        </Link>
                    )}
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 text-[#0A0B0D]">
                        <Menu size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </nav>

            <NavigationDropdown activeMenu={activeMenu} />

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[70] bg-white flex flex-col lg:hidden overflow-y-auto font-inter">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <img src="/assets/clone-images/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="h-8" />
                        </Link>
                        <div className="flex items-center gap-4">
                            <Search size={22} strokeWidth={2.5} className="text-[#0A0B0D] font-bold cursor-pointer" />
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-[#0A0B0D] cursor-pointer">
                                <X size={28} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 px-6 py-4 flex flex-col gap-2">
                        <Link to="/explore" className="text-[22px] font-semibold text-[#0A0B0D] py-4" onClick={() => setIsMobileMenuOpen(false)}>Cryptocurrencies</Link>

                        {Object.keys(menus).map((menuName) => (
                            <div key={menuName} className="border-b border-gray-100 last:border-none">
                                <button
                                    className="w-full flex items-center justify-between text-[22px] font-semibold text-[#0A0B0D] py-4 cursor-pointer"
                                    onClick={() => toggleMobileAccordion(menuName)}
                                >
                                    {menuName}
                                    <ChevronDown size={24} className={`transition-transform duration-300 ${expandedMobileMenu === menuName ? 'rotate-180 text-[#0052FF]' : 'text-gray-400'}`} />
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ${expandedMobileMenu === menuName ? 'max-h-[1500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                    <div className="flex flex-col gap-5 pl-4 pt-2">
                                        {menus[menuName].items && menus[menuName].items.map((item, idx) => (
                                            <a key={idx} href={item.href || "#"} className="block group" onClick={() => setIsMobileMenuOpen(false)}>
                                                <div className="text-[17px] font-semibold text-[#0A0B0D] group-hover:text-[#0052FF] transition-colors">{item.title}</div>
                                                <div className="text-[15px] text-[#5B616E] mt-1">{item.description}</div>
                                            </a>
                                        ))}
                                        {menus[menuName].sections && menus[menuName].sections.map((section, sIdx) => (
                                            <div key={sIdx} className="mb-4 last:mb-0">
                                                <div className="text-[13px] font-bold text-[#5B616E] tracking-[0.1em] uppercase mb-4">{section.title}</div>
                                                <div className="flex flex-col gap-5">
                                                    {section.items.map((item, idx) => (
                                                        <a key={idx} href={item.href || "#"} className="block group" onClick={() => setIsMobileMenuOpen(false)}>
                                                            <div className="text-[17px] font-semibold text-[#0A0B0D] group-hover:text-[#0052FF] transition-colors">{item.title}</div>
                                                            <div className="text-[15px] text-[#5B616E] mt-1">{item.description}</div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-8 border-t border-gray-100 flex flex-col gap-4 bg-gray-50 mt-auto">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="w-full bg-[#0052FF] text-white py-[18px] rounded-full text-[16px] font-bold text-center hover:bg-blue-700 transition-colors shadow-sm cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                                    Go to Dashboard
                                </Link>
                                <Link to="/profile" className="w-full bg-white text-black border border-gray-300 py-[18px] rounded-full text-[16px] font-bold text-center hover:bg-gray-50 transition-colors shadow-sm cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                                    My Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="w-full bg-white text-black border border-gray-300 py-[18px] rounded-full text-[16px] font-bold text-center hover:bg-gray-50 transition-colors shadow-sm cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                                    Sign in
                                </Link>
                                <Link to="/signup" className="w-full bg-[#0052FF] text-white py-[18px] rounded-full text-[16px] font-bold text-center hover:bg-blue-700 transition-colors shadow-sm cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
