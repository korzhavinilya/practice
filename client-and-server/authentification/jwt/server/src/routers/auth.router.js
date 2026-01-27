const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

const authRouter = new Router();

authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.registration
);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/activate/:link', authController.activate);
authRouter.get('/refresh', authController.refresh);

module.exports = authRouter;
