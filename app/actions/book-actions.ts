"use server"

import { db } from "@/db/postgres";
import { books, chapters } from "@/db/schema";
import { Book, Chapter } from "@/lib/types";
import { eq } from "drizzle-orm";

/**
 * These functions handle CRUD operations for books in a TypeScript application using async/await and
 * error handling.
 * @returns For the `getBooks` function, it returns either all books as an array of Book objects or
 * `null` if no books are found.
 */
export async function getBooks() {
  try {
    const allBooks = (await db
      .select()
      .from(books)
      .then((res) => res)) as Book;
    return allBooks || null;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw new Error("Failed to fetch books.");
  }
}

export async function getBook(bookId: string) {
  try {
    const book = (await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .then((res) => res[0])) as Book;
    return book || null;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    throw new Error("Failed to fetch book.");
  }
}

export async function createBook(newBook: Book) {
  try {
    await db.insert(books).values(newBook);
  } catch (error) {
    console.error("Failed to create book:", error);
    throw new Error("Failed to create book.");
  }
}

export async function patchBook(
  bookId: string,
  updateData: Partial<Book>
): Promise<void> {
  try {
    await db.update(books).set(updateData).where(eq(books.id, bookId));
  } catch (error) {
    console.error("Failed to update book:", error);
    throw new Error("Failed to update book.");
  }
}

export async function deleteBook(bookId: string): Promise<void> {
  try {
    await db.delete(books).where(eq(books.id, bookId));
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw new Error("Failed to delete book.");
  }
}

/**
 * These functions handle CRUD operations for chapters in a TypeScript application using async/await
 * and error handling.
 * @param {string} chapterId - The `chapterId` parameter is a string that represents the unique
 * identifier of a chapter in the database. It is used to identify a specific chapter when performing
 * operations like fetching, updating, or deleting chapters.
 * @returns The `getChapter` function returns a `Chapter` object if found, or `null` if not found. The
 * `postChapter`, `patchChapter`, and `deleteChapter` functions return `void`, indicating that they do
 * not return any specific value upon successful execution.
 */
export async function getChapter(chapterId: string): Promise<Chapter | null> {
  try {
    const chapter = (await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, chapterId))
      .then((res) => res[0])) as Chapter;
    return chapter || null;
  } catch (error) {
    console.error("Failed to fetch chapter:", error);
    throw new Error("Failed to fetch chapter.");
  }
}

export async function postChapter(newChapter: Chapter): Promise<void> {
  try {
    await db.insert(chapters).values(newChapter);
  } catch (error) {
    console.error("Failed to create chapter:", error);
    throw new Error("Failed to create chapter.");
  }
}

export async function patchChapter(
  chapterId: string,
  updateData: Partial<Chapter>
): Promise<void> {
  try {
    await db.update(chapters).set(updateData).where(eq(chapters.id, chapterId));
  } catch (error) {
    console.error("Failed to update chapter:", error);
    throw new Error("Failed to update chapter.");
  }
}

export async function deleteChapter(chapterId: string): Promise<void> {
  try {
    await db.delete(chapters).where(eq(chapters.id, chapterId));
  } catch (error) {
    console.error("Failed to delete chapter:", error);
    throw new Error("Failed to delete chapter.");
  }
}
