import { NextResponse } from "next/server"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const taskUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
  dueDate: z.string().optional(),
})

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context // Extract params from context

  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = taskUpdateSchema.parse(body)
    const userId = Number(session.user.id)
    const taskId = Number.parseInt(params.id)

    const [updatedTask] = await db
      .update(tasks)
      .set({
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : undefined,
      })
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning()

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTask)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = context // Extract params from context

  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = Number(session.user.id)
  const taskId = Number.parseInt(params.id)

  const [deletedTask] = await db
    .delete(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
    .returning()

  if (!deletedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Task deleted successfully" })
}
