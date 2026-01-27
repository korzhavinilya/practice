import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { usersSlice } from './modules/users/users.slice';
import { extraArgument } from './extra-argument';

const reducer = combineReducers({
  [usersSlice.name]: usersSlice.reducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument }
    })
});
