import { Provider } from 'react-redux';
import Counters from './modules/counters/counters';
import { store } from './store';
import UsersList from './modules/users/users-list';

export default function ModulesSegregation() {
  return (
    <Provider store={store}>
      <div>
        <h2 className="text-3xl mb-1">Counters</h2>
        <Counters />

        <h2 className="text-3xl my-1">Users List</h2>
        <UsersList />
      </div>
    </Provider>
  );
}
