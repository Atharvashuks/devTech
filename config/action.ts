import { CreatePorjectForm } from "@/common.types";
import {
  addProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  editProjectMutation,
  getProjectQuery,
  getSingleProjectQuery,
  getUserProjectQuery,
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
  form: CreatePorjectForm,
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

export const getUserProject = (id: string, last?: number) => {
  client.setHeader("x-api-key", apikey);

  const variables = {
    id,
    last,
  };
  return makeGraphQLRequest(getUserProjectQuery, variables);
};

export const deleteProject = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const EditProject = async (
  form: CreatePorjectForm,
  id: string,
  token: string
) => {
  function isBase64URL(value: string) {
    const base64RegX = /^data.image\/[a-z]+;base64,/;
    return base64RegX.test(value);
  }

  let variables = { ...form };
  const isnewImgUpload = isBase64URL(form.image);

  // if (isnewImgUpload) {
  const imageURL = await uploadImage(form.image);

  if (imageURL.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    variables = {
      ...form,
      image: imageURL.url,
    };

    return makeGraphQLRequest(editProjectMutation, { id, variables });
    // }
  }
};
