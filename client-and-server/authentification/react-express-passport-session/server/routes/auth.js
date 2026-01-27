var express = require('express');
var crypto = require('crypto');
var passport = require('passport');
var db = require('../db');

var router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post(
  '/login/password',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
  // function (req, res) { // can be used instead of successRedirect
  //   res.redirect('/?user=' + req.user.username);
  // }
);

router.get('/login/google', passport.authenticate('google'));

router.get(
  '/api/auth/callback/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup/password', function (req, res, next) {
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
            res.redirect('/');
          });
        }
      );
    }
  );
});

module.exports = router;
