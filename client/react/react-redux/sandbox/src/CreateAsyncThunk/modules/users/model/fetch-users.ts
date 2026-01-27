import { createAppAsyncThunk } from '../../../shared/store.types';
import { usersSlice } from '../users.slice';

// v1
export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',
  async (_: { refetch?: boolean }, thunkAPI) => thunkAPI.extra.api.getUsers(),
  {
    condition({ refetch }, { getState }) {
      const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
      if (!refetch && !isIdle) {
        return false;
      }
      return true;
    }
  }
);
