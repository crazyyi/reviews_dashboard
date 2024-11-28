"use client"

import MenuItem from "@/components/nav/MenuItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import SignInButton from "../SignInButton";
import type { Session } from "@/lib/auth-types";
import { useDispatch } from "react-redux";
import { toggleOpen } from "@/redux/signInSlice";

const menuItems = [
  {
    label: "Home",
    redirect_url: "/"
  },
  {
    label: "Profile",
    redirect_url: "/profile"
  },
  {
    label: "Dashboard",
    redirect_url: "/dashboard"
  },
  {
    label: "Subscriptions",
    redirect_url: "/payments"
  },
]

interface UserMenuProps {
  data?: Session | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  data
}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const currentUser = data?.user

  const toggleMenuOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
      buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleMenuClick = (url: string) => () => {
    setIsOpen(false)
    router.push(url)
  }

  const handleSignIn = () => {
    setIsOpen(false)
    dispatch(toggleOpen())
    router.push("/sign-in")
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div onClick={toggleMenuOpen} ref={buttonRef}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-md cursor-pointer hover:shadow-md transition">
          <Menu />
        </div>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute rounded-md shadow-md w-[40vw] md:w-[12em] bg-white overflow-hidden right-0 top-10 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  className="px-4 py-3"
                  onClick={() => { }}
                  label={currentUser.name as string} />
                {menuItems.map((menu, index) => (
                  <MenuItem key={index} className="px-4 py-3" onClick={handleMenuClick(menu.redirect_url)} label={menu.label} />
                ))}
                <hr />
                <MenuItem className="px-4 py-3">
                  <SignInButton />
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  className="px-4 py-3"
                  onClick={handleSignIn}>
                  Sign In
                </MenuItem>
                <MenuItem
                  className="px-4 py-3"
                  onClick={handleSignIn}
                >
                  Sign Up
                </MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;