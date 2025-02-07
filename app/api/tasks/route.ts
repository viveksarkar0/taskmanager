import { NextResponse } from "next/server"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in_progress", "done"]),
  dueDate: z.string().optional(),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = Number(session.user.id)
  const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId))
  return NextResponse.json(allTasks)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = taskSchema.parse(body)
    const userId = Number(session.user.id)

    const [newTask] = await db
      .insert(tasks)
      .values({
        ...validatedData,
        userId,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
      })
      .returning()

    return NextResponse.json(newTask)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

