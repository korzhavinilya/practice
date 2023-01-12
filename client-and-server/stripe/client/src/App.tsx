import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Page from './Page';

const stripePromise = loadStripe(
  'pk_test_51LkmPZBXjtiPlmVCO7NovcpTg5OA6lUqGSkrUJjPU2Uyqk4EMAJFAkRsJVUce8UoG9m0Oiq4C9T75J0PxABnruZ700zmGaCbHh'
);

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <Page />
    </Elements>
  );
}
