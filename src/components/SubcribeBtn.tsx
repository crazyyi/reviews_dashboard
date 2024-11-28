"use client"

import { Button } from "./ui/button"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getStripe } from "@/lib/payments/stripe-client";
import { toast } from "sonner";

const SubscribeBtn = ({ price }: { price: string }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    setLoading(true)
    const { sessionId } = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    }).then(res => res.json());

    const stripe = await getStripe();

    if (stripe) {
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error);
        let err
        if (result.error instanceof Error) {
          err = result.error.message
        } else {
          err = "An unknown error occurred";
        }
        setError(err)
        toast(err)
      }
    } else {
      setError("Stripe is not connected.")
    }

    setLoading(false)
  };

  if (error) {
    return <p>{error}</p>
  }


  return (
    <Button onClick={() => handleSubscribe(price)} disabled={loading}>
      {loading ?
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
        </> : "Subscribe"}
    </Button>
  )
}

export default SubscribeBtn