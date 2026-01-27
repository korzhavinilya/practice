import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('../pages/Login'));

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <Suspense fallback={<>...</>}>
            <Login />
          </Suspense>
        }
      />
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
