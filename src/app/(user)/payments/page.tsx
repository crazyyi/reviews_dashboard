import { db } from "@/db"
import { subscriptions } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import ManageSubscription from "./manage-subscription"

const Page = async () => {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  if (!data?.session) {
    return null
  }

  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, data.user.id)
  })

  const plan = subscription && subscription.subscribed ? 'premium' : 'free'

  console.log("subscription: ", subscription);

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details</h1>
      <div className="mb-2 text-lg font-bold">Your current plan is: {plan}</div>
      <ManageSubscription />
    </div>
  )

}

export default Page