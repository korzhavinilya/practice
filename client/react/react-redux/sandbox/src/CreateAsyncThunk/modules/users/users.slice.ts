import { createSelector } from '@reduxjs/toolkit';
import { fetchUsers } from './model/fetch-users';
import {
  createSlice,
  type AppDispatch,
  type ExtraArgument
} from '../../shared/store.types';

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
  reducers: (creator) => ({
    // v2
    fetchUser: creator.asyncThunk<
      User,
      { userId: UserId },
      { extra: ExtraArgument }
    >(
      (params, thunkAPI) => {
        return thunkAPI.extra.api.getUser(params.userId);
      },
      {
        // options: {
        //   condition:
        // },
        pending: (state) => {
          state.fetchUserStatus = 'pending';
        },
        fulfilled: (state, action) => {
          const user = action.payload;
          state.entities[user.id] = user;
          state.fetchUserStatus = 'succeeded';
        },
        rejected: (state) => {
          state.fetchUserStatus = 'failed';
        }
      }
    ),
    deleteUser: creator.asyncThunk<
      UserId,
      { userId: UserId },
      {
        extra: ExtraArgument;
      }
    >(
      async (params, thunkAPI) => {
        await thunkAPI.extra.api.deleteUser(params.userId);
        await thunkAPI.extra.router.navigate('/users');

        const dispatch = thunkAPI.dispatch as AppDispatch;
        dispatch(fetchUsers({ refetch: true }));
        return params.userId;
      },
      {
        pending: (state) => {
          state.deleteUserStatus = 'pending';
        },
        fulfilled: (state, action) => {
          const userId = action.payload;
          delete state.entities[userId];
          state.ids = state.ids.filter((id) => id !== userId);
          state.deleteUserStatus = 'succeeded';
        },
        rejected: (state) => {
          state.deleteUserStatus = 'failed';
        }
      }
    )
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetchUsersStatus = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const users = action.payload;
        state.entities = users.reduce(
          (acc, user) => ({ ...acc, [user.id]: user }),
          {}
        );
        state.ids = users.map((user) => user.id);
        state.fetchUsersStatus = 'succeeded';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.fetchUsersStatus = 'failed';
      });
  }
});
