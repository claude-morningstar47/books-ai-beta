import { NextResponse } from 'next/server'
import { ebooks, chapters } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/db/postgres'
import { Chapter } from '@/lib/types'

export async function POST(request: Request) {
  const { title, chapters: chapterData } = await request.json()

  try {
    // Start a transaction
    await db.transaction(async (tx) => {
      // Insert or update the ebook
      const [ebook] = await tx
        .insert(ebooks)
        .values({ title })
        .onConflictDoUpdate({ target: ebooks.title, set: { title } })
        .returning()

      // Delete existing chapters
      await tx.delete(chapters).where(eq(chapters.ebookId, ebook.id))

      // Insert new chapters
      await tx.insert(chapters).values(
        chapterData.map((chapter: Chapter, index: number) => ({
          ebookId: ebook.id,
          title: chapter.title,
          content: chapter.content,
          orderIndex: index + 1,
        }))
      )
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving ebook:', error)
    return NextResponse.json({ success: false, error:  'Failed to save ebook' }, { status: 500 })
  }
}