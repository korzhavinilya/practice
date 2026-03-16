import { Router } from 'express';
import paymentRouter from './payment.router';
import productsRouter from './products.router';
import subscriptionsRouter from './subscriptions.router';
import userRouter from './user.router';

const router = Router();


router.use('/users', userRouter);
router.use('/subscriptions', subscriptionsRouter);
router.use('/products', productsRouter);
router.use('/payment', paymentRouter);

export default router;
