import type { AppState } from "../../store.types";

export type CounterId = string;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

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

type Action = IncrementalAction | DecrementalAction;

export const countersReducer = (
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

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
export const selectAllCounters = (state: AppState) => state.counters;
