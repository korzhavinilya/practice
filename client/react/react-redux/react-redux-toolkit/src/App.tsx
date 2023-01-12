import { useEffect } from 'react';
import Posts from './components/Posts';
import { fetchUsers, fetchUsersV2 } from './store/actions/actions';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  const { users, error, isLoading } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    // dispatch(fetchUsers());
    dispatch(fetchUsersV2());
  }, [dispatch]);

  return (
    <div className="App">
      <Posts />
      <h2>Users</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default App;
