import { Router } from 'express';
import SubscriptionsController from '../controllers/subscriptions.controller';

const router = Router();

router.delete('/:id', SubscriptionsController.cancelStripeById);

export default router;
