import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '..';
import { User, userSlice } from '../reducers/userSlice';

export function fetchUsers() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    dispatch(userSlice.actions.setIsLoading(true));
    try {
      const response = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users?_limit=3'
      );
      dispatch(userSlice.actions.addUsers(response.data));
    } catch (e: any) {
      dispatch(userSlice.actions.setError(e.message));
    }
    dispatch(userSlice.actions.setIsLoading(false));
  };
}

export const fetchUsersV2 = createAsyncThunk(
  'users/fetchAll',
  async function (_, thunkAPI) {
    try {
      const response = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users?_limit=3'
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
