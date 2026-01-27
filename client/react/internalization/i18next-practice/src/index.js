import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={'Loading...'}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
