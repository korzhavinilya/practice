import getStripe from '../libs/getStripe';
import logger from '../logger';
import StripeCustomersService from './stripe-customers.service';
import SubscriptionsService from './subscriptions.service';

const SpotifyPremiumPrices = {
  OneTime: 'price_1RnzfiBXjtiPlmVCNViV6vJF',
  PerYear: 'price_1PTJqQBXjtiPlmVCFgY8dFMA',
  PerMonth: 'price_1PRUIaBXjtiPlmVCDNLSWy3Y'
} as const;

const Coupons = {
  FirstPurchase: 'w6Kt1Lnv',
  SecondAndMorePurchase: 'C4JyDgcf'
} as const;

export default class PaymentService {
  static async createCheckoutSession(userId: string, productId: string) {
    const customerId =
      await StripeCustomersService.createOrRetrieveCustomerByUserId(userId);

    const userSubscriptions = await SubscriptionsService.getCountByUserId(
      userId
    );

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: customerId,
      line_items: [
        {
          price: SpotifyPremiumPrices.PerMonth,
          quantity: 1
        }
      ],
      // allow_promotion_codes: true,
      discounts: [
        {
          coupon:
            userSubscriptions === 0
              ? Coupons.FirstPurchase
              : Coupons.SecondAndMorePurchase
        }
        // {
        //   promotion_code: 'promo_1Rpr7HBXjtiPlmVC3Rs5TDaS'
        // }
      ],
      mode: 'subscription',
      custom_text: {
        submit: {
          message: `Product ID: ${productId}`
        }
      },
      subscription_data: {
        // trial_period_days: 30,
        metadata: {
          productId
        }
      },
      success_url: `${process.env.WEB_APP_URL}/payment/success`,
      cancel_url: `${process.env.WEB_APP_URL}/payment/cancel`
    });

    return session.id;
  }

  static async createIntent(userId: string, productId: string) {
    const customerId =
      await StripeCustomersService.createOrRetrieveCustomerByUserId(userId);

    const setupIntent = await getStripe().setupIntents.create({
      customer: customerId
    });

    return setupIntent.client_secret;
  }

  static async createCustomerPortalLink(userId: string) {
    const customerId =
      await StripeCustomersService.createOrRetrieveCustomerByUserId(userId);

    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.WEB_APP_URL}/products`,
    });

    return session.url;
  }
}
