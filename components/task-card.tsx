"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Star, Pencil, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskCardProps {
  task: Task;
  onEdit?: (updatedTask: Task) => void;
  onDelete?: () => void;
  onToggleFavorite?: () => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleFavorite }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (task.createdAt) {
      setFormattedDate(format(new Date(task.createdAt), "MMM d"));
    }
  }, [task.createdAt]);

  const priorityColors = {
    low: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-100",
    medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100",
    high: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-100",
  };

  // Save changes and exit edit mode
  const handleSave = () => {
    onEdit?.(editedTask);
    setIsEditing(false);
  };

  // Discard changes and exit edit mode
  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex justify-between items-start">
        {isEditing ? (
          <Input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="font-semibold"
          />
        ) : (
          <h3 className="text-lg font-semibold">{task.title}</h3>
        )}

        <div className="flex gap-2">
         
          {isEditing ? (
            <>
              <Button variant="ghost" size="icon" onClick={handleSave}>
                <Save className="h-4 w-4 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={onDelete} className="hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="mt-2"
        />
      ) : (
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
      )}

      <div className="flex justify-between items-center mt-2">
        {isEditing ? (
          <Select
            value={editedTask.priority || "low"}
            onValueChange={(value: "low" | "medium" | "high") =>
              setEditedTask({ ...editedTask, priority: value })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              priorityColors[task.priority || "low"]
            )}
          >
            {task.priority || "Low"}
          </span>
        )}

        {isEditing ? (
          <Select
            value={editedTask.status || "todo"}
            onValueChange={(value: "todo" | "in_progress" | "done") =>
              setEditedTask({ ...editedTask, status: value })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To-Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span className="text-sm text-muted-foreground capitalize">{task.status || "To-Do"}</span>
        )}
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        {formattedDate || "No date"}
      </div>
    </div>
  );
}
