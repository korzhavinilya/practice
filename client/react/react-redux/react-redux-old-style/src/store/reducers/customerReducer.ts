import { Action } from '../interfaces/action.interface';

const defaultState = {
  customers: [],
};

const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const ADD_SAGA_CUSTOMER = 'ADD_SAGA_CUSTOMER';
const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

export function addCustomerAction(customer: any) {
  return { type: ADD_CUSTOMER, payload: customer };
}

export function deleteCustomerAction(id: number) {
  return { type: DELETE_CUSTOMER, payload: id };
}

export function addSagaCustomerAction() {
  return { type: ADD_SAGA_CUSTOMER, payload: null };
}

export const customerReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload] };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer: any) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
