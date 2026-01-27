import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { countersReducer } from './modules/counters/counters.slice';
import { initialUsersList, usersSlice } from './modules/users/users.slice';

const reducer = combineReducers({
  counters: countersReducer,
  [usersSlice.name]: usersSlice.reducer
});

export const store = configureStore({ reducer });

store.dispatch(usersSlice.actions.stored({ users: initialUsersList }));
