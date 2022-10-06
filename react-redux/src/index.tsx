import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OldApp from './OldApp';
import App from './App';
import oldStore from './common/redux/old-store';
import store from './common/redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={oldStore}>
      <OldApp />
    </Provider>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
