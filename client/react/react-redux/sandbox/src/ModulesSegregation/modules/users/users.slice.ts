import { createAppSelector, type AppState } from "../../store.types";

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
};

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: null
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

export const usersReducer = (
  state = initialUsersState,
  action: Action
): UsersState => {
  switch (action.type) {
    case 'usersStored':
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce(
          (acc, user) => ({ ...acc, [user.id]: user }),
          {}
        ),
        ids: users.map((user) => user.id)
      };
    case 'userSelected':
      const { userId: selectedUserId } = action.payload;
      return {
        ...state,
        selectedUserId: selectedUserId
      };
    case 'userUnselected':
      return {
        ...state,
        selectedUserId: null
      };
    default:
      return state;
  }
};

export const selectUser = (state: AppState, userId: UserId) =>
  state.users.entities[userId];
export const selectSelectedUserId = (state: AppState) =>
  state.users.selectedUserId;
export const selectIds = (state: AppState) => state.users.ids;
export const selectEntities = (state: AppState) => state.users.entities;
export const selectSortedUsers = createAppSelector(
  [selectIds, selectEntities, (_, sort: 'asc' | 'desc') => sort],
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
);
