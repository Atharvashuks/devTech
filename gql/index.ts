import { GraphQLSchema } from "graphql";

import { RootQuery } from "./resolvers";
import { mutation } from "./mutations";

export const newSchema = new GraphQLSchema({ query: RootQuery, mutation });
