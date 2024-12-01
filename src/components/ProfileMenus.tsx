"use client"

import ResetPassword from "@/app/(auth)/reset-password/page"
import VerifyUser from "@/app/(auth)/verify-user/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { setIsAlertPopped, setIsEnterPasswordOpen } from "@/redux/profileSlice"
import { cn } from "@/lib/utils"

const ProfileMenus = ({ className }: { className: string }) => {
  const isAlertPopped = useSelector((state: RootState) => state.profile.isAlertPopped)
  const isEnterPasswordOpen = useSelector((state: RootState) => state.profile.isEnterPasswordOpen)
  const dispatch = useDispatch()

  async function handleOpenAlert() {
    dispatch(setIsAlertPopped(false))
  }

  async function handleAddPasskey() {
    dispatch(setIsEnterPasswordOpen(!isEnterPasswordOpen))
  }

  return (
    <div className={cn("container", className)}>
      <AlertDialog open={isAlertPopped} onOpenChange={handleOpenAlert}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-extrabold text-2xl text-center">Info</AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-lg">
              You have just added a passkey
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex mx-auto">
            <AlertDialogAction className="w-24">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="border-b py-6">Reset Password</Button>
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
      <div>
        <Dialog open={isEnterPasswordOpen} onOpenChange={handleAddPasskey}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Please enter your password</DialogTitle>
            </DialogHeader>
            <div>
              <VerifyUser />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Button variant="link" className="py-6" onClick={handleAddPasskey}>Create a passkey</Button>
    </div >
  )
}

export default ProfileMenus