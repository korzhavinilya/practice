import { useState } from 'react';
import {
  User,
  useGetUsersQuery,
  useUpdateUserMutation
} from './services/userApi';

function App() {
  const { data, error, isLoading, refetch } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [isComponentOpen, setIsComponentOpen] = useState(true);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;

  const handleUpdate = async (user: User) => {
    try {
      await updateUser(user).unwrap();
      console.log('User updated successfully!');
    } catch (err: unknown) {
      console.log('Failed to update user', err);
    }
  };

  return (
    <div className="App">
      <h1>Users (ETag)</h1>
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.userId} onClick={() => handleUpdate(user)}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      )}

      <button onClick={refetch}>fetch data</button>

      <br />
      <button onClick={() => setIsComponentOpen((value) => !value)}>
        trigger component visibility
      </button>

      {isComponentOpen && <OtherComponent />}
    </div>
  );
}

export default App;

function OtherComponent() {
  const { data } = useGetUsersQuery(undefined, {
    // Если компонент будет смонтирован снова, и с момента последнего запроса прошло 10 секунд,
    // он выполнит повторный запрос. Если прошло меньше времени, он будет использовать кэшированные данные.
    refetchOnMountOrArgChange: 10
  });
  return (
    <div>OtherComponent: {data?.map((user) => user.username)?.join(', ')}</div>
  );
}
