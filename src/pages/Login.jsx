import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logs, addActivityLog, addAlert, showModal } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://new-detector-1.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid email or password');
        toast.error('❌ Invalid credentials');
        return;
      }

      toast.success('Login successful!');
      localStorage.setItem('currentUser', JSON.stringify(data));

      // Simulation Logic
      const newIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      const deviceString = navigator.userAgent;

      let osStr = 'Unknown OS';
      if (/Mac OS X/i.test(deviceString)) osStr = 'macOS';
      else if (/Windows/i.test(deviceString)) osStr = 'Windows';
      else if (/Android/i.test(deviceString)) osStr = 'Android';
      else if (/iPhone|iPad/i.test(deviceString)) osStr = 'iOS';

      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        deviceType: `Simulated System`,
        os: osStr,
        browser: 'Simulated Browser',
        ipAddress: newIp,
        location: 'Simulation Device',
        isSuspicious: false,
        status: 'success',
        email: email
      };

      // Suspicious check 1: Multiple logins in 5 minutes
      const recentLogins = logs.filter(l => (new Date() - new Date(l.timestamp)) < 5 * 60 * 1000);
      if (recentLogins.length >= 2) {
        newLog.isSuspicious = true;
        toast.warn('⚠️ Suspicious activity detected');
        addAlert({
          id: `alt-${Date.now()}`,
          title: 'Suspicious activity detected',
          message: 'Multiple logins detected in a very short timespan.',
          timestamp: new Date().toISOString(),
          severity: 'critical',
          resolved: false
        });
      }

      // Suspicious check 2: New IP detected
      const userLogs = logs.filter(l => l.email === email);
      if (userLogs.length > 0 && userLogs[0].ipAddress !== newIp) {
        toast.warn('⚠️ New device login detected');
        showModal('⚠️ Security Alert', `A login was successful from a previously unseen IP: ${newIp}.`);
        addAlert({
          id: `alt-${Date.now() + 1}`,
          title: 'New device login detected',
          message: `A login was successful from a previously unseen IP: ${newIp}.`,
          timestamp: new Date().toISOString(),
          severity: 'high',
          resolved: false
        });
      }

      addActivityLog(newLog);

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4 text-[var(--text-primary)]">
      <div className="max-w-md w-full bg-[var(--bg-surface)] p-8 rounded-xl shadow-lg border border-[var(--border-color)]">
        <h2 className="text-3xl font-bold mb-8 text-center text-[var(--text-primary)]">Welcome Back</h2>
        {error && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-[var(--text-primary)] transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-[var(--text-primary)] transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors shadow-sm mt-2"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-600 hover:text-brand-500 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
