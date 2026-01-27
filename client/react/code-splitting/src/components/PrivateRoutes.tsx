import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NavBar } from './NavBar';

const Profile = lazy(() => import('../pages/Profile'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const FAQs = lazy(() => import('../pages/FAQs'));

export const PrivateRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="profile"
          element={
            <Suspense fallback={<>...</>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<>...</>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<>...</>}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="faqs"
          element={
            <Suspense fallback={<>...</>}>
              <FAQs />
            </Suspense>
          }
        />
        <Route path="/*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </>
  );
};
