import { getPlanDetails } from "@/app/actions/userSubscriptions"
import { auth } from "@/lib/auth"
import { cn, formatDate } from "@/lib/utils"
import { getEnumKeyByValue } from "@/utils/utils"
import { headers } from "next/headers"

const CurrentPlan = async ({ className }: { className: string }) => {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  const userId = data?.user?.id

  const [stripePriceId, stripeCurrentPeriodEnd] = await getPlanDetails({ userId: userId || "" })

  const date = stripeCurrentPeriodEnd ? formatDate(new Date(stripeCurrentPeriodEnd)) : ""

  console.log("date ", date);

  return (
    <div className={cn("flex flex-col space-y-3 font-bold", className)}>
      <span>
        Current plan: {stripePriceId ? getEnumKeyByValue({ priceId: stripePriceId }) : "Free"}
      </span>
      <span>
        {date.length > 0 ? `Expires on ${date}` : "No expire date for Free plan."}
      </span>
    </div>
  )
}

export default CurrentPlan