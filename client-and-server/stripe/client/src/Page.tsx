import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import CardInput from './CardInput';

export default function Page() {
  const [email, setEmail] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);
  }

  const handleSubmit = async (event: any) => {
    if (!stripe || !elements) {
      return;
    }

    const res = await axios.post('http://localhost:3000/pay', { email: email });

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as any,
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!');
      }
    }
  };

  return (
    <div className="root">
      <div className="content">
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <CardInput />
        <div>
          <button onClick={handleSubmit}>Pay</button>
        </div>
      </div>
    </div>
  );
}
