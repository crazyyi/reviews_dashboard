import { db } from "@/db"
import { subscriptions } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function createSubscription({
  stripeCustomerId,
  current_period_end
}: {
  stripeCustomerId: string,
  current_period_end: number
}) {
  await db.update(subscriptions).set({
    subscribed: true,
    stripeCurrentPeriodEnd: new Date(current_period_end * 1000)
  }).where(eq(subscriptions.stripeCustomerId, stripeCustomerId))
}

export async function cancelSubscription({
  stripeCustomerId
}: {
  stripeCustomerId: string
}) {
  await db.update(subscriptions).set({
    subscribed: false
  }).where(eq(subscriptions.stripeCustomerId, stripeCustomerId))
}

export async function getSubscription({
  userId
}: {
  userId: string
}) {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId)
  })
  return subscription?.subscribed
}