import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  Navigate,
  useLocation
} from 'react-router-dom';
import { AboutPage, HomePage, LoginPage, SignUpPage } from './pages';
import useAuthStore from './store/useAuthStore';
import { useEffect, useState } from 'react';
import UserService from './services/user.service';
import { LoadingStatus } from './types';
import reactLogo from './assets/react.svg';
import './App.css';

export default function App() {
  return (
    <AppLoader>
      <AppRouter />
    </AppLoader>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/public">Public Page</Link>
    //         </li>
    //         <li>
    //           <Link to="/protected">Protected Page</Link>
    //         </li>
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //       </ul>
    //     </nav>
    // <Routes>
    //   <Route path="" element={<HomePage />} />
    //   <Route path="login" element={<LoginPage />} />
    //   <Route path="public" element={<PublicPage />} />
    //   <Route path="protected" element={<ProtectedRoute />}>
    //     <Route path="page" element={<ProtectedPage />} />
    //   </Route>
    // </Routes>
    //   </div>
    // </Router>
  );
}

interface AppLoaderProps {
  children: React.ReactNode;
}

function AppLoader({ children }: AppLoaderProps) {
  const { setAuthUser } = useAuthStore();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');
  const loading = loadingStatus === 'loading';
  const error = loadingStatus === 'error';

  useEffect(() => {
    if (loadingStatus !== 'loading') return;

    async function loadAppData() {
      try {
        const user = await UserService.getAuthUser();
        setAuthUser(user);
        setLoadingStatus('ready');
      } catch (error: any) {
        setLoadingStatus('error-auth');
      }
    }

    loadAppData();
  }, [loadingStatus, setAuthUser]);

  if (loading) {
    return <AppLoadingScreen />;
  }

  if (error) {
    return <AppErrorScreen />;
  }

  return <div>{children}</div>;
}

function AppLoadingScreen() {
  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1>Loading...</h1>
    </>
  );
}

function AppErrorScreen() {
  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1>Something went wrong...</h1>
    </>
  );
}

function AppRouter() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      {user ? <AppRoutesAuthenticated /> : <AppRoutesUnauthenticated />}
    </BrowserRouter>
  );
}

function AppRoutesUnauthenticated() {
  return (
    <Routes>
      <Route path="/" element={<AppLayoutUnauthenticated />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

function AppLayoutUnauthenticated() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <h1 className="read-the-docs">Unauthenticated</h1>

      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={`${currentPath === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className={`${currentPath === '/signup' ? 'active' : ''}`}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${currentPath === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

function AppRoutesAuthenticated() {
  return (
    <Routes>
      <Route path="/" element={<AppLayoutAuthenticated />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Navigate to="/" />} />
        <Route path="signup" element={<Navigate to="/" />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

function AppLayoutAuthenticated() {
  const { user, setAuthUser } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;

  async function handleLogOut() {
    try {
      await UserService.logout();
      setAuthUser(undefined);
    } catch (error) {
      console.error('Login error', error);
      alert('An error occurred. Please try again.');
    }
  }

  return (
    <>
      <h1 className="read-the-docs">Authenticated {user}</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" className={`${currentPath === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${currentPath === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
        </ul>
        <button onClick={() => handleLogOut()}>log out</button>
      </nav>
      <Outlet />
    </>
  );
}

function PageNotFound() {
  return <h2>Page Not Found</h2>;
}
