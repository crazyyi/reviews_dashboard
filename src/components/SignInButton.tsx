"use client"

import { useDispatch } from "react-redux"
import { setIsSignOut } from "@/redux/signInSlice"
import { signOut } from "@/lib/auth-client"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { revalidateComponent } from "@/app/actions/revalidateComponent"

const SignInButton = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    dispatch(setIsSignOut(false));
    await signOut({
      fetchOptions: {
        async onSuccess() {
          dispatch(setIsSignOut(true));
          await revalidateComponent()
          router.push("/dashboard");
        },
        onError(error) {
          toast(`[error]: ${error}`)
        }
      },
    });
  }

  return (
    <div className="flex items-center gap-2" onClick={handleSignOut}>
      <LogOut size={16} />
      Sign Out
    </div>
  )
}

export default SignInButton