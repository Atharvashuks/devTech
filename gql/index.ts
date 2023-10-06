import { GraphQLSchema } from "graphql";
import { useJWT } from "@graphql-yoga/plugin-jwt";

import { RootQuery } from "./resolvers";
import { mutation } from "./mutations";

const signingKey = process.env.NEXTAUTH_SECRET;

export const newSchema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
