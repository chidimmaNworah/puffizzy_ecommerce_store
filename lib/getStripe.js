import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_live_51M1uG3HJGP7UsZy7SqvKODouhPrP7IT11SH53OfvREvFAmEoCoDMXU4iNDbbQF8kNdhDm2lsCT18YOXgM27VVCVr00svwG3gqm');
  }

  return stripePromise;
}

export default getStripe;