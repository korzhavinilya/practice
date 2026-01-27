import { Link, Outlet, createBrowserRouter, redirect } from 'react-router-dom';
import UsersList from './modules/users/users-list';
import UserInfo from './modules/users/user-info';
import { store } from './store';
import { fetchUsers } from './modules/users/model/fetch-users';
import { fetchUser } from './modules/users/model/fetch-user';

// hack for Cannot access 'store' before initialization
const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(store);
    }, 0);
  });

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="container p-5 flex flex-col gap-5">
        <header className="py-5 flex gap-4">
          <Link to="/users">Users</Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => redirect('/users')
      },
      {
        path: 'users',
        element: <UsersList />,
        loader: () => {
          loadStore().then(() => {
            store.dispatch(fetchUsers({}));
          });
          return null;
        }
      },
      {
        path: 'users/:userId',
        element: <UserInfo />,
        loader: ({ params }) => {
          loadStore().then(() => {
            store.dispatch(fetchUser(params.userId ?? ''));
          });

          return null;
        }
      }
    ]
  }
]);
