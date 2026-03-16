import counterReducer, {
  getCounterValue,
  increment,
  decrement,
} from './counterSlice';

describe('getCounterSelector', () => {
  test('initialized value', () => {
    expect(
      getCounterValue({
        counter: {
          value: 10,
        },
      })
    ).toBe(10);
  });
});

describe('counter reducer', () => {
  test('increment', () => {
    expect(counterReducer({ value: 0 }, increment())).toEqual({ value: 1 });
  });

  test('decrement', () => {
    expect(counterReducer({ value: 0 }, decrement())).toEqual({ value: -1 });
  });
});
