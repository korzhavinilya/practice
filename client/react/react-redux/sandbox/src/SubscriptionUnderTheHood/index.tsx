import { useEffect, useReducer } from 'react';
import { store, type IncrementalAction, type DecrementalAction } from './store';

function SubscriptionUnderTheHood() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <p>count {store.getState().counter}</p>

      <button
        onClick={() =>
          store.dispatch({
            type: 'incremental'
          } satisfies IncrementalAction)
        }
      >
        increment
      </button>

      <button
        onClick={() =>
          store.dispatch({
            type: 'decremental'
          } satisfies DecrementalAction)
        }
      >
        decrement
      </button>
    </>
  );
}

export default SubscriptionUnderTheHood;
