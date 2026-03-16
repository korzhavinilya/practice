const mapArrayToString = require('./mapArrayToString');

describe('mapArrayToString util', () => {
  it('should return a valid array of string', () => {
    expect(mapArrayToString([1, 2, 3])).toEqual(['1', '2', '3']);
  });

  it('should return a valid array of string without null, undefined, etc', () => {
    expect(mapArrayToString([1, 2, 3, null, undefined, 'hello'])).toEqual([
      '1',
      '2',
      '3',
    ]);
  });

  it('should return an empty array', () => {
    expect(mapArrayToString([])).toEqual([]);
  });

  it('should not equal another array', () => {
    expect(mapArrayToString([1, 2, 3, 4])).not.toEqual([5, 6, 7, 8]);
  });
});
