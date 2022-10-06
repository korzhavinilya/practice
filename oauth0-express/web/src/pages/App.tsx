import { Routes, Route, Link, Outlet } from 'react-router-dom';
import LoginError from '../components/LoginError';
import LoginSuccess from '../components/LoginSuccess';
import Login from './Login';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Welcome</h1>
              <Link to="/login">Login page</Link>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login/error" element={<LoginError />} />
        <Route path="/login/success" element={<LoginSuccess />} />
      </Routes>
    </>
  );
}

export default App;

function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="">Home</Link> | <Link to="login">Login</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
