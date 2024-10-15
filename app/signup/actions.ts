"use server";

import { z } from "zod";
import { getStringFromBuffer, ResultCode } from "@/lib/utils";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { createUser } from "../actions/user-actions";

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const first_name = formData.get("first-name") as string;
  const last_name = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    })
    .safeParse({
      email,
      first_name,
      last_name,
      password,
    });

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID();

    const encoder = new TextEncoder();
    const saltedPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedPassword
    );

    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    try {
      const result = await createUser(
        first_name,
        last_name,
        email,
        hashedPassword,
        salt
      );

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }

      return result;
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
      } else {
        return {
          type: "error",
          resultCode: ResultCode.UnknownError,
        };
      }
    }
  } else {
    return {
      type: "error",
      resultCode: ResultCode.InvalidCredentials,
    };
  }
}

// "use server";

// import { z } from "zod";
// import { getUser } from "../actions";
// import { getStringFromBuffer, ResultCode } from "@/lib/utils";
// import { users } from "@/lib/db/schema";
// import { db } from "@/lib/db/postgres";
// import { AuthError } from "next-auth";
// import { signIn } from "@/auth";
// import bcrypt from "bcrypt"; // Utilisation de bcrypt pour le hachage

// // Utilitaire pour générer un hash sécurisé
// async function hashPassword(password: string, saltRounds = 10): Promise<string> {
//   return await bcrypt.hash(password, saltRounds);
// }

// // Fonction pour créer un utilisateur dans la base de données
// export async function createUser(
//   first_name: string,
//   last_name: string,
//   email: string,
//   hashedPassword: string
// ): Promise<{ type: string; resultCode: ResultCode }> {
//   const existingUser = await getUser(email);

//   if (existingUser) {
//     return {
//       type: "error",
//       resultCode: ResultCode.UserAlreadyExists,
//     };
//   }

//   const user = {
//     id: crypto.randomUUID(),
//     first_name,
//     last_name,
//     email,
//     password: hashedPassword,
//   };

//   try {
//     await db.insert(users).values(user);
//     return {
//       type: "success",
//       resultCode: ResultCode.UserCreated,
//     };
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return {
//       type: "error",
//       resultCode: ResultCode.DatabaseError,
//     };
//   }
// }

// // Interface pour le retour de la fonction signup
// interface Result {
//   type: string;
//   resultCode: ResultCode;
// }

// // Fonction de signup avec validation et création de l'utilisateur
// export async function signup(
//   _prevState: Result | undefined,
//   formData: FormData
// ): Promise<Result | undefined> {
//   const first_name = formData.get("first-name") as string;
//   const last_name = formData.get("last-name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   // Validation des données avec Zod
//   const parsedCredentials = z
//     .object({
//       email: z.string().email(),
//       first_name: z.string().min(1, "First name is required"),
//       last_name: z.string().min(1, "Last name is required"),
//       password: z.string().min(6, "Password must be at least 6 characters long"),
//     })
//     .safeParse({
//       email,
//       first_name,
//       last_name,
//       password,
//     });

//   if (!parsedCredentials.success) {
//     return {
//       type: "error",
//       resultCode: ResultCode.InvalidCredentials,
//     };
//   }

//   try {
//     // Génération d'un hash sécurisé du mot de passe avec bcrypt
//     const hashedPassword = await hashPassword(password);

//     // Création de l'utilisateur
//     const result = await createUser(
//       first_name,
//       last_name,
//       email,
//       hashedPassword
//     );

//     if (result.resultCode === ResultCode.UserCreated) {
//       // Connexion automatique après la création de l'utilisateur
//       await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });
//     }

//     return result;
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return {
//             type: "error",
//             resultCode: ResultCode.InvalidCredentials,
//           };
//         default:
//           return {
//             type: "error",
//             resultCode: ResultCode.UnknownError,
//           };
//       }
//     } else {
//       console.error("Unexpected error during signup:", error);
//       return {
//         type: "error",
//         resultCode: ResultCode.UnknownError,
//       };
//     }
//   }
// }
