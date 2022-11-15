import Stripe from 'stripe';

const stripe = new Stripe('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');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        shipping_options: [
          { shipping_rate: 'shr_1M3EYkHJGP7UsZy7A71FgVsF' },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/51hwjvzt/production/').replace('-webp', '.webp');

          return {
            price_data: { 
              currency: 'ngn',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}