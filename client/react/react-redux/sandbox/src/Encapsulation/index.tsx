import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function Encapsulation() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
