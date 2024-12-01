"use client"

import SubscribeBtn from "@/components/SubcribeBtn"
import { paymentPlans } from "@/lib/payments/payments"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")
  const planId = plan === "monthly" ? paymentPlans.MonthlyPlan : paymentPlans.YearlyPlan
  return (
    <div className="flex flex-col border p-5 rounded-md">
      <h1 className="text-2xl font-semibold">{`You have chosen to subscribe for our ${plan} plan. Start your subscription now:`}</h1>
      <div className="w-fit mt-3">
        <SubscribeBtn price={planId} />
      </div>
    </div>
  )
}

export default Page