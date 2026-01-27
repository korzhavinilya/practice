const square = require('./square');

describe('square', () => {
  let spyMathPow = jest.spyOn(Math, 'pow');

  it('should return correct values', () => {
    expect(square(2)).toBe(4);
    expect(square(2)).toBeLessThan(5);
    expect(square(2)).toBeGreaterThan(3);
    expect(square(2)).not.toBeUndefined();
  });

  it('should be called 1 times', () => {
    square(2);
    expect(spyMathPow).toBeCalledTimes(1);
  });

  it('should not be called', () => {
    square(1);
    expect(spyMathPow).toBeCalledTimes(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
