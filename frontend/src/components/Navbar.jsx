import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaBars, FaShieldHalved, FaStar, FaUser, FaXmark } from 'react-icons/fa6';

import { useAuth } from '../context/AuthContext.jsx';

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Reviews', to: '/reviews' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20">
            <FaStar />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white">ReviewSphere</p>
            <p className="text-xs text-slate-400">Modern review engine</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <NavLink to="/profile" className={linkClass}>
              <span className="inline-flex items-center gap-2">
                <FaUser />
                Profile
              </span>
            </NavLink>
          ) : null}
          {isAdmin ? (
            <NavLink to="/admin" className={linkClass}>
              <span className="inline-flex items-center gap-2">
                <FaShieldHalved />
                Admin
              </span>
            </NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 lg:flex">
                <img
                  src={
                    user?.profileImage ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=0f172a&textColor=ffffff`
                  }
                  alt={user?.name || 'User'}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-800/70 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" onClick={() => setOpen(false)} className={linkClass}>
                  Profile
                </NavLink>
                {isAdmin ? (
                  <NavLink to="/admin" onClick={() => setOpen(false)} className={linkClass}>
                    Admin Dashboard
                  </NavLink>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-slate-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
