const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,

  GraphQLNonNull,
} = require("graphql");

import User from "@/models/user";
import { ProjectType, UserType } from "./schema";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        githubURL: { type: GraphQLString },
        linkedInURL: { type: GraphQLString },
        desc: { type: GraphQLString },
      },
      resolve(
        parent: any,
        args: {
          username: any;
          email: any;
          githubURL: any;
          desc: any;
          linkedInURL: any;
        }
      ) {
        const user = new User({
          username: args.username,
          email: args.email,
          githubURL: args.githubURL,
          desc: args.desc,
          linkedInURL: args.linkedInURL,
        });

        return user.save();
      },
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent: any, args: { id: any }) {
        return User.findByIdAndRemove(args.id);
      },
    },
  },
});
