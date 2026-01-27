import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { extraArgument } from './extra-argument';
import { baseApi } from '../shared/baseApi';

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument }
    }).concat(baseApi.middleware)
});
