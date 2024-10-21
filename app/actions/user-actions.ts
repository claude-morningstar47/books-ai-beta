"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/postgres";
import { users } from "@/db/schema";
import { User } from "@/lib/types";
import { ResultCode } from "@/lib/utils";

/**
 * These functions handle user operations such as fetching, creating, updating, and deleting users in a
 * database.
 * @param {string} email - The `email` parameter is a string representing the email address of a user.
 * @returns In the provided code snippets:
 */
export async function getUser(email: string) {
  try {
    const user = (await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0])) as User;
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string,
) {
  const existingUser = await getUser(email);

  if (existingUser) {
    return {
      type: "error",
      resultCode: ResultCode.UserAlreadyExists,
    };
  } else {
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: hashedPassword,
    };

    await db.insert(users).values(user);

    return {
      type: "success",
      resultCode: ResultCode.UserCreated,
    };
  }
}

export async function patchUser(
  userId: string,
  updateData: Partial<Omit<User, "created_at" | "updated_at">>
): Promise<void> {
  try {
    await db.update(users).set(updateData).where(eq(users.id, userId));
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Failed to update user.");
  }
}

export async function deleteUser(userId: string): Promise<void> {
  try {
    await db.delete(users).where(eq(users.id, userId));
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user.");
  }
}
