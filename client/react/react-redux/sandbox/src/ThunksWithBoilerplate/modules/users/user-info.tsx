import { useNavigate, useParams } from 'react-router-dom';
import { usersSlice, type UserId } from './users.slice';
import { useAppDispatch, useAppSelector } from '../../store.types';
import { deleteUser } from './model/delete-user';

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

  // Replace by router loader
  // useEffect(() => {
  //   dispatch(fetchUser(userId));
  // }, [dispatch, userId]);

  const handleBackButtonClick = () => {
    navigate('..', { relative: 'path' });
  };

  const handleDeleteButtonClick = async () => {
    // await dispatch(deleteUser(userId));
    // navigate('..', { relative: 'path' });
    dispatch(deleteUser(userId));
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
