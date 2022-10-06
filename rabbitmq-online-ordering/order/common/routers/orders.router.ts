import { Router } from 'express';
import OrderController from '../controllers/orders.controller';

const router = Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const response = await OrderController.create(data);
  res.send(response);
});

export default router;
