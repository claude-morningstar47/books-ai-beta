import type { NextAuthConfig } from "next-auth";
// import { DrizzleAdapter } from "drizzle-orm";

// import { db } from "./db/postgres";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  // adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },

  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Si l'utilisateur est connecté et essaie d'accéder à login ou signup
      if (
        isLoggedIn &&
        (pathname.startsWith("/auth/login") ||
          pathname.startsWith("/auth/signup"))
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // Si l'utilisateur est non connecté et essaie d'accéder à signup
      if (!isLoggedIn && pathname.startsWith("/auth/signup")) {
        return true; // Autoriser l'accès à la page signup
      }

      // Si l'utilisateur est connecté, permettre l'accès aux autres routes
      return !!auth;
    },

    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string };
        const { user } = session;
        session = { ...session, user: { ...user, id } };
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

// import type { NextAuthConfig } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     onboarded: boolean; // Suivre l'état d'onboarding de l'utilisateur
//   }
//   interface Session {
//     user: {
//       id: number;
//       onboarded: boolean; // Ajout de l'état d'onboarding dans la session
//       avatarUrl: string
//     };
//     redirectTo?: string; // Gérer les redirections personnalisées
//   }
// }

// export const authConfig: NextAuthConfig = {
//   secret: process.env.AUTH_SECRET,
//   pages: {
//     signIn: "/auth/login",
//     newUser: "/auth/signup",
//   },

//   callbacks: {
//     async authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user; // Vérifie si l'utilisateur est connecté
//       const { pathname } = nextUrl;

//       // Redirection si l'utilisateur connecté tente d'accéder à login ou signup
//       if (
//         isLoggedIn &&
//         (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
//       ) {
//         return false; // Bloquer l'accès
//       }

//       // Autoriser l'accès à la page de signup si non connecté
//       if (!isLoggedIn && pathname.startsWith("/auth/signup")) {
//         return true; // Autoriser l'accès
//       }

//       // Autoriser l'accès à toutes les autres routes si connecté
//       return isLoggedIn;
//     },

//     async jwt({ token, user }) {
//       // Si l'utilisateur est nouvellement authentifié, ajouter son ID au token
//       if (user) {
//         token.id = user.id;
//         token.onboarded = user.onboarded;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         // Associer les informations du token à la session
//         session.user = {
//           id: token.id as number,
//           name: session.user.name,
//           email: session.user.email,
//           onboarded: token.onboarded as boolean,
//           emailVerified: session.user.emailVerified,
//           avatarUrl: session.user.avatarUrl,
//         } as { id: number; name: string; email: string; onboarded: boolean; emailVerified?: boolean; avatarUrl?: string }; // Ajout d'une assertion de type
//       }
//       // console.log(session);

//       // Vérifier si l'utilisateur a terminé l'onboarding
//       // if (!session.user.onboarded) {
//       //   session.redirectTo = "/onboarding"; // Rediriger vers la page d'onboarding si non complété
//       // }

//       return session;
//     },
//   },
//   providers: [
//     // Ajoutez ici vos providers d'authentification (Google, GitHub, etc.)
//   ],
// };
