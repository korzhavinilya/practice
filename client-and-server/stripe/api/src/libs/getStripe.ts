import assert from 'assert';
import Stripe from 'stripe';
import logger from '../logger';

let stripe: Stripe;

export default function getStripe() {
  if (!stripe) {
    const apiKey = process.env.STRIPE_API_KEY;
    assert(apiKey);

    stripe = new Stripe(apiKey, {
      apiVersion: '2025-06-30.basil',
      typescript: true
    });
  }

  return stripe;
}
