import {
  createSelector,
  type ThunkAction,
  type UnknownAction
} from '@reduxjs/toolkit';
import { useSelector, useDispatch, useStore } from 'react-redux';
import type { store } from './store';
import type { extraArgument } from './extra-argument';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
