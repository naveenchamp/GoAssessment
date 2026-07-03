import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth.js';

const ProtectedRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
