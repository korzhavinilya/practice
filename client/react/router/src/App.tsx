import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import ErrorPage from './pages/ErrorPage';
import Contacts, { loader as contactsLoader } from './pages/Contacts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Contacts />,
    errorElement: <ErrorPage />,
    loader: contactsLoader,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
