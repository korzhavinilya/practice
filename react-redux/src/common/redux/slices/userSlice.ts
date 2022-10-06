import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../serveices/api';
import { AppDispatch, RootState } from '../store';

type UserState = {
  name: string;
  age: number;
};

const initialState: UserState = {
  name: 'Redux toolkit',
  age: 1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
  },
});

export const { changeName, changeAge } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

export const asyncChangeData =
  (name: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentAge = state.user.age;
    await api.sleep(500);
    if (name === 'Илья' && currentAge !== 25) {
      dispatch(changeName(name));
      dispatch(changeAge(25));
    }
  };
