const TacticalForecastInput = require('./TacticalForecastInput');

class InputService {
  static async findById(id) {
    return TacticalForecastInput.findOne((input) => input === id);
  }
}

module.exports = InputService;
