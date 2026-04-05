import { Moon, Sun, Menu, Bell, LogOut, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { alerts } = useData();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasUnreadAlerts = alerts.some(alert => !alert.resolved);

  return (
    <header className="h-16 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center">
        <button className="p-2 mr-2 md:hidden text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold tracking-tight hidden sm:block">Protection Dashboard</h2>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] rounded-lg relative"
          >
            <Bell className="w-5 h-5" />
            {hasUnreadAlerts && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-[var(--border-color)] font-semibold text-sm">
                Recent Alerts
              </div>
              <div className="max-h-64 overflow-y-auto">
                {alerts.length > 0 ? alerts.slice(0, 5).map(alert => (
                  <div key={alert.id} className="p-3 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-primary)] text-sm transition-colors text-left">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{alert.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{alert.message}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 opacity-70">{new Date(alert.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 text-center text-sm text-[var(--text-secondary)]">No recent alerts</div>
                )}
              </div>
              <button 
                onClick={() => {
                  setShowNotifications(false);
                  navigate('/alerts');
                }}
                className="w-full p-2 text-center text-sm text-brand-600 dark:text-brand-400 font-medium hover:bg-[var(--bg-primary)] border-t border-[var(--border-color)] transition-colors"
              >
                View All Alerts
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button 
          onClick={handleLogout}
          className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors flex items-center gap-1"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
