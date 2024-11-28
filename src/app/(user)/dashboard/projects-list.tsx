import type { Project } from "@/types"
import ProjectCard from "@/components/ProjectCard"

type Props = {
  projects: Project[],
  isSubscribed: boolean | null | undefined
}

const ProjectsList = (props: Props) => {
  const { isSubscribed, projects } = props
  console.log("isSubscribed: ", isSubscribed)
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
        {projects.map((project: Project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
        {!isSubscribed && <ProjectCard />}
      </ul>
    </div>
  )
}

export default ProjectsList

