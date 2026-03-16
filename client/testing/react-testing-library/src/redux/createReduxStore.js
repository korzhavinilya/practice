import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export function createReduxStore(initialState = {}) {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
    preloadedState: initialState,
  });
}
