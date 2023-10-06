import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";

import { SessionInterface, UserProfile } from "@/common.types";
import { connectToDB } from "@/utils/database";
import { createUser, getUser } from "./action";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "http://graphql-yoga.com",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        secret
      );

      return encodedToken;
    },
    decode: ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;

      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      try {
        const data = (await getUser(session?.user?.email as string)) as {
          user?: UserProfile;
        };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      console.log("testung email", user?.id);
      try {
        await connectToDB();
        const userExixs = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExixs.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export const getCurrentUser = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
};
