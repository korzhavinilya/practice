import { Provider } from 'react-redux';
import UsersList from './modules/users/users-list';
import { store } from './store';

export default function BasicFetchingNCaching() {
  return (
    <Provider store={store}>
      <UsersList />
    </Provider>
  );
}
