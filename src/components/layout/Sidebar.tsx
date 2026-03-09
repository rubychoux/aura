import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: '◎', label: 'Ingredient Scanner' },
  { to: '/dashboard', icon: '✦', label: 'Dashboard' },
  { to: '/protocol', icon: '◈', label: 'My Protocol' },
  { to: '/profile', icon: '○', label: 'Profile' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-cream-200 flex flex-col z-10">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-cream-100">
        <h1 className="font-display text-2xl font-light tracking-wide text-warm-900">
          aura
        </h1>
        <p className="text-xs text-warm-400 mt-0.5 tracking-widest uppercase">
          ingredient intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-cream-100 text-warm-900 font-medium'
                  : 'text-warm-500 hover:text-warm-800 hover:bg-cream-50'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-cream-100">
        <p className="text-xs text-warm-300 tracking-wide">AURA Beta v0.2</p>
        <p className="text-xs text-warm-300">For your skin, by your skin.</p>
      </div>
    </aside>
  );
}