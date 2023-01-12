import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersV2 } from '../actions/actions';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addUsers(state, action: PayloadAction<User[]>) {
      state.users.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsersV2.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.error = '';
          state.users = [...state.users, ...action.payload];
        }
      )
      .addCase(fetchUsersV2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersV2.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reducer, actions } = userSlice;
