import Link from "next/link";
import type { PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
  url: string;
}

export default function CustomLink({ url, children }: LinkProps) {

  return (
    <Link
      href={url}
      className="inline-flex items-center justify-center p-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      {children}
    </Link>
  )
}