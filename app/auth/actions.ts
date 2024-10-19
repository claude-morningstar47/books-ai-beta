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
import { ResultCode } from "@/lib/utils";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";

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
  name: z.string().min(1, "Username  name is required"),
  email: z.string().email("Invalid email format"),
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

// Fonction pour hacher le mot de passe avec bcrypt
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Nombre de tours de salage
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword; // Retourne simplement le mot de passe haché
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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const parsedCredentials = signupSchema.safeParse({
      name,
      email,
      password,
    });

    if (parsedCredentials.success) {
      const hashedPassword = await hashPassword(password);
      const result = await createUser(name, email, hashedPassword);

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
