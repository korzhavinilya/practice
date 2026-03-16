import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'services/api/users/types';
import type { RootState } from 'services/store';

interface State {
  user: User | undefined;
}

const initialState: State = {
  user: undefined
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | undefined>) {
      state.user = action.payload;
    }
  }
});

export const { setCurrentUser } = slice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default slice.reducer;
