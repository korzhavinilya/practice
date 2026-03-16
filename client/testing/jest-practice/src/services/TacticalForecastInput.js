class TacticalForecastInput {
  static findOne(resolver) {
    for (const input of [1, 2, 3, 4]) {
      if (resolver(input)) {
        return input;
      }
    }

    return -1;
  }
}

module.exports = TacticalForecastInput;
