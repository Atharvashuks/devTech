const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

import User from "@/models/user";
import { ProjectType, UserType } from "./schema";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent: any, args: any) {
    //     return User.findById(args.email);
    //   },
    // },
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent: any, args: { email: typeof GraphQLString }) {
        return User.findOne({ email: args.email });
      },
    },
  },
});
