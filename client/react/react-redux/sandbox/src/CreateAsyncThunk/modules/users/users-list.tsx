import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../shared/store.types';
import { usersSlice, type UserId } from './users.slice';

export default function UsersList() {
  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );

  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  if (isPending) {
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
            <UserListItem key={user.id} userId={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const UserListItem = memo(function UserListItem({
  userId
}: {
  userId: UserId;
}) {
  const navigate = useNavigate();

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUser(state, userId)
  );

  if (!user) {
    return null;
  }

  const handleUserClick = () => {
    navigate(userId, { relative: 'path' });
  };

  return (
    <li key={userId} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
