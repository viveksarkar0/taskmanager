import { create } from "zustand"
import type { Task } from "@/types"

interface Store {
  tasks: Task[],
  setTasks: (tasks: Task[]) => void

  addTask: (task: Task) => void
  updateTask: (taskId: number, updates: Partial<Task>) => void
  deleteTask: (taskId: number) => void
  


}

const useStore = create<Store>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),
 
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  
}))

export default useStore

