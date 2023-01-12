import Stripe from 'stripe';
import express from 'express';
import cors from 'cors';

const endpointSigningSecret = 'whsec_Pc3Id0DRa0jcb3krXmHfSfrb8bWoJw6c';

const stripe = new Stripe(
  'sk_test_51LkmPZBXjtiPlmVC93UBzgMWwg5uWiNI9QZDpQZHpDHNCRltvV44QUzhkmUS0tU0jO9ZnabaErCGyWKxK1pWUnrk00IS3ZG3QZ',
  { apiVersion: '2022-08-01' }
);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/pay', async (req, res) => {
  const { email } = req.body;
  console.log('Create a Payment Intent for email', email);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 90 * 100,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
    receipt_email: email,
  });

  res.send({ client_secret: paymentIntent.client_secret });
});

app.get('/transactions', async (req, res) => {
  const data = await stripe.balanceTransactions.list({
    limit: 100,
  });

  res.send({
    data,
  });
});

app.get('/payment-intents', async (req, res) => {
  const data = await stripe.paymentIntents.list({
    limit: 100,
  });

  res.send({
    data,
  });
});

// app.get('/setup-intent/:id', async (req, res) => {
//   const { id } = req.params;
//   const data = await stripe.setupIntents.retrieve(id);
//   res.send({
//     data,
//   });
// });

app.post('/refund', async (req, res) => {
  const { paymentIntent, amount } = req.body;
  try {
    const data = await stripe.refunds.create({
      payment_intent: paymentIntent,
      amount,
      metadata: {
        foo: 'bar',
      },
    });

    res.send({
      data,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

app.post('/webhooks', async (req, res) => {
  let event = req.body;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  console.log((req as any).rawBody);

  // if (endpointSigningSecret) {
  //   console.log('Verifying with signing secret...');

  //   const signature = req.headers['stripe-signature'] || '';
  //   try {
  //     event = stripe.webhooks.constructEvent(
  //       req.rawBody,
  //       signature,
  //       endpointSigningSecret
  //     );
  //   } catch (err: any) {
  //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //     return res.sendStatus(400);
  //   }
  // }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const email = paymentIntent.receipt_email;
      console.log('PaymentIntent was successful for email', email);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!', paymentMethod);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      return res.status(400).end();
  }

  res.send({
    received: true,
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
