import Stripe from 'stripe';
import db from '../db';
import ApiError from '../errors/api.error';
import getStripe from '../libs/getStripe';
import logger from '../logger';
import { SubscriptionSchema } from '../types/subscriptions.type';
import UsersService from './users.service';

export default class SubscriptionsService {
  static async getCountByUserId(userId: string) {
    const res = await db('subscription')
      .where('user_id', userId)
      .count('* as count');
    return Number(res[0].count);
  }

  static async findById(id: string) {
    return getStripe().subscriptions.retrieve(id, {
      expand: ['default_payment_method', 'discount.coupon']
    });
  }

  static async upsertByIdAndCustomerId(id: string, customerId: string) {
    logger.info('Upsert the subscription ' + id + ' by ' + customerId);
    const user = await UsersService.findByCustomerId(customerId);

    const subscription = await this.findById(id);
    // console.dir(subscription, { depth: 999 });

    const payload: Partial<SubscriptionSchema> = {
      id: subscription.id,
      user_id: user.id,
      product_id: subscription.metadata.productId,
      current_period_start:
        subscription.items.data[0].current_period_start * 1000,
      current_period_end: subscription.items.data[0].current_period_end * 1000
    };

    console.log('payload', payload);

    await db('subscription')
      .insert(payload)
      .onConflict(['user_id', 'product_id'])
      .merge();

    logger.info(
      `Inserted/updated subscription: ${subscription.id} for user: [${user.id}]`
    );
  }

  static async deleteById(id: string) {
    logger.info('Delete the subscription locally' + id);

    await db.raw('PRAGMA foreign_keys = ON');
    const count = await db('subscription').where('id', id).delete();

    if (!count) {
      throw ApiError.NotFound('Subscription not found by id: ' + id);
    }
  }

  static async cancelStripeById(id: string) {
    logger.info('Cancel the stripe subscription ' + id);
    await getStripe().subscriptions.cancel(id);
  }
}
