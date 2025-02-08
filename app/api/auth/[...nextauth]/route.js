import { BASE_URL } from "@/constants";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log("user===>", user);

        if (res.ok && user) {
          return user.userData;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.photoUrl = user.photoUrl;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
        token.photoUrl = user.photoUrl;
        token.token = user.token;
        token.userId = user.userId;
      }

      if (trigger === "update") {
        console.log("session===>", session);
        token.name = session.name;
        token.email = session.email;
        token.token = token.token;
        token.photoUrl = session.photoUrl;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.photoUrl = token.photoUrl;
        session.user.phoneNumber = token.phoneNumber;
        session.user.token = token.token;
        session.user.role = token.role;
        session.user.image = token.photoUrl;
        session.user.userId = token.userId;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
