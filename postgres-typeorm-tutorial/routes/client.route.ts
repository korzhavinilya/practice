import { Router } from 'express';
import clientController from '../controllers/client.controller';

const router = Router();
router.get('/', clientController.getAll);
router.post('/', clientController.create);

export default router;
