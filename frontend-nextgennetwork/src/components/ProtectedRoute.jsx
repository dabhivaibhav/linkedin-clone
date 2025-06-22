import { Navigate } from 'react-router-dom';
import { accountService } from '../services';

function ProtectedRoute({ children }) {
  return accountService.isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;