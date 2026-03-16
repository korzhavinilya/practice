import axios from 'axios';
import getStripe from '../libs/getStripe';
import Products from 'components/products/Products';
import AppLayout from 'components/layout/AppLayout';
import {
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import type { Appearance } from '@stripe/stripe-js';

export default function PaymentIntent() {
  const appearance: Appearance = {
    theme: 'night'

    // variables: {
    //   colorPrimary: '#ffffff',
    //   colorBackground: '#ffffff',
    //   colorText: '#000000',
    //   colorDanger: '#ffffff',
    //   fontFamily: 'Ubuntu',
    //   spacingUnit: '2px',
    //   borderColor: '#342',
    //   borderRadius: '0px',

    //   tabLogoSelectedColor: colors.prime,
    //   iconLoadingIndicatorColor: colors.prime,
    //   iconMenuHoverColor: colors.prime
    // }
  };

  return (
    <Elements
      stripe={getStripe()}
      options={{
        mode: 'payment',
        amount: 1000,
        currency: 'eur',
        paymentMethodTypes: ['card', 'paypal', 'sepa_debit'],
        appearance: appearance
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  async function handleCreateIntent(productIds: number[]) {
    try {
      const res = await axios.post('http://localhost:3000/api/payment/intent', {
        productIds
      });

      const { client_secret } = res.data;
      setClientSecret(client_secret);
    } catch (error: any) {
      alert(error.message);
      console.log('Error', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!
      }
    });

    if (result.error) {
      console.error(result.error.message);
      alert('Payment failed!');
    } else {
      if (result.paymentIntent?.status === 'succeeded') {
        alert('Payment succeeded!');
        setClientSecret(null);
      }
    }
  }

  return (
    <AppLayout>
      <h1>Payment Intent</h1>

      {!clientSecret && <Products handleCheckout={handleCreateIntent} />}

      {clientSecret && (
        <form className="max-w-xl" onSubmit={handleSubmit}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />

          <button
            className="
              mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Pay
          </button>
        </form>
      )}
    </AppLayout>
  );
}
