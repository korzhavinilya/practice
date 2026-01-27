function initialize(passport) {
  return function initialize(req, res, next) {
    req.login = function (user, options, done) {
      console.log('logIn');
    };

    req.logout = function (options, done) {
      console.log('logOut');
    };

    next();
  };
}

module.exports = { initialize };
