require('./local.strategy');
require('./google.strategy');

var passport = require('passport');
var db = require('../../db');

// it accepts the response from strategy configuration
// function used to decide what data of the user object should be stored in the session.
passport.serializeUser(function (user, cb) {
  console.log('serialize', user);
  process.nextTick(function () {
    return cb(null, user.id);
  });
});

// Function is essential for retrieving user details from the session store to ensure req.user is populated correctly
// The result of this function is used to populate the req.user object
passport.deserializeUser(function (id, cb) {
  console.log('deserialize', id);
  if (!id) return cb(null);

  db.get('SELECT * FROM users WHERE id = ?', [id], function (err, user) {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});
