"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskGauge } from "@/components/task-gauage"
import { useTaskStore } from "@/store/useTaskStore"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts"

const AnalyticsPage = () => {
  const { tasks } = useTaskStore()
  const router = useRouter()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const pendingTasks = totalTasks - completedTasks

  // Priority Breakdown
  const priorityData = [
    { name: "Low", value: tasks.filter((task) => task.priority === "low").length },
    { name: "Medium", value: tasks.filter((task) => task.priority === "medium").length },
    { name: "High", value: tasks.filter((task) => task.priority === "high").length },
  ]

  const COLORS = ["#22c55e", "#facc15", "#ef4444"] // Green, Yellow, Red

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Dashboard
      </motion.button>

      {/* Page Header */}
      <h2 className="text-4xl font-bold tracking-tight text-indigo-700 text-center">📊 Task Analytics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Tasks */}
        <Card className="p-6 shadow-lg bg-white rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-indigo-700">📌 Total Tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-indigo-900">{totalTasks}</p>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="p-6 shadow-lg bg-white rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-600">✅ Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-green-700">{completedTasks}</p>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="p-6 shadow-lg bg-white rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-red-600">⏳ Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-red-700">{pendingTasks}</p>
          </CardContent>
        </Card>

      </div>

      {/* Completion Gauge */}
      <div className=" flex gap-1">
        

      <div className="">
        <TaskGauge tasks={tasks} />
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">⚡ Priority Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priorityData} layout="vertical">
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={30}>
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
