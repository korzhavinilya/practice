import useUsers from './common/hooks/useUsers';
import UsersList from './UsersList';

export default function Users() {
  const { data, loading, error } = useUsers();

  return loading ? <>Loading...</> : <UsersList users={data?.users} />;
}
