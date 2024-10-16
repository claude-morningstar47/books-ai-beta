"use server";

import { signIn, signOut } from "@/auth";
import { ResultCode } from "@/lib/utils";
import { AuthError } from "next-auth";
import { z } from "zod";

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const parsedCredentials = z
      .object({
        email: z.string().email({ message: "Invalid email format" }),
        password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters long" }),
      })
      .safeParse({
        email,
        password,
      });

    if (parsedCredentials.success) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return {
        type: "success",
        resultCode: ResultCode.UserLoggedIn,
      };
    } else {
      return {
        type: "error",
        resultCode: ResultCode.InvalidCredentials,
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            type: "error",
            resultCode: ResultCode.InvalidCredentials,
          };
        default:
          return {
            type: "error",
            resultCode: ResultCode.UnknownError,
          };
      }
    }
  }
}

export async function handleGithubSignin() {
  await signIn("github", { redirectTo: "/" });
}
export async function handleSignOut() {
  await signOut();
}
