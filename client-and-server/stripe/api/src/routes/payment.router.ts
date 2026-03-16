import { Request, Response, Router } from 'express';
import Stripe from 'stripe';
import getStripe from '../libs/getStripe';
import logger from '../logger';
import SubscriptionsService from '../services/subscriptions.service';
import ProductsService from '../services/products.service';

const router = Router();

router.get('/history', async (req, res, next) => {
  logger.info('Get payment history');

  try {
    const payments = await getStripe().paymentIntents.list({
      customer: 'cus_QI4yaHwJXD8wo5',
      limit: 10
    });

    res.send(payments.data);
  } catch (error) {
    next(error);
  }
});

router.get('/subscriptions', async (req, res, next) => {
  logger.info('Get customer subscriptions');

  try {
    const subscriptions = await getStripe().subscriptions.list({
      customer: 'cus_QI4yaHwJXD8wo5',
      status: 'active',
      limit: 100
    });

    res.send(subscriptions.data);
  } catch (error) {
    next(error);
  }
});

router.delete('/subscriptions/:id', async (req, res, next) => {
  logger.info('Cancel the customer subscription');

  const id = req.params.id;

  try {
    await getStripe().subscriptions.cancel(id);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post('/intent', async (req, res, next) => {
  logger.info('Create an intent');

  try {
    const productIds = req.body.productIds as number[];
    const firstProduct = productIds[0];

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: 100,
      currency: 'USD',
      metadata: {
        prod_id: firstProduct
      },
      customer: 'cus_QI4yaHwJXD8wo5'
    });

    res.status(201).send({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
});

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

// let sseClient: Response | null = null;
// router.get('/sse', (req: Request, res: Response) => {
//   if (sseClient) {
//     res.status(400).send('Another client is already connected');
//     return;
//   }

//   res.set({
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive'
//   });

//   res.flushHeaders();
//   res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);
//   sseClient = res;

//   logger.info('SSE client connected');

//   req.on('close', () => {
//     logger.info('SSE client disconnected');
//     sseClient = null;
//     res.end();
//   });
// });

router.post('/webhook/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;

    event = getStripe().webhooks.constructEvent(
      (req as any).rawBody,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    logger.error('Webhook signature verification failed:' + err.raw.message);
    return res.status(400).send(`Webhook Error: ${err.raw.message}`);
  }

  logger.info('Webhook triggered ' + event.type);

  // if (sseClient) {
  //   sseClient.write(`data: ${event.type}`);
  // }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          const subscription = event.data.object as Stripe.Subscription;
          await SubscriptionsService.upsertByIdAndCustomerId(
            subscription.id,
            subscription.customer as string
          );
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await SubscriptionsService.upsertByIdAndCustomerId(
              subscriptionId as string,
              checkoutSession.customer as string
            );
          }
          break;
        case 'customer.subscription.deleted':
          const subscriptionToDelete = event.data.object as Stripe.Subscription;
          await SubscriptionsService.deleteById(subscriptionToDelete.id);
          break;
        default:
          logger.info('Unhandled event type');
      }
    } catch (error) {
      return res
        .status(400)
        .send('Webhook error: "Webhook handler failed. View logs.');
    }
  }

  res.sendStatus(200);
});

export default router;
