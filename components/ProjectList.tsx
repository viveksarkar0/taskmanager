import type React from "react"
import type { Project } from "@/types"

interface ProjectListProps {
  projects: Project[]
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <ul className="space-y-2">
      {projects.map((project) => (
        <li key={project.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList

