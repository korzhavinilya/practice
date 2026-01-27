import {
  createSelector,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const initialUsersList: User[] = Array.from(
  { length: 1500 },
  (_, index) => ({
    id: `user-${index}`,
    name: `User ${index}`,
    description: `description for User ${index}`
  })
);

type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  fetchUsersStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  fetchUserStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  deleteUserStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: 'idle',
  fetchUserStatus: 'idle',
  deleteUserStatus: 'idle'
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  selectors: {
    selectUser: (state, userId: UserId) => state.entities[userId],
    selectIds: (state) => state.ids,
    selectEntities: (state) => state.entities,
    selectSortedUsers: createSelector(
      [
        (state: UsersState) => state.ids,
        (state: UsersState) => state.entities,
        (_: UsersState, sort: 'asc' | 'desc') => sort
      ],
      (ids, entities, sort) => {
        console.log('[sorting...]');

        return ids
          .map((id) => entities[id])
          .filter((user): user is User => !!user)
          .sort((a, b) => {
            if (sort === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          });
      }
    ),
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === 'pending',
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle',
    selectIsFetchUserPending: (state) => state.fetchUserStatus === 'pending',
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === 'pending'
  },
  reducers: {
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = 'pending';
    },
    fetchUserPending: (state) => {
      state.fetchUserStatus = 'pending';
    },
    deleteUserPending: (state) => {
      state.deleteUserStatus = 'pending';
    },
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;
      state.entities = users.reduce(
        (acc, user) => ({ ...acc, [user.id]: user }),
        {}
      );
      state.ids = users.map((user) => user.id);
      state.fetchUsersStatus = 'succeeded';
    },
    fetchUserSuccess: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.entities[user.id] = user;
      state.fetchUserStatus = 'succeeded';
    },
    deleteUserSuccess: (state, action: PayloadAction<{ userId: UserId }>) => {
      const { userId } = action.payload;
      delete state.entities[userId];
      state.deleteUserStatus = 'succeeded';
      state.ids = state.ids.filter((id) => id !== userId);
    },
    fetchUsersFailed: (state) => {
      state.fetchUsersStatus = 'failed';
    },
    fetchUserFailed: (state) => {
      state.fetchUserStatus = 'failed';
    },
    deleteUserFailed: (state) => {
      state.deleteUserStatus = 'failed';
    }
  }
});
