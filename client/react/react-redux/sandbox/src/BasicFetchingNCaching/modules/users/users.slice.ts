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
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | null;
  fetchUsersStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: null,
  fetchUsersStatus: 'idle'
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  selectors: {
    selectUser: (state, userId: UserId) => state.entities[userId],
    selectSelectedUserId: (state) => state.selectedUserId,
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
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle'
  },
  reducers: {
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = 'pending';
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
    fetchUsersFailed: (state) => {
      state.fetchUsersStatus = 'failed';
    },
    selected: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
    unselected: (state) => {
      state.selectedUserId = null;
    }
  }
});
