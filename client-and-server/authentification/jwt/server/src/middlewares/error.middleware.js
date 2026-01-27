const ApiError = require('../exceptions/api.error');

function errorMiddleware(err, req, res, next) {
  console.log(err);

  const { status, message, errors } = err;

  if (err instanceof ApiError) {
    return res.status(status).json({ message, errors });
  }

  return res.status(500).json({ message: 'Oops. Unexpected exception!' });
}

module.exports = errorMiddleware;
