"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskStore } from "@/store/useTaskStore"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock } from "lucide-react"
import moment from "moment"

const priorityColors: Record<string, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
}

const RecentPage = () => {
  const { tasks } = useTaskStore()
  const router = useRouter()

  // Sort tasks by most recent first
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-900 transition-all"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Dashboard
      </motion.button>

      {/* Page Header */}
      <h2 className="text-4xl font-bold tracking-tight text-gray-800 text-center">🕒 Recent Tasks</h2>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <Card className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
                  <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p className="text-sm">{task.description || "No description provided."}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {moment(task.createdAt).fromNow()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No recent tasks found.</p>
        )}
      </div>

    </div>
  )
}

export default RecentPage
