import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../../store.types';
import {
  selectCounter,
  type CounterId,
  incrementAction,
  decrementAction
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

  const actions = bindActionCreators(
    {
      incrementAction,
      decrementAction
    },
    dispatch
  );

  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId)
  );

  return (
    <div>
      <p>count {counterState?.counter}</p>

      <button
        className="border rounded-md p-1 mr-1"
        onClick={() => actions.incrementAction({ counterId })}
      >
        increment
      </button>

      <button
        className="border rounded-md p-1"
        onClick={() => actions.decrementAction({ counterId })}
      >
        decrement
      </button>
    </div>
  );
}
