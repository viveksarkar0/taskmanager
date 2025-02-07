import type React from "react"
import type { Task } from "@/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TaskStatisticsProps {
  tasks: Task[]
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks }) => {
  const priorityStats = {
    low: tasks.filter((task) => task.priority === "low").length,
    medium: tasks.filter((task) => task.priority === "medium").length,
    high: tasks.filter((task) => task.priority === "high").length,
  }

  const statusStats = {
    todo: tasks.filter((task) => task.status === "todo").length,
    in_progress: tasks.filter((task) => task.status === "in_progress").length,
    done: tasks.filter((task) => task.status === "done").length,
  }

  const priorityData = [
    { name: "Low", value: priorityStats.low },
    { name: "Medium", value: priorityStats.medium },
    { name: "High", value: priorityStats.high },
  ]

  const statusData = [
    { name: "To Do", value: statusStats.todo },
    { name: "In Progress", value: statusStats.in_progress },
    { name: "Done", value: statusStats.done },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Tasks by Priority</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Tasks by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TaskStatistics

