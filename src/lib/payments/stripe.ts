import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_TEST_SECRET || "", {
  apiVersion: "2024-11-20.acacia",
  typescript: true
})