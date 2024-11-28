
"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const ManageSubscription = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<string | null>()

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await res.json()

      console.log("result = ", result)
      if (result.session) {
        router.push(result.session.url)
      } else {
        console.log(result.message)
        toast.error(result.message)
      }
    } catch (error) {
      let err
      if (error instanceof Error) {
        err = error.message
      } else {
        err = "An unknown error occurred";
      }
      setError(err)
      toast(err)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Button onClick={redirectToCustomerPortal} className="bg-indigo-700" disabled={loading}>
      {loading ? <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</> : "Modify Your Subscription"}
    </Button>
  )
}

export default ManageSubscription