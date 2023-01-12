import { useSelector } from 'react-redux';
import { addThunkCustomer } from './store/asyncActions/customers';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addCashAction, getCashAction } from './store/reducers/cashReducer';
import {
  addCustomerAction,
  addSagaCustomerAction,
  deleteCustomerAction,
} from './store/reducers/customerReducer';

function App() {
  const dispatch = useAppDispatch();

  const cash = useAppSelector((state) => state.cash.cash);
  const customers = useSelector((state: any) => state.customers.customers);

  function addCash(cash: number) {
    dispatch(addCashAction(cash));
  }

  function getCash(cash: number) {
    dispatch(getCashAction(cash));
  }

  function addCustomer(name: string | null) {
    const customer = {
      id: Date.now(),
      name,
    };

    dispatch(addCustomerAction(customer));
  }

  function deleteCustomer(id: number) {
    dispatch(deleteCustomerAction(id));
  }

  function addSagaCustomer() {
    dispatch(addSagaCustomerAction());
  }

  return (
    <div className="App">
      <div style={{ fontSize: '3rem' }}>Счёт: {cash} </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => addCash(Number(prompt()))}>
          Пополнить счёт
        </button>
        <button onClick={() => getCash(Number(prompt()))}>Снять деньги</button>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        {/* Saga button */}
        <button onClick={addSagaCustomer}>Добавить клиента через Saga</button>
        {/* Thunk button */}
        <button onClick={() => dispatch(addThunkCustomer())}>
          Добавить клиента через Thunk
        </button>
      </div>

      {customers.length > 0 ? (
        <ul>
          {customers.map((customer: any) => (
            <li onClick={() => deleteCustomer(customer.id)}>{customer.name}</li>
          ))}
        </ul>
      ) : (
        <span style={{ fontSize: '1.5rem' }}>Клиенты отсутствуют</span>
      )}
    </div>
  );
}

export default App;
