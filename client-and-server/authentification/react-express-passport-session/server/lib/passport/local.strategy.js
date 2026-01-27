var crypto = require('crypto');
var passport = require('passport');
var db = require('../../db');

var LocalStrategy = require('passport-local');

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    function verify(username, password, cb) {
      console.log('LocalStrategy');
      db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        function (err, row) {
          if (err) {
            return cb(err);
          }

          if (!row) {
            return cb(null, false, {
              message: 'Incorrect username or password.'
            });
          }

          crypto.pbkdf2(
            password,
            row.salt,
            310000,
            32,
            'sha256',
            function (err, hashedPassword) {
              if (err) {
                return cb(err);
              }

              if (
                !crypto.timingSafeEqual(row.hashed_password, hashedPassword)
              ) {
                return cb(null, false, {
                  message: 'Incorrect username or password.'
                });
              }

              // return cb(null, row);
              // it somehow re-writes req.user
              return cb(null, {
                id: row.id,
                username: row.name ?? row.username
              });
            }
          );
        }
      );
    }
  )
);
