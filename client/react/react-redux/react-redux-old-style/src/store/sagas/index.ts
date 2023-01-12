import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { Action } from '../interfaces/action.interface';
import {
  addCustomerAction,
  ADD_SAGA_CUSTOMER,
} from '../reducers/customerReducer';
import axios from 'axios';

export const getUser = async () => {
  return axios.get('/users');
};

function* addCustomer(action: Action) {
  try {
    const user: { name: string } = yield call(() =>
      fetch('https://jsonplaceholder.typicode.com/users/1').then((response) =>
        response.json()
      )
    );
    console.log(user);

    yield put(addCustomerAction({ name: user.name, id: Date.now() }));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

export function* customerCreatingSaga() {
  yield takeEvery(ADD_SAGA_CUSTOMER, addCustomer);
}

export default function* rootSaga() {
  yield all([customerCreatingSaga]);
}
