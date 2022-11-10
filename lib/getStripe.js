import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51M1uG3HJGP7UsZy7ewCxQsMnYajSM9pMsxyL8tOBxcio0hue0Efa0KOY6Id1r14TmVluMCSHy3JySj0rn0GVgDob006xkstcwJ');
  }

  return stripePromise;
}

export default getStripe;