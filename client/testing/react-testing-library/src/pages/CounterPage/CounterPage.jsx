import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  getCounterValue,
  increment,
} from '../../redux/slices/counterSlice';

export default function CounterPage() {
  const count = useSelector(getCounterValue);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="counter-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </div>
  );
}
