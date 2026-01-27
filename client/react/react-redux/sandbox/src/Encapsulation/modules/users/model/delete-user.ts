import type { AppThunk } from '../../../store.types';
import { usersSlice, type UserId } from '../users.slice';
import { fetchUsers } from './fetch-users';

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, getState, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());
    try {
      await api.deleteUser(userId);
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }));
      await router.navigate('/users');
      await dispatch(fetchUsers({ refetch: true }));
    } catch (e) {
      console.error(e);
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
