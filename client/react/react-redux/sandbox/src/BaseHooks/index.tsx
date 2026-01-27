import { Provider } from 'react-redux';
import {
  selectCounterById,
  store,
  useAppDispatch,
  useAppSelector,
  type IncrementalAction,
  type DecrementalAction
} from './store';

export default function BaseHooks() {
  return (
    <Provider store={store}>
      <Counter counterId="counter-1" />
      <Counter counterId="counter-2" />
    </Provider>
  );
}

function Counter({ counterId }: { counterId: string }) {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) =>
    selectCounterById(state, counterId)
  );

  console.log('render ', counterId);

  return (
    <div>
      <p>count {counterState?.counter}</p>

      <button
        onClick={() =>
          dispatch({
            type: 'incremental',
            payload: { counterId }
          } satisfies IncrementalAction)
        }
      >
        increment
      </button>

      <button
        onClick={() =>
          dispatch({
            type: 'decremental',
            payload: { counterId }
          } satisfies DecrementalAction)
        }
      >
        decrement
      </button>
    </div>
  );
}
