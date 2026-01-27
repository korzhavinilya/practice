import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';

function debugSentry() {
  throw new Error('React Error');
}

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* <Routes> */}
        <SentryRoutes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </SentryRoutes>
        {/* </Routes> */}
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => debugSentry()}>Break the Home page</button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <button onClick={() => debugSentry()}>Break the About page</button>
    </div>
  );
}
