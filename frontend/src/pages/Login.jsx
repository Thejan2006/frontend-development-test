import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../components/Loading.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (authLoading) {
    return <Loading message="Loading session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={location.state?.from || '/reviews'} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      navigate(location.state?.from || '/reviews');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-180px)] max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
      <section className="space-y-6">
        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
          Secure access for returning reviewers
        </div>
        <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Welcome back to <span className="text-gradient">ReviewSphere</span>
        </h1>
        <p className="max-w-xl text-lg leading-8 text-slate-300">
          Sign in to publish your review, edit your feedback, and manage your profile from one
          polished dashboard.
        </p>
        <div className="glass-panel rounded-3xl p-6 text-sm text-slate-300">
          Login with your email and password to access protected review tools.
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-8">
        <h2 className="font-display text-2xl font-bold text-white">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Register now
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
