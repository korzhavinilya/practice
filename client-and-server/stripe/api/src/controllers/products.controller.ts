import { NextFunction, Request, Response } from 'express';
import Logger from '../logger';
import ProductsService from '../services/products.service';

export default class ProductsController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    Logger.info('Find all products for the user: ' + id);

    try {
      const products = await ProductsService.findAll(id);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    Logger.info('Create a product for the user: ' + id);

    try {
      const product = await ProductsService.create(id);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
}
