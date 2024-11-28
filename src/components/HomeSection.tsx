import { getSubscription } from "@/app/actions/userSubscriptions"
import PricingSection from "@/app/pricing-section"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const HomeSection = async () => {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  let isSubscribed
  if (data?.session) {
    isSubscribed = await getSubscription({
      userId: data?.user.id
    })
  }

  return (
    <>
      {!!isSubscribed ? (<h1 className="text-3xl font-bold">
        Please use menu to navigate our services.
      </h1>
      ) : (<PricingSection />)}
    </>
  )
}

export default HomeSection