"use client";

import { Task } from "@/types";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { cn } from "@/lib/utils";

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [taskDates, setTaskDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Extract all unique task due dates
    setTaskDates(
      new Set(
        tasks
          .filter((task) => task.dueDate)
          .map((task) => task.dueDate ? formatDate(new Date(task.dueDate)) : "")
      )
    );
  }, [tasks]);

  // Format date to match task dueDate (YYYY-MM-DD)
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Get tasks for selected date
  const tasksForSelectedDate = tasks.filter(
    (task) => task.dueDate && formatDate(new Date(task.dueDate)) === formatDate(selectedDate || new Date())
  );

  // Function to highlight dates that have tasks
  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = formatDate(date);
    return taskDates.has(formattedDate) ? "highlight-task-day" : "";
  };

  // Function to add task indicator dots below dates
  const tileContent = ({ date }: { date: Date }) => {
    const formattedDate = formatDate(date);
    const hasTasks = taskDates.has(formattedDate);

    return hasTasks ? (
      <div className="flex justify-center mt-1">
        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
      </div>
    ) : null;
  };

  return (
    <div className="p-4 bg-white rounded-md ">
      <h2 className="text-lg font-semibold mb-3">Task Calendar</h2>

      {/* Calendar View */}
      <Calendar
        onClickDay={setSelectedDate}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      {/* Tasks for Selected Date */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Tasks for {formatDate(selectedDate)}</h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul className="space-y-2">
              {tasksForSelectedDate.map((task) => (
                <li key={task.id} className="p-2 bg-gray-100 rounded-md shadow-sm border-l-4 border-yellow-500">
                  <span className="font-medium">{task.title}</span>
                  {task.priority && (
                    <span className={cn(
                      "ml-2 px-2 py-1 text-xs rounded-full",
                      task.priority === "high" ? "bg-red-200 text-red-700" :
                      task.priority === "medium" ? "bg-yellow-200 text-yellow-700" :
                      "bg-green-200 text-green-700"
                    )}>
                      {task.priority}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tasks for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;
