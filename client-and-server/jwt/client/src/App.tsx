import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { User } from './models/User';
import UserService from './service/UserService';

function App() {
  const { store } = useContext(Context);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? 'User is authorized ' + store.user.email
          : "User isn't authorized"}
      </h1>
      <h2>
        {store.user.isActivated
          ? 'Account is activated'
          : 'Activate your account'}
      </h2>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={getUsers}>Get users</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default observer(App);
