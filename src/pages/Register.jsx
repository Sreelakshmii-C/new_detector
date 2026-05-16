import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://new-detector-1.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4 text-[var(--text-primary)]">
      <div className="max-w-md w-full bg-[var(--bg-surface)] p-8 rounded-xl shadow-lg border border-[var(--border-color)]">
        <h2 className="text-3xl font-bold mb-8 text-center text-[var(--text-primary)]">Create Account</h2>
        {error && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-[var(--text-primary)] transition-all"
              placeholder="Your Name"
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 hover:text-brand-500 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
