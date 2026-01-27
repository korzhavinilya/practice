import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store.types';
import { usersSlice, type UserId } from './users.slice';

export default function UsersList() {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );
  const selectedUserId = useAppSelector(
    usersSlice.selectors.selectSelectedUserId
  );

  return (
    <div className="flex flex-col items-center">
      {!selectedUserId ? (
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
      ) : (
        <SelectedUser userId={selectedUserId} />
      )}
    </div>
  );
}

const UserListItem = memo(function UserListItem({
  userId
}: {
  userId: UserId;
}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUser(state, userId)
  );

  const handleUserClick = () => {
    dispatch(usersSlice.actions.selected(userId));
  };

  return (
    <li key={userId} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});

function SelectedUser({ userId }: { userId: UserId }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUser(state, userId)
  );

  const handleBackButtonClick = () => {
    dispatch(usersSlice.actions.unselected());
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
