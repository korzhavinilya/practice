import Products from 'pages/Products';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from 'services/store';
import AppRoutePaths from './constants/AppRoutes';
import CancelPayment from './pages/CancelPayment';
import Home from './pages/Home';
import SuccessPayment from './pages/SuccessPayment';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />

          <Route path={AppRoutePaths.Products} element={<Products />} />

          <Route
            path={AppRoutePaths.PaymentSuccess}
            element={<SuccessPayment />}
          />
          <Route
            path={AppRoutePaths.PaymentCancel}
            element={<CancelPayment />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
