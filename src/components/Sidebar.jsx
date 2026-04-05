import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Bell, Settings, Shield } from 'lucide-react';

export default function Sidebar() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: 'System Admin' };
  const initial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S';
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Activity Logs', path: '/activity', icon: Activity },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[var(--bg-surface)] border-r border-[var(--border-color)] hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-[var(--border-color)]">
        <Shield className="w-6 h-6 text-brand-600 dark:text-brand-500 mr-2" />
        <span className="text-xl font-bold tracking-tight">HijackDetector</span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold mr-3 uppercase">
              {initial}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium truncate w-24" title={currentUser.name}>{currentUser.name}</div>
              <div className="text-xs text-[var(--text-secondary)] truncate">Protected</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
