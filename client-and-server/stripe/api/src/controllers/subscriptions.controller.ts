import { NextFunction, Request, Response } from 'express';
import Logger from '../logger';
import SubscriptionsService from '../services/subscriptions.service';

export default class SubscriptionsController {
  static async cancelStripeById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {
      await SubscriptionsService.cancelStripeById(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
