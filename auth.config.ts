import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
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
        (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
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
