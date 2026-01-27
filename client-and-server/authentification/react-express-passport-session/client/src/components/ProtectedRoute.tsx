import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      const response = await fetch('http://localhost:3000/test');
      const data = await response.json();

      setIsAuthenticated(data.isAuthenticated);
      setIsLoading(false);
    }

    fetchCurrentUser();
  }, []);

  return isLoading ? (
    <>Loading...</>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
