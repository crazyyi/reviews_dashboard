"use client"

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { passkey, signIn, useSession } from "@/lib/auth-client";
import { AlertCircle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsAlertPopped, setIsEnterPasswordOpen } from "@/redux/profileSlice";
import { revalidateComponent } from "@/app/actions/revalidateComponent";

const VerifyUser = () => {
  const dispatch = useDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const { data } = useSession()
  const user = data?.user

  useEffect(() => {
    if (user) {
      setEmail(user.email)
    }
  }, [user])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    if (user) {
      const session = await signIn.email({
        email: email,
        password: password,
      });
      const res = await passkey.addPasskey()
      if (res?.error) {
        console.log(res.error);
        toast.error(res.error.message);
      } else {
        console.log("Registered a new passkey - ", res?.data);
        toast(`Registered a new passkey for ${email}`)
        dispatch(setIsAlertPopped(true))
        dispatch(setIsEnterPasswordOpen(false))
        await revalidateComponent()
        router.push("/profile")
      }
    }

    setIsSubmitting(false);
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Card className="w-[350px]">
          <CardHeader>
            {email && <CardTitle>Verify user {email}</CardTitle>}
            <CardDescription>
              Enter your password to verify before registering a passkey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Enter your password</Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify user"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}

export default VerifyUser