/**
 * The above code contains TypeScript functions for user authentication, signup, password hashing,
 * error handling, and handling sign-in/sign-out actions.
 * @param {unknown} error - The `error` parameter in the functions `authenticate` and `signup` refers
 * to any error that may occur during the authentication or signup process. This error could be related
 * to validation errors, authentication errors, or any other unexpected issues that may arise during
 * the execution of these functions. The `handleAuth
 * @returns The functions `authenticate`, `signup`, `handleGithubSignin`, and `handleSignOut` are
 * returning a `Result` object or `undefined` wrapped in a Promise. The `Result` object has two
 * properties: `type` (string) and `resultCode` (ResultCode enum). The `ResultCode` enum is likely an
 * enumeration of different result codes for different outcomes of the authentication
 */
"use server";

import { createUser } from "@/app/actions/user-actions";
import { signIn, signOut } from "@/auth";
import { getStringFromBuffer, ResultCode } from "@/lib/utils";
import { AuthError } from "next-auth";
import { z } from "zod";

interface Result {
  type: string;
  resultCode: ResultCode;
}

// Schémas de validation Zod
const credentialsSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Fonction utilitaire pour gérer les erreurs d'authentification
function handleAuthError(error: unknown): Result {
  if (error instanceof AuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        return { type: "error", resultCode: ResultCode.InvalidCredentials };
      default:
        return { type: "error", resultCode: ResultCode.UnknownError };
    }
  }
  return { type: "error", resultCode: ResultCode.UnknownError };
}

// Fonction pour hacher le mot de passe
async function hashPassword(
  password: string
): Promise<{ hashedPassword: string; salt: string }> {
  const salt = crypto.randomUUID();
  const encoder = new TextEncoder();
  const saltedPassword = encoder.encode(password + salt);
  const hashedPasswordBuffer = await crypto.subtle.digest(
    "SHA-256",
    saltedPassword
  );
  const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);
  return { hashedPassword, salt };
}

// Authentification
export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const parsedCredentials = credentialsSchema.safeParse({ email, password });

    if (parsedCredentials.success) {
      await signIn("credentials", { email, password, redirect: false });
      return { type: "success", resultCode: ResultCode.UserLoggedIn };
    } else {
      return { type: "error", resultCode: ResultCode.InvalidCredentials };
    }
  } catch (error) {
    return handleAuthError(error);
  }
}

// Inscription
export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const first_name = formData.get("first-name") as string;
    const last_name = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const parsedCredentials = signupSchema.safeParse({
      first_name,
      last_name,
      email,
      password,
    });

    if (parsedCredentials.success) {
      const { hashedPassword, salt } = await hashPassword(password);
      const result = await createUser(
        first_name,
        last_name,
        email,
        hashedPassword,
        salt
      );

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn("credentials", { email, password, redirect: false });
      }

      return result;
    } else {
      return { type: "error", resultCode: ResultCode.InvalidCredentials };
    }
  } catch (error) {
    return handleAuthError(error);
  }
}

// Connexion via Github
export async function handleGithubSignin() {
  await signIn("github", { redirectTo: "/" });
}

// Déconnexion
export async function handleSignOut() {
  await signOut();
}
