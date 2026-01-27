import { combineReducers, configureStore } from '@reduxjs/toolkit';

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

type UsersState = {
  entities: Record<UserId, User | undefined>;
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

export type CounterId = string;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

// type State = {
//   users: UsersState;
//   counters: CountersState;
// };

export type IncrementalAction = {
  type: 'incremental';
  payload: {
    counterId: CounterId;
  };
};

export type DecrementalAction = {
  type: 'decremental';
  payload: {
    counterId: CounterId;
  };
};

const initialCounterState: CounterState = { counter: 0 };
const initialCountersState: CountersState = {};

type Action =
  | UserSelectedAction
  | UserUnselectedAction
  | UsersStoredAction
  | IncrementalAction
  | DecrementalAction;

const usersReducer = (
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

const countersReducer = (
  state = initialCountersState,
  action: Action
): CountersState => {
  switch (action.type) {
    case 'incremental':
      const incrementCounterId = action.payload.counterId;
      const incrementCurrentCounter =
        state[incrementCounterId] ?? initialCounterState;
      return {
        ...state,
        [incrementCounterId]: {
          ...incrementCurrentCounter,
          counter: incrementCurrentCounter.counter + 1
        }
      };
    case 'decremental':
      const decrementCounterId = action.payload.counterId;
      const decrementCurrentCounter =
        state[decrementCounterId] ?? initialCounterState;
      return {
        ...state,
        [decrementCounterId]: {
          ...decrementCurrentCounter,
          counter: decrementCurrentCounter.counter - 1
        }
      };
    default:
      return state;
  }
};

// const initialState = {
//   users: initialUsersState,
//   counters: initialCountersState
// };

// const reducer = (state = initialState, action: Action): State => {
//   return {
//     users: usersReducer(state.users, action),
//     counters: countersReducer(state.counters, action)
//   };
// };

const reducer = combineReducers({
  users: usersReducer,
  counters: countersReducer
});

export const store = configureStore({ reducer });
