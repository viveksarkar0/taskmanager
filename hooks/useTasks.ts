import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTaskStore } from "@/store/useTaskStore" // ✅ Ensure correct import
import type { Task } from "@/types"

const useTasks = () => {
  const queryClient = useQueryClient()
  const { addTask, updateTask, deleteTask } = useTaskStore()

  // ✅ Create Task Mutation
  const createTaskMutation = useMutation<
    Task, // ✅ Response type
    Error, // ✅ Error type
    Omit<Task, "id" | "createdAt" | "updatedAt">, // ✅ Input type
    { previousTasks?: Task[] } // ✅ Context type
  >({
    mutationFn: async (newTask: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
      if (!response.ok) throw new Error("Failed to create task")
      return response.json()
    },
      onMutate: async (newTask: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
        await queryClient.cancelQueries({ queryKey: ["tasks"] })
        const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []

        const optimisticTask: Task = { ...newTask, id: Date.now(), createdAt: new Date().toISOString() }
        addTask(optimisticTask)

        queryClient.setQueryData(["tasks"], [...previousTasks, optimisticTask])
        return { previousTasks }
      },
      onError: (_error: any, _newTask: any, context?: { previousTasks?: Task[] }) => {
        if (context?.previousTasks) queryClient.setQueryData(["tasks"], context.previousTasks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] })
      },
    }
  )

  // ✅ Update Task Mutation
  const updateTaskMutation = useMutation<
    Task, // ✅ Response type
    Error, // ✅ Error type
    Partial<Task> & { id: number }, // ✅ Input type
    { previousTasks?: Task[] } // ✅ Context type
  >({
    mutationFn: async ({ id, ...updates }: Partial<Task> & { id: number }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update task")
      return response.json()
    },
    onMutate: async (updatedTask: Partial<Task>) => {
        await queryClient.cancelQueries({ queryKey: ["tasks"] })
        const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []

        if (updatedTask.id !== undefined) {
          updateTask(updatedTask.id, updatedTask)
        }

        queryClient.setQueryData(
          ["tasks"],
          previousTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() } : task
          )
        )

        return { previousTasks }
      },
      onError: (_error: any, _updatedTask: any, context?: { previousTasks?: Task[] }) => {
        if (context?.previousTasks) queryClient.setQueryData(["tasks"], context.previousTasks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] })
      },
    }
  )

  // ✅ Delete Task Mutation
  const deleteTaskMutation = useMutation<
    void, // ✅ Response type
    Error, // ✅ Error type
    number, // ✅ Input type (task ID)
    { previousTasks?: Task[] } // ✅ Context type
  >({
    mutationFn: async (taskId: number) => {
      const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete task")
    },
    onMutate: async (taskId: number) => {
        await queryClient.cancelQueries({ queryKey: ["tasks"] })
        const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []

        deleteTask(taskId)

        queryClient.setQueryData(["tasks"], previousTasks.filter((task) => task.id !== taskId))
        return { previousTasks }
      },
      onError: (_error: any, _taskId: any, context?: { previousTasks?: Task[] }) => {
        if (context?.previousTasks) queryClient.setQueryData(["tasks"], context.previousTasks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] })
      },
    }
  )

  return {
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  }
}

export default useTasks
