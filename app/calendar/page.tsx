"use client"

import React, { useState } from "react"
import TaskCalendar from "@/components/TaskCalender"
import { useTaskStore } from "@/store/useTaskStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

const CalendarPage = () => {
  const { tasks } = useTaskStore()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [priorityFilter, setPriorityFilter] = useState("all")
  const router = useRouter()

  // Format date for comparison (YYYY-MM-DD)
  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  // Filter tasks based on selected date and priority
  const tasksForSelectedDate = tasks.filter(
    (task) =>
      task.dueDate &&
      formatDate(new Date(task.dueDate)) === formatDate(selectedDate || new Date()) &&
      (priorityFilter === "all" || task.priority === priorityFilter)
  )

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-4xl font-bold tracking-tight text-indigo-700">📅 Task Calendar</h2>
        
        {/* Priority Filter */}
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[200px] border-2 border-indigo-500 rounded-lg shadow-lg bg-white text-indigo-700">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent className="bg-white border-indigo-500 shadow-lg">
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low" className="text-green-600">Low</SelectItem>
            <SelectItem value="medium" className="text-yellow-600">Medium</SelectItem>
            <SelectItem value="high" className="text-red-600">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar & Task Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Component */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg"
        >
          <TaskCalendar tasks={tasks} />
        </motion.div>

        {/* Task List Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg"
        >
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">📝 Tasks for {selectedDate ? formatDate(selectedDate) : "Today"}</h3>
          
          {tasksForSelectedDate.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {tasksForSelectedDate.map((task) => (
                <motion.li
                  key={task.id}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border border-gray-200 rounded-lg flex flex-col bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-medium text-lg">{task.title}</span>
                  <span className={`text-sm px-2 py-1 mt-1 rounded-md w-max ${
                    task.priority === "high" ? "bg-red-100 text-red-600" :
                    task.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    {task.priority.toUpperCase()} Priority
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4 text-center">No tasks scheduled for this day. 🎉</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CalendarPage
