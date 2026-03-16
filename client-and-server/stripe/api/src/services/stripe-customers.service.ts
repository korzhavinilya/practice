import getStripe from '../libs/getStripe';
import logger from '../logger';
import UsersService from './users.service';

export default class StripeCustomersService {
  static async createOrRetrieveCustomerByUserId(userId: string) {
    const user = await UsersService.findById(userId);

    if (!user.stripe_customer_id) {
      const payload = {
        email: user.email,
        metadata: {
          id: user.id
        }
      };

      const customer = await getStripe().customers.create(payload);

      await UsersService.patchById(userId, {
        stripe_customer_id: customer.id
      });

      logger.info(`New customer was created and inserted for ${userId}.`);

      return customer.id;
    }

    return user.stripe_customer_id;
  }
}
