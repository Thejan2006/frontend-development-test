import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { fetchCurrentUser, loginUser, registerUser } from '../api/authApi.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('review_token') || '');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const data = await fetchCurrentUser();
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem('review_token');
        setToken('');
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapAuth();
  }, [token]);

  const persistSession = useCallback((sessionToken, sessionUser) => {
    localStorage.setItem('review_token', sessionToken);
    setToken(sessionToken);
    setUser(sessionUser);
  }, []);

  const login = useCallback(
    async (payload) => {
      const data = await loginUser(payload);
      persistSession(data.token, data.user);
      toast.success('Welcome back!');
      return data.user;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload) => {
      const data = await registerUser(payload);
      persistSession(data.token, data.user);
      toast.success('Account created successfully');
      return data.user;
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('review_token');
    setToken('');
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) {
      return null;
    }

    const data = await fetchCurrentUser();
    setUser(data.user);
    return data.user;
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      authLoading,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      refreshUser,
      setUser
    }),
    [user, token, authLoading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
