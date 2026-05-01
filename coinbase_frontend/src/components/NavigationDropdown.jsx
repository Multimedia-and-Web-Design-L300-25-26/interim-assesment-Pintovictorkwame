import { Link } from 'react-router-dom';
import { menus } from '../data/navigationMenu';

const NavigationDropdown = ({ activeMenu }) => {
    if (!activeMenu) return null;

    const menuData = menus[activeMenu];
    if (!menuData) return null;

    return (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl z-40 transition-all duration-300 ease-in-out font-inter flex justify-center">
            <div className="max-w-[1440px] w-full px-6 py-8 flex gap-12">
                <div className="flex-grow">
                    {menuData.items && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {menuData.items.map((item) => (
                                <a key={item.title} href={item.href || "#"} className="block group cursor-pointer hover:bg-gray-50 p-2 rounded-lg -ml-2 transition-colors">
                                    <div className="font-semibold text-[#0A0B0D] text-[15px] group-hover:text-[#1652F0] transition-colors">
                                        {item.title}
                                    </div>
                                    <div className="text-[#5B616E] text-[13px] mt-1 leading-snug">
                                        {item.description}
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {menuData.sections && (
                        <div className="flex flex-row gap-16">
                            {menuData.sections.map((section) => (
                                <div key={section.title} className="flex-1">
                                    <h3 className="text-[#5B616E] text-[13px] font-bold uppercase tracking-widest mb-4">
                                        {section.title}
                                    </h3>
                                    <div className="flex flex-col gap-5">
                                        {section.items.map((item) => (
                                            <a key={item.title} href={item.href || "#"} className="block group cursor-pointer hover:bg-gray-50 p-2 rounded-lg -ml-2 transition-colors">
                                                <div className="font-semibold text-[#0A0B0D] text-[15px] group-hover:text-[#1652F0] transition-colors flex items-center gap-2">
                                                    {item.title}
                                                </div>
                                                <div className="text-[#5B616E] text-[13px] mt-1 leading-snug">
                                                    {item.description}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {menuData.feature_card && (
                    <div className="w-[320px] bg-[#F4F6F8] rounded-[16px] shrink-0 flex flex-col overflow-hidden">
                        {menuData.feature_card.image && (
                            <img
                                src={`/assets/clone-images/${menuData.feature_card.image}`}
                                alt={menuData.feature_card.title}
                                className="w-full h-[180px] object-cover"
                            />
                        )}
                        <div className="p-8 flex flex-col justify-between flex-grow">
                            <div>
                                <h4 className="text-[20px] font-bold text-[#0A0B0D] tracking-tight leading-tight mb-3">
                                    {menuData.feature_card.title}
                                </h4>
                                <p className="text-[#5B616E] text-[15px] leading-relaxed">
                                    {menuData.feature_card.description}
                                </p>
                            </div>

                            <a href={menuData.feature_card.path || "#"} className="mt-8 text-[#1652F0] font-bold text-[15px] flex items-center gap-2 hover:gap-3 transition-all group">
                                {menuData.feature_card.link} <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavigationDropdown;
