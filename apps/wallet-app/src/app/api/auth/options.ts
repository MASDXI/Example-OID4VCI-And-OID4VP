import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOLDER_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          // Expected response from backend:
          // { user: { id: 'johndoe@example.xyz', email: 'johndoe@example.xyz' } }
          if (res.ok && data.email) {
            console.log("🚀 ~ data:", data.email)
            return { id: data.email};
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.email = token.sub;
      session.id = token.sub;
      session.user.name = token.sub;
      session.user.image = "https://www.fillmurray.com/128/128";
      return session;
    },
  },
};
