import { create } from "zustand"
import type { Task } from "@/types"

interface TaskStore {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateTask: (id: number, task: Partial<Task>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  toggleFavorite: (id: number) => Promise<void>
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch("/api/tasks")
      if (!response.ok) throw new Error("Failed to fetch tasks")
      const tasks = await response.json()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  addTask: async (newTask) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
      if (!response.ok) throw new Error("Failed to add task")
      const task = await response.json()
      set((state) => ({ tasks: [...state.tasks, task], isLoading: false }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updateTask: async (id, updatedTask) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      })
      if (!response.ok) throw new Error("Failed to update task")
      const task = await response.json()
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? task : t)),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete task")
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  toggleFavorite: async (id) => {
    const task = get().tasks.find((t) => t.id === id)
    if (task) {
      await get().updateTask(id, { favorite: !task.favorite })
    }
  },
}))
