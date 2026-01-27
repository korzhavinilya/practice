import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

export default function CreateAsyncThunk() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
} 
