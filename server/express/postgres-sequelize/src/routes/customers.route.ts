import { Router } from 'express';
import customersController from '../controllers/customers.controller';

const router = Router();

router.get('/', customersController.getAll);

export default router;
