// app/api/books/route.ts
import { db } from "@/db/postgres"
import { booksai } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request, userId: string) {
  const { title, genre, language, description, coverImage } = await req.json()
  const newBook = await db.insert(booksai).values({
    title,
    genre,
    language,
    description,
    coverImage,
    userId,
  }).returning()

  return NextResponse.json(newBook)
}

export async function GET(userId: string) {
  const userBooks = await db.select().from(booksai).where(eq(booksai.userId, userId))
  return NextResponse.json(userBooks)
}