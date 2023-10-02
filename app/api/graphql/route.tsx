import { newSchema } from "@/gql";
import { connectToDB } from "@/utils/database";
import { createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  schema: newSchema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

export { handleRequest as GET, handleRequest as POST };
