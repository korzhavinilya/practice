import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate, useParams } from 'react-router-dom';
import { usersApi } from './api';
import { type UserId } from './users.types';

export default function UserInfo() {
  const navigate = useNavigate();

  const { userId } = useParams<{ userId: UserId }>();

  const [deleteUser, { isLoading: isDeleteLoading }] =
    usersApi.useDeleteUserMutation();

  console.log('isDeleteLoading', isDeleteLoading);

  const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(
    userId ?? skipToken
  );

  const handleBackButtonClick = () => {
    navigate('..', { relative: 'path' });
  };

  const handleDeleteButtonClick = async () => {
    if (userId) {
      deleteUser(userId);
      navigate('..', { relative: 'path', replace: true });
    }
  };

  if (isLoadingUser || !user) {
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
        disabled={isDeleteLoading}
        onClick={handleDeleteButtonClick}
      >
        Delete
      </button>
    </div>
  );
}
