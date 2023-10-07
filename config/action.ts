import { ProjectForm } from "@/common.types";
import {
  addProjectMutation,
  createUserMutation,
  getProjectQuery,
  getSingleProjectQuery,
  getUserQuery,
} from "@/gql/clientQuery";
import { connectToDB } from "@/utils/database";
import { GraphQLClient } from "graphql-request";

const isProd = process.env.NODE_ENV === "production";

const graphqlApi = isProd
  ? process.env.NEXT_GRAPHQL_PROD_URL || ""
  : "http://localhost:3000/api/graphql";

const serverURL = isProd
  ? process.env.NEXT_SERVER_URL || ""
  : "http://localhost:3000";

const apikey = "tesutngfgfgfgfg";

const client = new GraphQLClient(graphqlApi);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverURL}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  await connectToDB();

  try {
    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apikey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, desc: string) => {
  client.setHeader("x-api-key", apikey);

  const variables = {
    username: name,
    email: email,
    desc: desc,
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverURL}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const addnewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageURL = await uploadImage(form.image);

  if (imageURL.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      ...form,
      image: imageURL.url,
      createdBy: creatorId,
    };

    return makeGraphQLRequest(addProjectMutation, variables);
  }
};

export const getAllProjects = async (category?: string, endcursor?: string) => {
  client.setHeader("x-api-key", apikey);
  const variables = {
    category,
    endcursor,
  };

  return makeGraphQLRequest(getProjectQuery, variables);
};

export const getIndividualProject = (id: string) => {
  client.setHeader("x-api-key", apikey);
  return makeGraphQLRequest(getSingleProjectQuery, { id });
};
