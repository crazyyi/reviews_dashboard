import ResetPassword from "@/app/(auth)/reset-password/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const Profile = () => {
  return (
    <div className="flex items-center justify-center border w-[10em] p-3 mx-auto hover:bg-stone-100">
      <Dialog>
        <DialogTrigger>
          Reset Password
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
          </DialogHeader>
          <div>
            <ResetPassword />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Profile