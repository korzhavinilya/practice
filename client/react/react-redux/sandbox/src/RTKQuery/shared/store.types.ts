import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  createSelector,
  type ThunkAction,
  type UnknownAction
} from '@reduxjs/toolkit';
import { useSelector, useDispatch, useStore } from 'react-redux';
import type { store } from '../app/store';
import type { extraArgument } from '../app/extra-argument';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraArgument = typeof extraArgument;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  ExtraArgument,
  UnknownAction
>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();

export const createSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator
  }
});
