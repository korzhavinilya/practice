import { Routes, Route, Link } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { CounterPage } from './pages/CounterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import UsernameFormClass from './components/UsernameForm/UsernameFormClass';
import UsernameFormFunction from './components/UsernameForm/UsernameFormFunction';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/username-form-class">Username Form Class</Link>
        <Link to="/username-form-fn">Username Form Fn</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route
          path="/username-form-class"
          element={
            <UsernameFormClass
              updateUsername={(username) => {
                console.log(username);
              }}
            />
          }
        />
        <Route
          path="/username-form-fn"
          element={
            <UsernameFormFunction
              updateUsername={(username) => {
                console.log(username);
              }}
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
