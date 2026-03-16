import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import ProductsController from '../controllers/products.controller';
import PaymentController from '../controllers/payment.controller';

const router = Router();

router.get('/', UsersController.findAll);
router.post('/', UsersController.create);

router.get('/:id/products', ProductsController.findAll);
router.post('/:id/products', ProductsController.create);

router.post(
  '/:userId/products/:productId/checkout-session',
  PaymentController.createCheckoutSession
);
router.post(
  '/:userId/products/:productId/intent',
  PaymentController.createIntent
);
router.post(
  '/:userId/customer-portal-link',
  PaymentController.createCustomerPortalLink
);

export default router;
