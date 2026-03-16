const validateValue = require('./validateValue');

describe('validateValue util', () => {
  test('correct value', () => {
    expect(validateValue(50)).toBe(true);
  });

  test('less correct value', () => {
    expect(validateValue(0)).toBe(true);
  });

  test('greater correct value', () => {
    expect(validateValue(100)).toBe(true);
  });

  test('should be invalid', () => {
    expect(validateValue(-1)).toBe(false);
  });

  test('should be invalid', () => {
    expect(validateValue(101)).toBe(false);
  });
});
