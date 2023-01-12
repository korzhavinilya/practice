const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    favoriteSubjects: [
      {
        type: String,
      },
    ],
  },
  {
    collection: 'student',
  }
);

module.exports = model('student', schema);
