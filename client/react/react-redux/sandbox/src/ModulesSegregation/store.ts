import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { countersReducer } from './modules/counters/counters.slice';
import {
  initialUsersList,
  usersReducer,
  type UsersStoredAction
} from './modules/users/users.slice';

const reducer = combineReducers({
  users: usersReducer,
  counters: countersReducer
});

export const store = configureStore({ reducer });

store.dispatch({
  type: 'usersStored',
  payload: { users: initialUsersList }
} satisfies UsersStoredAction);
