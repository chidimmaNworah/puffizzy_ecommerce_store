import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {

  const nextPublicStripe = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if(!stripePromise) {
    stripePromise = loadStripe(`${nextPublicStripe}`);
  }

  return stripePromise;
}

export default getStripe;