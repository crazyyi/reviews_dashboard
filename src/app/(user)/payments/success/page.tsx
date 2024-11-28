import { db } from "@/db"
import { subscriptions } from "@/db/schema"
import { auth } from "@/lib/auth"
import { paymentPlans } from "@/lib/payments/payments"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import Link from "next/link"

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

  console.log("subscription: ", subscription);

  const planKey = Object.keys(paymentPlans).find(key => paymentPlans[key as keyof typeof paymentPlans] === subscription?.stripePriceId)

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Payment is successful!</h1>
      <div className="mb-2 text-lg font-bold">{`Your have subscribed to our ${planKey} premium plan.`}</div>
      <div className="text-blue-600">
        <Link href={"/dashboard"}>Go to Dashboard</Link>
      </div>
    </div>
  )

}

export default Page