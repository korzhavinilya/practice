import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import assert from 'assert';
import getStripe from 'libs/getStripe';

interface Props {
  open: boolean;
  clientSecret: string;
  handleClose: () => void;
}

export default function IntentDialog(props: Props) {
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
        paymentMethodTypes: ['card'],
        appearance
      }}
    >
      <CheckoutForm {...props} />
    </Elements>
  );
}

export function CheckoutForm({ open, clientSecret, handleClose }: Props) {
  const stripe = useStripe();
  const elements = useElements();

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log('123');

    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!
      }
    });

    const {
      error,
      setupIntent: { payment_method }
    } = result;

    // TODO pass payment_method to BE to complete subscription 

    // on the BE side
    // const subscription = await stripe.subscriptions.create({
    //     customer: customer.id,
    //     items: [{ price: 'price_1PTJqQBXjtiPlmVCFgY8dFMA' }],
    //     default_payment_method: 'pm_xxx', // то, что получил на фронте
    //     trial_period_days: 30,
    //     metadata: {
    //       productId,
    //     },
    //   });

    console.log('result', result);

    if (error) {
      console.error(error.message);
      alert('Payment failed!');
    } else {
      //   if (result.paymentIntent?.status === 'succeeded') {
      //     alert('Payment succeeded!');
      handleClose();
      //   }
    }
  }

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="border w-full max-w-md rounded-xl  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium ">
              Payment
            </DialogTitle>

            <form className="mt-5 max-w-xl" onSubmit={handleSubmit}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />

              <button
                type="submit"
                className="mt-4 border rounded-md flex items-center justify-center gap-x-2.5 px-5 py-1 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer"
              >
                Pay
              </button>
            </form>

            {/* <p className="mt-2 text-sm/6 ">
              Your payment has been successfully submitted. We’ve sent you an
              email with all of the details of your order.
            </p>
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-inner focus:not-data-focus:outline-none data-focus:outline data-hover:bg-gray-600 data-open:bg-gray-700"
                onClick={handleClose}
              >
                Got it, thanks!
              </Button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
