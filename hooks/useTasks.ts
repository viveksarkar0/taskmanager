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
  >(
    async (newTask) => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
      if (!response.ok) throw new Error("Failed to create task")
      return response.json()
    },
    {
      onMutate: async (newTask) => {
        await queryClient.cancelQueries({ queryKey: ["tasks"] })
        const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []

        const optimisticTask: Task = { ...newTask, id: Date.now(), createdAt: new Date().toISOString() }
        addTask(optimisticTask)

        queryClient.setQueryData(["tasks"], [...previousTasks, optimisticTask])
        return { previousTasks }
      },
      onError: (_error, _newTask, context) => {
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
  >(
    async ({ id, ...updates }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update task")
      return response.json()
    },
    {
      onMutate: async (updatedTask) => {
        await queryClient.cancelQueries({ queryKey: ["tasks"] })
        const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []

        updateTask(updatedTask.id, updatedTask)

        queryClient.setQueryData(
          ["tasks"],
          previousTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() } : task
          )
        )

        return { previousTasks }
      },
      onError: (_error, _updatedTask, context) => {
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
  >(
    async (taskId) => {
      const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete task")
    },
    {
      onMutate: async (taskId) => {
        await queryClient.cancelQueries({ queryKey: ["tasks"] })
        const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]) || []

        deleteTask(taskId)

        queryClient.setQueryData(["tasks"], previousTasks.filter((task) => task.id !== taskId))
        return { previousTasks }
      },
      onError: (_error, _taskId, context) => {
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
