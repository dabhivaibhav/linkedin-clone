import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration';

// Define routes
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
    path: '/home',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    // Catch-all route - redirect to login for any undefined routes
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;