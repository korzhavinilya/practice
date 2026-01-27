import { useNavigate, useParams } from 'react-router-dom';
import { usersSlice, type UserId } from './users.slice';
import { useAppDispatch, useAppSelector } from '../../shared/store.types';

export default function UserInfo() {
  const { userId = '' } = useParams<{ userId: UserId }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUserPending
  );

  const isDeletePending = useAppSelector(
    usersSlice.selectors.selectIsDeleteUserPending
  );

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUser(state, userId)
  );

  const handleBackButtonClick = () => {
    navigate('..', { relative: 'path' });
  };

  const handleDeleteButtonClick = async () => {
    dispatch(usersSlice.actions.deleteUser({ userId }));
  };

  if (isPending || !user) {
    return <div>Loading...</div>;
  }

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
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        disabled={isDeletePending}
        onClick={handleDeleteButtonClick}
      >
        Delete
      </button>
    </div>
  );
}
