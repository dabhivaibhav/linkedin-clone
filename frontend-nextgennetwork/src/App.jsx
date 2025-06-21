import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Account/Login/Login';
import Register from './pages/Account/Register/Register';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Network from './pages/Network/Network';
import Jobs from './pages/Jobs/Jobs';
import Messaging from './pages/Messaging/Messaging';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Layout />,
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