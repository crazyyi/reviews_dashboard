import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import Link from "next/link";
import UserMenu from "./nav/UserMenu";

const PageHeader = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <header>
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto">
        <div className="flex h-14 items-center justify-between">
          <h1><Link href="/">LOGO</Link></h1>
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center items-center">
              <UserMenu data={data} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PageHeader