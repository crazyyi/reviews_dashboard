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
  const { priceId, quantity = 1 } = await req.json()
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
          stripePriceId: priceId,
          stripeCustomerId: customer.id,
        })
      }

      if (!customer?.id) {
        return NextResponse.json({ message: "Error: Failed to create a session" }, { status: 500 })
      }

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customer?.id,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: quantity
          }
        ],
        success_url: `${req.headers.get('origin')}/payments/success`,
        cancel_url: `${req.headers.get('origin')}`,
      })

      if (session) {
        return NextResponse.json({ sessionId: session.id, success: true }, { status: 200 })
      } else {
        return NextResponse.json({ message: "Error: Failed to create a session." }, { status: 500 })
      }

    } catch (error) {
      return NextResponse.json({ message: `Error: Failed to create a session. [${error}]` }, { status: 500 })
    }
  }

}