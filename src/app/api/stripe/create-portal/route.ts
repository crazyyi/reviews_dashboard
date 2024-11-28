import { db } from "@/db"
import { subscriptions } from "@/db/schema"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/payments/stripe"
import { TableName } from "@/types"
import { generateId } from "@/utils/utils"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  if (!data?.session) {
    return NextResponse.json({ message: "Error: Unauthorised", success: false }, { status: 401 });
  } else {
    try {
      const subscription = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, data.user.id)
      })

      let customer
      if (subscription) {
        customer = {
          id: subscription.stripeCustomerId,
        };
      } else {
        const customerData: {
          metadata: {
            dbId: string;
          }
        } = {
          metadata: {
            dbId: data.user.id
          }
        }

        const response = await stripe.customers.create(customerData)

        customer = { id: response.id }

        await db.insert(subscriptions).values({
          id: generateId(data.user.id, TableName.SUBSCRIPTION),
          userId: data.user.id,
          stripeCustomerId: customer.id,
        })
      }

      if (!customer?.id) {
        return NextResponse.json({ error: "Failed to get a customer id", success: false }, { status: 500 });
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${req.headers.get('origin')}/payments`,
      })

      if (session) {
        return NextResponse.json({ session: session, success: true }, { status: 200 })
      } else {
        return NextResponse.json({ message: "Error: Failed to create a portal because url is undefined", success: false }, { status: 500 })
      }

    } catch (error) {
      return NextResponse.json({ message: `Error: Failed to create a portal [${error}]`, success: false }, { status: 500 })
    }
  }

}