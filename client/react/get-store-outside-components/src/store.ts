import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { getAccessToStoreMiddleware } from './getAccessToStoreMiddleware';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(getAccessToStoreMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
