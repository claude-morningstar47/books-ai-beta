"use server";

import { db } from "@/db/postgres";
import { books, chapters } from "@/db/schema";
import { Book, Chapter } from "@/lib/types";
import { eq } from "drizzle-orm";

// Fonction pour créer un chapitre
export const createChapter = async (
  chapterData: Chapter,
  bookId: number
): Promise<Chapter> => {
  // Insérer le chapitre dans la base de données
  const newChapter = await db
    .insert(chapters)
    .values({
      title: chapterData.title,
      content: chapterData.content,
      order: chapterData.order,
      bookId,
    })
    .returning();

  if (!newChapter || newChapter.length === 0) {
    throw new Error("Erreur lors de la création du chapitre");
  }

  return {
    id: newChapter[0].id,
    title: newChapter[0].title as string,
    content: newChapter[0].content as string,
    order: newChapter[0].order as number,
  }; // Retourne le chapitre créé
};

// Fonction pour créer un livre avec des chapitres
export async function createBook(bookData: Book) {
  // Insérer le livre dans la base de données

  const newBook = await db.insert(books).values(bookData).returning();

  return newBook[0];
}

// Fonction pour récupérer tous les livres
export const getBooks = async () => {
  try {
    const booksList = (await db
      .select()
      .from(books)
      .then((response) => response)) as Book;

    return booksList;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw new Error("Failed to fetch books.");
  }
};

// Fonction pour récupérer un livre par son ID
export const getBookById = async (id: number) => {
  try {
    const book = (await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .then((response) => response[0])) as Book;

    return book;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    throw new Error("Failed to fetch book.");
  }
};


export async function updateBookById(
  bookId: number,
  updateData: Book
): Promise<void> {
  try {
    await db.update(books).set({...updateData, updatedAt: new Date()}).where(eq(books.id, bookId));
  } catch (error) {
    console.error("Failed to update book:", error);
    throw new Error("Failed to update book.");
  }
}

export async function deleteBookById(bookId:number) {

  try {
    const deleteBook = await db.delete(books).where(eq(books.id, bookId))
    return deleteBook
  } catch (error) {
    console.error('Error del book',error);
    
  }
  
}
// Fonction pour récupérer un chapitre par son ID
export const getChapter = async (id: number) => {
  try {
    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.bookId, id))
      .then((response) => response[0]);
    return chapter;
  } catch (error) {
    console.error("Failed to fetch chapter:", error);
    throw new Error("Failed to fetch chapter.");
  }
};
