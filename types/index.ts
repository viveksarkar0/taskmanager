export interface Task {
    id: number
    title: string
    description: string
    status: "todo" | "in_progress" | "done"
    priority: "low" | "medium" | "high"
    createdAt: string
    updatedAt?: string
    dueDate?: string
    userId?: number
    projectId?: number
    categoryId?: number
    favorite: boolean
  }
  
  export interface User {
    id: number
    name: string
    email: string
    image?: string
  }
  
  