import { useEffect } from 'react';
import { fetchUsersV2 } from '../store/actions/actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Users() {
  const dispatch = useAppDispatch();
  const { users, error, isLoading } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    // dispatch(fetchUsers());
    dispatch(fetchUsersV2());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>Users</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Ошибка...</h3>}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <h4>{user.name}</h4>
            <h5>{user.email}</h5>
            <button onClick={() => {}}>delete</button>
            <button onClick={() => {}}>update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
