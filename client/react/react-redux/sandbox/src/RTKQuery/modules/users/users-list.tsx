import { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from './api';
import { type User } from './users.types';

export default function UsersList() {
  const { data: users, isLoading } = usersApi.useGetUsersQuery();

  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

  const sortedUsers = useMemo(() => {
    return [...(users ?? [])].sort((a, b) => {
      if (sortType === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [sortType, users]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row items-center">
          <button
            onClick={() => setSortType('asc')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Asc
          </button>
          <button
            onClick={() => setSortType('desc')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Desc
          </button>
        </div>
        <ul className="list-none">
          {sortedUsers.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const UserListItem = memo(function UserListItem({ user }: { user: User }) {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(user.id, { relative: 'path' });
  };

  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
