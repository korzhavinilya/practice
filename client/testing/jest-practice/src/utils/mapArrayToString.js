function mapArrayToString(array) {
  return array.filter(Number.isInteger).map(String);
}

module.exports = mapArrayToString;
