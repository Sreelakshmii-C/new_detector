import { useState } from 'react';
import { Search, Filter, Monitor, Smartphone, Globe, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ActivityLogs() {
  const { logs } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-[var(--text-secondary)] mt-1">A detailed history of all login attempts and active sessions.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--bg-surface)]">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[var(--text-secondary)]" />
            </div>
            <input
              type="text"
              placeholder="Search by location, device, or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto bg-[var(--bg-surface)]">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="text-xs uppercase bg-[var(--bg-primary)] text-[var(--text-secondary)]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Device & Browser</th>
                <th scope="col" className="px-6 py-4 font-semibold">Location & IP</th>
                <th scope="col" className="px-6 py-4 font-semibold">Time</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className={`border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors ${log.isSuspicious ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 text-[var(--text-secondary)]">
                        {log.os.includes('iOS') || log.os.includes('Android') ? (
                          <Smartphone className="w-5 h-5" />
                        ) : (
                          <Monitor className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)]">{log.deviceType}</div>
                        <div className="text-xs">{log.browser} on {log.os}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center text-[var(--text-primary)]">
                        <Globe className="w-3 h-3 mr-1.5 opacity-70" />
                        {log.location}
                      </div>
                      <div className="text-xs mt-1 font-mono">{log.ipAddress}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                      <div className="text-xs mt-1">{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {log.status === 'System Secured' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-3xl text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border border-green-400 dark:border-green-800/80 max-w-[180px] break-words leading-tight shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0 text-green-500" />
                        🟢 Secured
                      </span>
                    ) : log.status && (log.status === 'Suspicious Login Detected' || log.status.includes('simulated')) ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-3xl text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50 max-w-[180px] break-words leading-tight">
                        <ShieldAlert className="w-3 h-3 mr-1.5 shrink-0" />
                        {log.status}
                      </span>
                    ) : log.isSuspicious ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                        <ShieldAlert className="w-3 h-3 mr-1.5" />
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50">
                        <CheckCircle2 className="w-3 h-3 mr-1.5" />
                        Success
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-[var(--text-secondary)]">
                    No activity logs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
