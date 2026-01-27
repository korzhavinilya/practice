import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';
import { PublicRoutes } from './components/PublicRoutes';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <label>
        <input
          type="checkbox"
          name="checkbox"
          checked={isAuthenticated}
          onChange={() => setIsAuthenticated(!isAuthenticated)}
        />
        isAuthenticated
      </label>

      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
