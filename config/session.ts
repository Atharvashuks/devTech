import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

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
  //   jwt: {
  //     encode: ({ secret, token }) => {},
  //     decode: ({ secret, token }) => {},
  //   },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        await connectToDB();
        // const userExixs = (await getUser(user?.email as string)) as {   // ! ALERT: This feature is not working
        //   user?: UserProfile;
        // };

        // if (userExixs.user) {
        //   console.log(`User ${userExixs.user}`); // TODO: remove this after testing
        //   console.log("CHecking done");
        // }

        // if (!userExixs.user) {
        await createUser(
          user.name as string,
          user.email as string,
          user.image as string
        );
        // }

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
