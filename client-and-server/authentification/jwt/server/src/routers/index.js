const { Router } = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', authMiddleware, userRouter);

module.exports = router;
