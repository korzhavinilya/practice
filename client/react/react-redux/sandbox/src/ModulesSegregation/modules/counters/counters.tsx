import { useAppDispatch, useAppSelector } from '../../store.types';
import {
  selectCounter,
  type CounterId,
  type IncrementalAction,
  type DecrementalAction
} from './counters.slice';

export default function Counters() {
  return (
    <div>
      <Counter counterId="counter-1" />
      <Counter counterId="counter-2" />
      <Counter counterId="counter-3" />
    </div>
  );
}

function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId)
  );

  return (
    <div>
      <p>count {counterState?.counter}</p>

      <button
        className="border rounded-md p-1 mr-1"
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
        className="border rounded-md p-1"
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
