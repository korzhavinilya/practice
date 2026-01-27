import { createAction, createReducer } from '@reduxjs/toolkit';
import type { AppState } from '../../store.types';

export type CounterId = string;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

const initialCountersState: CountersState = {};

export const incrementAction = createAction<{ counterId: CounterId }>(
  '/counters/increment'
);

export const decrementAction = createAction<{ counterId: CounterId }>(
  '/counters/decrement'
);

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(incrementAction, (state, action) => {
      const counterId = action.payload.counterId;

      if (!state[counterId]) {
        state[counterId] = { counter: 0 };
      }

      state[counterId]!.counter++;
    });
    builder.addCase(decrementAction, (state, action) => {
      const counterId = action.payload.counterId;

      if (!state[counterId]) {
        state[counterId] = { counter: 0 };
      }

      state[counterId]!.counter--;
    });
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
export const selectAllCounters = (state: AppState) => state.counters;
