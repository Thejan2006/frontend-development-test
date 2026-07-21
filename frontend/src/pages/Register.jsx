import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../components/Loading.jsx';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated, authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return <Loading message="Loading session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/reviews" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await register(form);
      navigate('/reviews');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-180px)] max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
      <section className="space-y-6">
        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
          Join the trusted feedback network
        </div>
        <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Create your <span className="text-gradient">review account</span>
        </h1>
        <p className="max-w-xl text-lg leading-8 text-slate-300">
          Register once, post one authentic review, and update it whenever your experience changes.
        </p>
      </section>

      <section className="glass-panel rounded-3xl p-8">
        <h2 className="font-display text-2xl font-bold text-white">Register</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Your name"
            />
          </div>
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
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Profile Image URL <span className="text-slate-500">(optional)</span>
            </label>
            <input
              type="url"
              value={form.profileImage}
              onChange={(event) => setForm({ ...form, profileImage: event.target.value })}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Login here
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
