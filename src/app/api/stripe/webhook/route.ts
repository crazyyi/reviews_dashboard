import { cancelSubscription, createSubscription } from "@/app/actions/userSubscriptions"
import { stripe } from "@/lib/payments/stripe"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const relevantEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.deleted",
  "charge.succeeded"
])

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-Signature") as string
  const webHookSecret = process.env.NODE_ENV === "production" ? process.env.STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_LOCAL_SECRET

  if (!webHookSecret) {
    return NextResponse.json(`Webhook secret not set`, { status: 400 })
  }

  if (!signature) {
    return NextResponse.json("No Signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webHookSecret
    )

  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 })
  }

  const data = event.data.object as Stripe.Subscription

  if (relevantEvents.has(event.type)) {
    const { customer } = data


    if (!customer) {
      return new NextResponse("Customer id is required.", { status: 400 })
    }


    switch (event.type) {
      case 'customer.subscription.created':
        console.log("Subscription created.");
        const current_period_end = data.current_period_end

        await createSubscription({ stripeCustomerId: customer as string, current_period_end })
        break;

      case 'customer.subscription.deleted':
        console.log("Subscription deleted.");

        await cancelSubscription({ stripeCustomerId: customer as string })
        break;

      default:
        break;
    }

  }

  return NextResponse.json({ received: true }, { status: 200 })
}