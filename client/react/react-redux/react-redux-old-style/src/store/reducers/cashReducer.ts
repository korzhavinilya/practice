import { Action } from '../interfaces/action.interface';

const defaultState = {
  cash: 0,
};

const ADD_CASH = 'ADD_CASH';
const GET_CASH = 'GET_CASH';

export function addCashAction(cash: number) {
  return { type: ADD_CASH, payload: cash };
}

export function getCashAction(cash: number) {
  return { type: GET_CASH, payload: cash };
}

export const cashReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case ADD_CASH:
      return { ...state, cash: state.cash + action.payload };
    case GET_CASH:
      return { ...state, cash: state.cash - action.payload };
    default:
      return state;
  }
};
