import type React from "react"
import type { Task } from "@/types"
import useTasks from "@/hooks/useTasks"

interface TaskListProps {
  tasks: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { deleteTask } = useTasks()

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="bg-white dark:bg-dark-light p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{task.title}</h3>
            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
              Delete
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }
}

export default TaskList

