"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function SubmitButton({ loading }: { loading: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button className="justify-self-end" type="submit">
      {pending || loading ?
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...
        </> :
        "Create Project"}
    </Button>
  )
}