import { configureStore } from '@reduxjs/toolkit';

interface UnderTheHoodState {
  counter: number;
}

export type IncrementalAction = { type: 'incremental' };
export type DecrementalAction = { type: 'decremental' };

type Action = IncrementalAction | DecrementalAction;

const initialStore: UnderTheHoodState = {
  counter: 0
};

const reducer = (state = initialStore, action: Action): UnderTheHoodState => {
  switch (action.type) {
    case 'incremental':
      return { ...state, counter: state.counter + 1 };
    case 'decremental':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export const store = configureStore({ reducer: reducer });
