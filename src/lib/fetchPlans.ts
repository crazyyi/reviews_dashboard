import { stripe } from "@/lib/payments/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function fetchPlans() {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      type: 'recurring',
    });

    const plans = prices.data.map((price: Stripe.Price) => {
      const { product, recurring } = price;
      let name = "", description = ""
      if (typeof product === "string") {
        name = product;
        description = product;
      } else if ('name' in product && 'description' in product) {
        name = product.name;
        description = product.description || "";
      }

      return (
        {
          id: price.id,
          name: name,
          description: description,
          price: price.unit_amount,
          interval: recurring?.interval,
          price_id: price.id,
        }
      )
    });

    return NextResponse.json({ plans: plans }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching subscription plans' }, { status: 500 });
  }
}