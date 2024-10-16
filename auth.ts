/* The code snippet you provided is setting up authentication using NextAuth in a TypeScript
environment. Here's a breakdown of what it's doing: */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import { getStringFromBuffer } from "@/lib/utils";
import { getUser } from "@/app/actions/user-actions";
import Github from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Github,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(
              { message: "Invalid email format" }
            ),
            password: z.string().min(6,
               { message: "Password must be at least 6 characters long" }
              ),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          const encoder = new TextEncoder();
          const saltedPassword = encoder.encode(password + user.salt);
          const hashedPasswordBuffer = await crypto.subtle.digest(
            "SHA-256",
            saltedPassword
          );
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

          if (hashedPassword === user.password) {
            return user;
          } else {
            return null;
          }
        }

        return null;
      },
    }),
  ],
});
