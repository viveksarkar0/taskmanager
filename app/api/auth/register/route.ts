import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs" // ✅ Use bcryptjs
import { z } from "zod"
import { eq } from "drizzle-orm" // ✅ Import eq for queries

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Received request:", body)

    const { name, email, password } = registerSchema.parse(body)
    console.log("Parsed request:", { name, email })

    // ✅ Check if the user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0])

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    console.log("Hashing password...")
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log("Inserting user into DB...")
    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id, name: users.name, email: users.email })

    console.log("User registered successfully:", user)

    return NextResponse.json({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors)
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Internal Server Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
