import { createUserMutation, getUserQuery } from "@/gql/clientQuery";
import { GraphQLClient } from "graphql-request";

const isProd = process.env.NODE_ENV === "production";

const graphqlApi = isProd
  ? process.env.NEXT_GRAPHQL_PROD_URL || ""
  : "http://localhost:3000/api/graphql";

const serverURL = isProd
  ? process.env.NEXT_SERVER_URL || ""
  : "http://localhost:3000";

const client = new GraphQLClient(graphqlApi);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email }); // TODO: add error handling here!
};

export const createUser = (name: string, email: string, desc: string) => {
  const variables = {
    username: name,
    email: email,
    desc: desc,
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
