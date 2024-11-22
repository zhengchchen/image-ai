import NextAuth from "next-auth";

import { JWT } from "next-auth/jwt";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { users, accounts } from "@/db/schema";
import { z } from "zod";

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data

        const query = await db.select().from(users).where(eq(users.email,email))

        const user = query[0]

        if(!user || !user.password){
            return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)

        if(!passwordsMatch){
          return null
        }

        return user
      },
    }),
    Github, 
    Google],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks:{
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
