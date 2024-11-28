import NewProjBtn from "@/components/NewProjBtn"
import { auth } from "@/lib/auth"
import { getUserProjects } from "@/lib/db/queries"
import { headers } from "next/headers"
import ProjectsList from "./projects-list"
import type { Project } from "@/types"
import { getSubscription } from "@/app/actions/userSubscriptions"

const Dashboard = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  const projects: Project[] = []

  let isSubscribed

  if (data) {
    const { user } = data
    console.log("User id = ", user.id)
    isSubscribed = await getSubscription({
      userId: user.id
    })
    const userProjects = await getUserProjects(user.id)
    projects.push(...userProjects)
  }

  const enableProjectButton = !!isSubscribed

  return <div>
    {!data?.session ?
      <div className="text-center w-full">{`You are seeing this page because you haven't signed in.`}</div> :
      <div>
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-center my-4">Your Projects</h1>
          <NewProjBtn enableProjectButton={enableProjectButton} />
        </div>
        <ProjectsList projects={projects} isSubscribed={isSubscribed} />
      </div>}
  </div>
}

export default Dashboard