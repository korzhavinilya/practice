import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

export type CounterId = string;

type CounterState = {
  counter: number;
};

interface State {
  counters: Record<CounterId, CounterState | undefined>;
}

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

type Action = IncrementalAction | DecrementalAction;

const initialCounterState: CounterState = { counter: 0 };
const initialStore: State = {
  counters: {}
};

const reducer = (state = initialStore, action: Action): State => {
  switch (action.type) {
    case 'incremental':
      const incrementCounterId = action.payload.counterId;
      const incrementCurrentCounter =
        state.counters[incrementCounterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [incrementCounterId]: {
            ...incrementCurrentCounter,
            counter: incrementCurrentCounter.counter + 1
          }
        }
      };
    case 'decremental':
      const decrementCounterId = action.payload.counterId;
      const decrementCurrentCounter =
        state.counters[decrementCounterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [decrementCounterId]: {
            ...decrementCurrentCounter,
            counter: decrementCurrentCounter.counter - 1
          }
        }
      };
    default:
      return state;
  }
};

export const store = configureStore({ reducer: reducer });

export const selectAllCounters = (state: AppState) => state.counters;

export const selectCounterById = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
