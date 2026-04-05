import { 
  ShieldCheck, 
  AlertTriangle, 
  Smartphone, 
  MapPin, 
  Clock, 
  ChevronRight,
  CheckCircle,
  RefreshCw,
  TrendingDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

const chartData = [
  { name: 'Mon', logins: 4, blocked: 0 },
  { name: 'Tue', logins: 3, blocked: 1 },
  { name: 'Wed', logins: 7, blocked: 0 },
  { name: 'Thu', logins: 2, blocked: 3 },
  { name: 'Fri', logins: 5, blocked: 0 },
  { name: 'Sat', logins: 8, blocked: 2 },
  { name: 'Sun', logins: 9, blocked: 0 },
];

export default function Dashboard() {
  const { logs, devices, alerts, addActivityLog, addAlert, clearAlerts, resolveAlert, showModal } = useData();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const handleSimulateExternal = () => {
    const newIp = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    const fakeLog = {
      id: `sim-${Date.now()}`,
      timestamp: new Date().toISOString(),
      deviceType: `External Application`,
      os: 'Unknown OS',
      browser: 'Unknown Browser',
      ipAddress: newIp,
      location: 'External Server',
      isSuspicious: true,
      status: `Suspicious Login Detected`,
      email: currentUser.email || 'simulated@example.com'
    };
    
    addAlert({
      id: `alt-${Date.now()}`,
      message: `Suspicious login detected from unknown source`,
      type: 'warning',
      time: new Date().toISOString(),
      status: 'Active'
    });
    
    toast.warn(`⚠️ Suspicious login detected from unknown source`);
    showModal('⚠️ Security Alert', `Unusual login activity detected from a new device or location connecting via External IP: ${newIp}`);
    addActivityLog(fakeLog);
  };

  const suspiciousAttempts = logs.filter(l => l.isSuspicious).length;
  const accountStats = {
    totalLogins: logs.length,
    suspiciousAttempts: suspiciousAttempts,
    trustedDevicesCount: devices.length,
    riskScore: alerts.some(a => !a.resolved && a.severity === 'high') ? 'High' : (suspiciousAttempts > 0 ? 'Medium' : 'Low')
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Overview</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Welcome back, {currentUser.name} ({currentUser.email}). Monitor your account activity and security posture.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 rounded-full px-3 py-1 text-xs font-bold uppercase flex items-center">
             Demo / Simulation only
          </div>
          <button 
            onClick={handleSimulateExternal}
            className="flex items-center bg-brand-600 hover:bg-brand-700 text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Simulate Suspicious Login
          </button>
          <div className="flex items-center bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full px-4 py-1.5 text-green-700 dark:text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-sm font-medium">Protected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Cards */}
        <div className="interactive-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Total Logins (30d)</h3>
            <div className="p-2 bg-brand-50 dark:bg-brand-900/30 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{accountStats.totalLogins}</div>
          <p className="text-xs text-green-500 mt-2 flex items-center">
            <TrendingDown className="w-3 h-3 mr-1" />
            12% less than last month
          </p>
        </div>

        <div className="interactive-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Suspicious Blocked</h3>
            <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">{accountStats.suspiciousAttempts}</div>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Requires your attention</p>
        </div>

        <div className="interactive-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Trusted Devices</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Smartphone className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="text-3xl font-bold">{accountStats.trustedDevicesCount}</div>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Active in the last 7 days</p>
        </div>

        <div className="interactive-card p-5 border-l-4 border-l-yellow-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--text-secondary)]">Risk Score</h3>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{accountStats.riskScore}</div>
          <div className="w-full bg-[var(--bg-primary)] rounded-full h-1.5 mt-3">
            <div className="bg-yellow-400 h-1.5 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <div className="lg:col-span-2 interactive-card flex flex-col">
          <div className="p-5 border-b border-[var(--border-color)]">
            <h3 className="font-semibold">Login Activity Chart</h3>
          </div>
          <div className="p-5 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLogins)" />
                <Area type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBlocked)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="interactive-card flex flex-col">
          <div className="p-5 border-b border-[var(--border-color)] flex justify-between items-center">
            <h3 className="font-semibold">Recent Activity</h3>
            <Link to="/activity" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">View All</Link>
          </div>
          <div className="p-0 overflow-y-auto max-h-[340px]">
            {logs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-4 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-primary)] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${log.isSuspicious ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{log.deviceType}</p>
                      <div className="flex items-center text-xs text-[var(--text-secondary)] mt-1.5 space-x-2">
                        <MapPin className="w-3 h-3" />
                        <span>{log.location}</span>
                      </div>
                      {log.status && log.status.includes('simulated') && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">{log.status}</div>
                      )}
                      <div className="flex items-center text-xs text-[var(--text-secondary)] mt-1 space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>
                  {log.isSuspicious && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                      Blocked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Tracking Section */}
      <div className="interactive-card flex flex-col mt-6">
        <div className="p-5 border-b border-[var(--border-color)] flex justify-between items-center">
          <h3 className="font-semibold text-lg">Active Alerts</h3>
          <button 
            onClick={clearAlerts}
            className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Clear Alerts
          </button>
        </div>
        <div className="p-0 overflow-y-auto max-h-[400px]">
          {alerts.length > 0 ? alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 border-b border-[var(--border-color)] last:border-0 transition-colors ${alert.status === 'Active' ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : 'bg-green-50/30 dark:bg-green-900/10'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`mt-0.5 p-1.5 rounded-full ${alert.status === 'Active' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'}`}>
                    {alert.status === 'Active' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${alert.status === 'Active' ? 'text-yellow-800 dark:text-yellow-400' : 'text-green-800 dark:text-green-400'}`}>
                      {alert.message}
                    </p>
                    <div className="flex items-center text-xs text-[var(--text-secondary)] mt-1.5 space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(alert.time || alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {alert.status === 'Active' ? (
                  <button 
                    onClick={() => resolveAlert(alert.id)}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-black border border-yellow-300 dark:border-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 transition-colors"
                  >
                    Resolve
                  </button>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                    Resolved
                  </span>
                )}
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-[var(--text-secondary)]">
              <CheckCircle className="w-8 h-8 mx-auto text-green-500/50 mb-2" />
              <p>No alerts logged in the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
