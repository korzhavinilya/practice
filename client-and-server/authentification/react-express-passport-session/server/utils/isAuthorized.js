function isAuthorized(req, res, next) {
  // if (!req.user) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  console.log('isAuthorized, req.user', req.user);
  next();
}

module.exports = isAuthorized;
