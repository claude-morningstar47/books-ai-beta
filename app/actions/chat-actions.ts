/**
 * These functions handle CRUD operations for a chat entity in a TypeScript application using a
 * PostgreSQL database.
 * @param {string} chatId - The `chatId` parameter is a string that represents the unique identifier of
 * a chat. It is used to identify a specific chat in the database operations such as fetching,
 * updating, or deleting a chat.
 * @returns The `getChat` function returns a Promise that resolves to either a `Chat` object if found
 * based on the provided `chatId`, or `null` if no chat is found.
 */
"use server";

import { eq } from "drizzle-orm";
import { chats } from "@/db/schema";
import { Chat } from "@/lib/types";
import { db } from "@/db/postgres";

export async function getChat(chatId: string): Promise<Chat | null> {
  try {
    const chat = (await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .then((res) => res[0])) as Chat;
    return chat || null;
  } catch (error) {
    console.error("Failed to fetch chat:", error);
    throw new Error("Failed to fetch chat.");
  }
}

export async function postChat(newChat: Chat): Promise<void> {
  try {
    await db.insert(chats).values(newChat);
  } catch (error) {
    console.error("Failed to create chat:", error);
    throw new Error("Failed to create chat.");
  }
}

export async function patchChat(
  chatId: string,
  updateData: Partial<Chat>
): Promise<void> {
  try {
    await db.update(chats).set(updateData).where(eq(chats.id, chatId));
  } catch (error) {
    console.error("Failed to update chat:", error);
    throw new Error("Failed to update chat.");
  }
}

export async function deleteChat(chatId: string): Promise<void> {
  try {
    await db.delete(chats).where(eq(chats.id, chatId));
  } catch (error) {
    console.error("Failed to delete chat:", error);
    throw new Error("Failed to delete chat.");
  }
}
