import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '⚡' },
  { to: '/protocol', label: 'My Protocol', icon: '📋' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col z-10">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-black">A</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-wide">AURA</p>
            <p className="text-zinc-500 text-xs">Optimization Lab</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                isActive
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
              )
            }
          >
            <span className="text-base">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-800">
        <p className="text-zinc-600 text-xs">AURA Beta v0.1</p>
        <p className="text-zinc-700 text-xs mt-0.5">AI Optimization Engine</p>
      </div>
    </aside>
  );
}