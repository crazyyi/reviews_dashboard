"use client"

import { PricingPlan } from "@/app/pricing-section"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function PricingCard({ title, price, description, features, isPopular, url }: PricingPlan) {
  const router = useRouter()

  const onClick = () => {
    router.push(url)
  }

  return (
    <Card className="max-w-[350px] flex flex-col h-full justify-between bg-white/20 rounded-lg hover:shadow-md border text-left relative">
      {
        isPopular && (
          <div className="absolute top-0 right-0 bg-gray-900 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">Popular</div>
        )
      }
      <CardHeader className="flex-1">
        <CardTitle>
          <div className="inline-flex items-end">
            <h1 className="font-extrabold text-3xl">${price}</h1>
          </div>
          <h2 className="font-bold text-xl my-2">{title}</h2>
        </CardTitle>
        <CardDescription><p>{description}</p></CardDescription>
      </CardHeader>
      <div className="flex-grow border-t border-gray-400 opacity-25 my-3"></div>
      <CardFooter className="flex flex-col items-start">
        {features.map((feature, index) => (
          <li key={index} className="flex flex-grow items-center text-gray-700 gap-2 my-2">
            <div className="rounded-full flex items-center justify-center bg-gray-900 w-4 h-4 mr-2">
              <Check className="text-white" width={10} height={10} />
            </div>
            <p>{feature}</p>
          </li>
        ))}
      </CardFooter>
      <div className="flex items-center justify-center m-3 rounded-md">
        <Button onClick={onClick} className="w-2/3 h-11 font-semibold">Select Plan</Button>
      </div>
    </Card>
  )
}