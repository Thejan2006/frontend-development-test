import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import Loading from './Loading.jsx';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, authLoading } = useAuth();

  if (authLoading) {
    return <Loading message="Checking admin access..." />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
