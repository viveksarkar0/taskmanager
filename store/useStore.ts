import create from "zustand"
import type { Task, Project } from "@/types"

interface Store {
  tasks: Task[]
  projects: Project[]
  setTasks: (tasks: Task[]) => void
  setProjects: (projects: Project[]) => void
  addTask: (task: Task) => void
  updateTask: (taskId: number, updates: Partial<Task>) => void
  deleteTask: (taskId: number) => void
  addProject: (project: Project) => void
  updateProject: (projectId: number, updates: Partial<Project>) => void
  deleteProject: (projectId: number) => void
}

const useStore = create<Store>((set) => ({
  tasks: [],
  projects: [],
  setTasks: (tasks) => set({ tasks }),
  setProjects: (projects) => set({ projects }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((project) => (project.id === projectId ? { ...project, ...updates } : project)),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
}))

export default useStore

