import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart2, ArrowLeftRight, Send, Gift,
  Compass, TrendingUp, ChevronDown, LogOut, Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ icon, label, to, active }) => {
  const base = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all w-full';
  const cls = active
    ? `${base} bg-[#0052FF]/10 text-[#0052FF]`
    : `${base} text-[#888A8F] hover:bg-[#1A1B1F] hover:text-white`;
  return (
    <Link to={to} className={cls}>
      <span className={active ? 'text-[#0052FF]' : 'text-[#5B616E]'}>{icon}</span>
      {label}
    </Link>
  );
};

const DashboardSidebar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CB';

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Home' },
    { path: '/assets', icon: <BarChart2 size={18} />, label: 'Assets' },
    { path: '/trade', icon: <ArrowLeftRight size={18} />, label: 'Trade' },
    { path: '/pay', icon: <Send size={18} />, label: 'Pay' },
    { path: '/earn', icon: <Gift size={18} />, label: 'Earn' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-[240px] shrink-0 flex flex-col h-full bg-[#0A0B0D] border-r border-[#1A1B1F] px-3 py-4">
      <Link to="/" className="flex items-center gap-2 px-3 mb-6">
        <img
          src="/assets/clone-images/coinbaseLogoNavigation-4.svg"
          alt="Coinbase"
          className="h-6 brightness-0 invert"
        />
      </Link>

      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            to={item.path}
            active={location.pathname === item.path}
          />
        ))}

        <div className="my-3 border-t border-[#1A1B1F]" />

        <NavItem
          icon={<Compass size={18} />}
          label="Explore"
          to="/explore"
          active={location.pathname === '/explore'}
        />
        <NavItem
          icon={<TrendingUp size={18} />}
          label="Advanced Trade"
          to="/advanced-trade"
          active={location.pathname === '/advanced-trade'}
        />
      </nav>

      <div className="mt-4 border-t border-[#1A1B1F] pt-3">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1A1B1F] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-white text-[13px] font-semibold truncate">{user?.name || 'Account'}</p>
            <p className="text-[#5B616E] text-[11px] truncate">{user?.email || ''}</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-[#5B616E] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {userMenuOpen && (
          <div className="mt-1 bg-[#1A1B1F] border border-[#2D2E33] rounded-xl overflow-hidden">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 text-[#888A8F] hover:text-white hover:bg-[#2D2E33] transition-colors text-[14px]"
            >
              <Settings size={16} />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#888A8F] hover:text-[#FF4019] hover:bg-[#2D2E33] transition-colors text-[14px]"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
