"use client"

import { useState, useEffect } from "react"
import { StatsCards } from "@/components/stats-cards"
import { TaskCard } from "@/components/task-card"
import { useTaskStore } from "@/store/useTaskStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { TaskDialog } from "@/components/task-dailog"
import { TaskGauge } from "@/components/task-gauage"
import TaskCalendar from "@/components/TaskCalender"

export default function DashboardPage() {
  const [priorityFilter, setPriorityFilter] = useState("all")
  const { data: session, status } = useSession()
  const router = useRouter()
  const { tasks, isLoading, error, fetchTasks, addTask, updateTask, deleteTask, toggleFavorite } = useTaskStore()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else if (status === "authenticated") {
      fetchTasks()
    }
  }, [status, router, fetchTasks])

  const filteredTasks = tasks.filter((task) => priorityFilter === "all" || task.priority === priorityFilter)

  if (isLoading) return <div className="text-center py-10 text-lg font-medium">Loading...</div>
  if (error) return <div className="text-red-500 text-center py-10 font-semibold">Error: {error}</div>

  return (
    <div className="space-y-8 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">All Tasks</h2>
        <div className="flex items-center gap-4">
          {/* Priority Filter Dropdown */}
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px] border border-gray-300 shadow-sm rounded-md">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          {/* Add Task Button */}
          <TaskDialog
            onSubmit={(data) =>
              addTask({
                ...data,
                description: data.description || "", // Ensure description is a string
              })
            }
          />
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards tasks={tasks} />

      {/* Task Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={{ ...task, status: task.status || "todo" }}
            onEdit={(updatedTask) => updateTask(task.id, { ...updatedTask, status: updatedTask.status || "todo" })}
            onDelete={() => deleteTask(task.id)}
          />
        ))}

        {/* Add New Task Card */}
        <TaskDialog
          onSubmit={(data) =>
            addTask({
              ...data,
              status: data.status || "todo",
              description: data.description || "",
              favorite: data.favorite ?? false, // Ensure favorite is boolean
            })
          }
          trigger={
            <div className="rounded-lg border border-dashed p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 text-gray-500">
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-sm font-medium">Add New Task</span>
            </div>
          }
        />
      </div>

      {/* Dashboard Widgets - Gauge & Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Gauge */}
        <div className=" bg-white p-6 rounded-lg shadow-md">
          <TaskGauge tasks={tasks} />
        </div>

        {/* Task Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskCalendar tasks={tasks} />
        </div>
      </div>
    </div>
  )
}
