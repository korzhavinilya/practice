const { Router } = require('express');
const userController = require('../controllers/user.controller');

const authRouter = new Router();

authRouter.get('/', userController.getUsers);

module.exports = authRouter;
