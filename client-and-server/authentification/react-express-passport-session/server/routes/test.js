const express = require('express');
var passport = require('passport');
var db = require('../db');
var crypto = require('crypto');
const isAuthorized = require('../utils/isAuthorized');
const sanitizeUser = require('../utils/sanitizeUser');

var router = express.Router();

router.get('/auth/me', isAuthorized, (req, res) => {
  res.send({ user: sanitizeUser(req.user) });
});

router.post('/auth/login', passport.authenticate('local'), function (req, res) {
  res.send({ user: sanitizeUser(req.user) });
});

router.post('/auth/signup', function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    'sha256',
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      db.run(
        'INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)',
        [req.body.username, hashedPassword, salt],
        function (err) {
          if (err) {
            return next(err);
          }

          var user = {
            id: this.lastID,
            username: req.body.username
          };

          req.login(user, function (err) {
            if (err) {
              return next(err);
            }

            res.send({ user: sanitizeUser(req.user) });
          });
        }
      );
    }
  );
});

router.post('/auth/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ message: 'Done' });
  });
});

router.get('/auth/google', passport.authenticate('google'));

router.get(
  '/auth/callback/google',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: '/login'
  })
);

module.exports = router;
