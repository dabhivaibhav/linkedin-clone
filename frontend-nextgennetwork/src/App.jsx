import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Account/Login/Login';
import Register from './pages/Account/Register/Register';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Network from './pages/Network/Network';
import Jobs from './pages/Jobs/Jobs';
import Messaging from './pages/Messaging/Messaging';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';

import { accountService } from './services';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={accountService.isAuthenticated() ? "/home" : "/login"} replace />
  },
  {
    path: '/login',
    element: accountService.isAuthenticated() ? <Navigate to="/home" replace /> : <Login />,
  },
  {
    path: '/register',
    element: accountService.isAuthenticated() ? <Navigate to="/home" replace /> : <Register />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'network',
        element: <Network />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'messaging',
        element: <Messaging />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;