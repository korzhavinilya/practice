import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api.error';
import customersService from '../services/customers.service';

class CustomersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customersService.findAll();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomersController();
