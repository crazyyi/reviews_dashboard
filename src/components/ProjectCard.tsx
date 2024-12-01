import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import type { Project } from "@/types"
import { Lock } from "lucide-react"
import SubcribeBtn from "./SubcribeBtn"
import { paymentPlans } from "@/lib/payments/payments"

const ProjectCard = ({ project }: { project?: Project }) => {
  return (
    <Card className={`max-w-[350px] flex flex-col h-full ${!project && "bg-neutral-300"}`}>
      <CardHeader className="flex-1">
        <CardTitle>{
          project ?
            project.name :
            <>
              <Lock className="h-6 w-6 mr-2" />Upgrade to Premium
            </>
        }</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardFooter>
        {project ?
          <Link href={`/projects/${project.id}`}>
            <Button>View Project</Button>
          </Link> : <SubcribeBtn price={paymentPlans.MonthlyPlan} />}
      </CardFooter>
    </Card>
  )
}

export default ProjectCard