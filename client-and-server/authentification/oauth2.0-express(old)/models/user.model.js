const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    googleId: String,
    provider: String,
    displayName: String,
    email: String,
  },
  {
    collection: 'user',
  }
);

module.exports = model('user', schema);
