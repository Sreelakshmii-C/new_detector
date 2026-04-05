import { useState } from 'react';
import { Shield, Bell, Smartphone, MonitorSmartphone, Key, Mail, Lock } from 'lucide-react';
import { trustedDevices } from '../utils/mockData';

export default function Settings() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage your account protection features and trusted devices.</p>
      </div>

      <div className="space-y-6">
        {/* Alerts Configuration */}
        <div className="glass-panel rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[var(--border-color)] flex items-center bg-[var(--bg-surface)]">
            <Bell className="w-5 h-5 text-brand-500 mr-3" />
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>
          <div className="p-5 space-y-5 bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Real-time Dashboard Alerts</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">Show popups when suspicious activity is detected.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={alertsEnabled}
                  onChange={() => setAlertsEnabled(!alertsEnabled)} 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
              </label>
            </div>
            
            <div className="w-full h-px bg-[var(--border-color)]"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Alerts</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">Send alerts to your registered email.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)} 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
              </label>
            </div>

            <div className="w-full h-px bg-[var(--border-color)]"></div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">SMS Alerts</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">Send critical security alerts via SMS (Standard rates apply).</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={smsAlerts}
                  onChange={() => setSmsAlerts(!smsAlerts)} 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Password Management */}
        <div className="glass-panel rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[var(--border-color)] flex items-center bg-[var(--bg-surface)]">
            <Lock className="w-5 h-5 text-brand-500 mr-3" />
            <h2 className="text-lg font-semibold">Password & Authentication</h2>
          </div>
          <div className="p-5 space-y-4 bg-[var(--bg-surface)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" htmlFor="current-pwd">Current Password</label>
                <input
                  id="current-pwd"
                  type="password"
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
              <div></div>
              <div>
                <label className="block text-sm font-medium mb-1.5" htmlFor="new-pwd">New Password</label>
                <input
                  id="new-pwd"
                  type="password"
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" htmlFor="confirm-pwd">Confirm New Password</label>
                <input
                  id="confirm-pwd"
                  type="password"
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="pt-2">
              <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors text-sm">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Trusted Devices */}
        <div className="glass-panel rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-surface)]">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-brand-500 mr-3" />
              <h2 className="text-lg font-semibold">Trusted Devices</h2>
            </div>
            <button className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline">
              Add Device
            </button>
          </div>
          <div className="bg-[var(--bg-surface)]">
            {trustedDevices.map((device) => (
              <div key={device.id} className="p-4 border-b border-[var(--border-color)] last:border-0 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center mr-4 text-[var(--text-secondary)]">
                    {device.deviceType.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <MonitorSmartphone className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)]">{device.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {device.deviceType} • Last active: {new Date(device.lastActive).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-3 py-1.5 border border-transparent hover:border-red-200 dark:hover:border-red-900/50 rounded-lg transition-colors">
                  Revoke
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
