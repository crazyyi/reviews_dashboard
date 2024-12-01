"use client";

import SignIn from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/lib/auth-client";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setIsOpen } from "@/redux/signInSlice";
import { useRouter } from "next/navigation";

export default function Page() {
  const isOpen = useSelector((state: RootState) => state.signIn.isOpen)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleDialogClose = () => {
    dispatch(setIsOpen(false))
    router.push("/")
  }

  useEffect(() => {
    client.oneTap();
    dispatch(setIsOpen(true))
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <div>
          <Dialog open={isOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Sign In to access full services</DialogTitle>
              </DialogHeader>
              <Tabs>
                <TabsList className="w-full h-10 flex justify-evenly">
                  <TabsTrigger value="signIn" className="h-full w-1/2 text-base font-semibold">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signUp" className="h-full w-1/2 text-base font-semibold ">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signIn" className="w-full mt-1"><SignIn /></TabsContent>
                <TabsContent value="signUp" className="w-full mt-1"><SignUp /></TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
