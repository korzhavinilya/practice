import { NextFunction, Request, Response } from 'express';
import Logger from '../logger';
import PaymentService from '../services/payment.service';

export default class PaymentController {
  static async createCheckoutSession(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId, productId } = req.params;

    Logger.info(
      'Create a checkout session for the product: ' +
        productId +
        ' by the user: ' +
        userId
    );

    try {
      const sessionId = await PaymentService.createCheckoutSession(
        userId,
        productId
      );
      res.status(201).json({ sessionId });
    } catch (error) {
      next(error);
    }
  }

  static async createIntent(req: Request, res: Response, next: NextFunction) {
    const { userId, productId } = req.params;

    Logger.info(
      'Create an intent for the product: ' +
        productId +
        ' by the user: ' +
        userId
    );

    try {
      const clientSecret = await PaymentService.createIntent(
        userId,
        productId
      );
      res.status(201).json({ clientSecret });
    } catch (error) {
      next(error);
    }
  }

  static async createCustomerPortalLink(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId } = req.params;

    Logger.info('Create a customer portal link for the user: ' + userId);

    try {
      const url = await PaymentService.createCustomerPortalLink(userId);
      res.status(201).json({ url });
    } catch (error) {
      next(error);
    }
  }
}
