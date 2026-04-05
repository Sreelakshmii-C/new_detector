import { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XOctagon, 
  AlertTriangle 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Alerts() {
  const { alerts, resolveAlert } = useData();

  const handleResolve = (id, resolution) => {
    // In a real app we might attach resolution text, for now just resolving
    resolveAlert(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Security Alerts</h1>
        <p className="text-[var(--text-secondary)] mt-1">Review and take action on recent security events.</p>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="glass-panel rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-medium">All clear!</h3>
            <p className="text-[var(--text-secondary)] mt-1">There are no active security alerts for your account.</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`interactive-card overflow-hidden transition-all duration-300 ${alert.resolved ? 'opacity-60 grayscale-[50%]' : ''}`}
            >
              <div className="p-5 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className={`p-3 rounded-xl shrink-0 ${
                  alert.severity === 'critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                  alert.severity === 'high' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {alert.severity === 'critical' ? <XOctagon className="w-6 h-6" /> : 
                   alert.severity === 'high' ? <ShieldAlert className="w-6 h-6" /> : 
                   <AlertTriangle className="w-6 h-6" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold">{alert.title}</h3>
                    <span className="text-xs text-[var(--text-secondary)] flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{alert.message}</p>
                  
                  {alert.resolved ? (
                    <div className="inline-flex items-center px-3 py-1 bg-[var(--bg-primary)] rounded-md text-sm font-medium border border-[var(--border-color)]">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Resolved: {alert.resolution === 'me' ? 'Confirmed as safe' : 'Account secured'}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-4 mt-md-0">
                      <button 
                        onClick={() => handleResolve(alert.id, 'not-me')}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
                      >
                        <XOctagon className="w-4 h-4 mr-2" />
                        No, Secure Account
                      </button>
                      <button 
                        onClick={() => handleResolve(alert.id, 'me')}
                        className="inline-flex items-center justify-center px-4 py-2 border border-[var(--border-color)] rounded-lg shadow-sm text-sm font-medium bg-[var(--bg-surface)] hover:bg-[var(--bg-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-gray-900"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Yes, this was me
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
