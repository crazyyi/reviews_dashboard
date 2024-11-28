import CustomLink from "@/components/CustomLink"
import ItemListTable from "@/components/ItemListTable"
import { db } from "@/db"
import { projects as dbProjects } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Globe, ChevronLeft } from "lucide-react"
import Link from "next/link"

const Page = async ({ params }: {
  params: {
    projectId: string
  }
}) => {
  const { projectId } = await params

  if (!projectId) return (
    <div>Invalid Project ID</div>
  )

  const projects = await db.query.projects.findMany({
    where: (eq(dbProjects.id, projectId)),
    with: {
      feedbacks: true
    }
  })

  const project = projects[0]

  return (
    <div className="">
      <div className="mb-3">
        <Link
          href={"/dashboard"}
          className="flex justify-start items-center hover:text-blue-600"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to projects
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="proj-info">
          <h1 className="text-3xl font-bold my-4">{project.name}</h1>
          <h2 className="text-primary-background text-xl mb-2">
            {project.description}
          </h2>
        </div>
        <div className="flex space-x-4">
          {project.url ? (
            <CustomLink url={project.url}>
              <Globe className="h-5 w-5 mr-2" />
              <span className="w-full text-lg">Visit site</span>
            </CustomLink>
          ) : null}
          <CustomLink url={`/projects/${projectId}/instructions`}>
            Embed Code
          </CustomLink>
        </div>
      </div>
      <div>
        <ItemListTable data={project.feedbacks} />
      </div>
    </div>
  );

}

export default Page