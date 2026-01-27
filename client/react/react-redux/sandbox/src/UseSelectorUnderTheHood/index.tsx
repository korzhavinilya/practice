import { useEffect, useReducer, useRef } from 'react';
import {
  store,
  type IncrementalAction,
  type DecrementalAction,
  type CounterId,
  selectCounterById
} from './store';

export default function UseSelectorUnderTheHood() {
  return (
    <div>
      <Counter counterId="counter-1" />
      <Counter counterId="counter-2" />
      <Counter counterId="counter-3" />
    </div>
  );
}

function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const lastStateRef = useRef<ReturnType<typeof selectCounterById>>(undefined);

  console.log('render ', counterId);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounterById(store.getState(), counterId);
      const lastState = lastStateRef.current;

      if (currentState !== lastState) {
        forceUpdate();
      }

      lastStateRef.current = currentState;
    });

    return () => {
      unsubscribe();
    };
  }, [counterId]);

  const counterState = selectCounterById(store.getState(), counterId);

  return (
    <div>
      <p>count {counterState?.counter}</p>

      <button
        onClick={() =>
          store.dispatch({
            type: 'incremental',
            payload: { counterId }
          } satisfies IncrementalAction)
        }
      >
        increment
      </button>

      <button
        onClick={() =>
          store.dispatch({
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
