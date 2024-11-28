"use client"

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface MenuItemProps extends PropsWithChildren {
  className: string,
  onClick?: () => void;
  label?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  className,
  onClick,
  label,
  children,
  ...props
}) => {
  return (
    <div onClick={onClick} className={cn("hover:bg-neutral-100 transition font-semibold", className)} {...props}>
      {label ? label : children}
    </div>
  );
}

export default MenuItem;