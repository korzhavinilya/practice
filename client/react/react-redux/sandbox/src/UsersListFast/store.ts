import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const users: User[] = Array.from({ length: 1500 }, (_, index) => ({
  id: `user-${index}`,
  name: `User ${index}`,
  description: `description for User ${index}`
}));

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | null;
};

interface State {
  users: UsersState;
}

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: null
};

const initialStore: State = {
  users: initialUsersState
};

export type UserSelectedAction = {
  type: 'userSelected';
  payload: {
    userId: UserId;
  };
};

export type UserUnselectedAction = {
  type: 'userUnselected';
};

export type UsersStoredAction = {
  type: 'usersStored';
  payload: {
    users: User[];
  };
};

type Action = UserSelectedAction | UserUnselectedAction | UsersStoredAction;

const reducer = (state = initialStore, action: Action): State => {
  switch (action.type) {
    case 'usersStored':
      const { users } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          entities: users.reduce(
            (acc, user) => ({ ...acc, [user.id]: user }),
            {}
          ),
          ids: users.map((user) => user.id)
        }
      };
    case 'userSelected':
      const { userId: selectedUserId } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: selectedUserId
        }
      };
    case 'userUnselected':
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: null
        }
      };
    default:
      return state;
  }
};

export const createAppSelector = createSelector.withTypes<AppState>();

export const selectUser = (state: AppState, userId: UserId) =>
  state.users.entities[userId];
export const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId;
export const selectIds = (state: AppState) => state.users.ids;
export const selectEntities = (state: AppState) => state.users.entities;
export const selectSortedUsers = createAppSelector(
  [selectIds, selectEntities, (_, sort: 'asc' | 'desc') => sort],
  (ids, entities, sort) => {
    console.log('selectSortedUsers', sort);

    return ids
      .map((id) => entities[id])
      .sort((a, b) => {
        if (sort === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }
);

export const store = configureStore({ reducer: reducer });

store.dispatch({
  type: 'usersStored',
  payload: { users }
} satisfies UsersStoredAction);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
