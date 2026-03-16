const InputService = require('./InputService');
const TacticalForecastInput = require('./TacticalForecastInput');

jest.mock('./TacticalForecastInput');

describe('InputService', () => {
  it('should return mock value', async () => {
    TacticalForecastInput.findOne.mockResolvedValue(33);
    const input = await InputService.findById(33);
    expect(input).toEqual(33);
  });
});
