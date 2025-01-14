import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderRoute = () => {
    switch (currentPath) {
      case '/dashboard':
        return (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        );
      case '/login':
      default:
        return <Login />;
    }
  };

  return (
    <AuthProvider>
      {renderRoute()}
    </AuthProvider>
  );
}

export default App;