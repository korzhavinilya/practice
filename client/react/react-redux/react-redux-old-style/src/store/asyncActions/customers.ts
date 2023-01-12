import { AppDispatch, RootState } from '..';
import { addCustomerAction } from '../reducers/customerReducer';

export const addThunkCustomer =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const user: { name: string } = await fetch(
      'https://jsonplaceholder.typicode.com/users/2'
    ).then((response) => response.json());

    dispatch(addCustomerAction({ name: user.name, id: Date.now() }));
  };
