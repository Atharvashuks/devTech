const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

import User from "@/models/user";
import { ProjectType, UserType } from "./schema";
import Project from "@/models/project";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent: any, args: any) {
        return User.findOne({ email: args.email });
      },
    },

    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent: any, args: { email: typeof GraphQLString }) {
        return User.findOne({ email: args.email });
      },
    },

    getUserProject: {
      type: new GraphQLList(ProjectType),
      args: { id: { type: GraphQLID }, last: { type: GraphQLInt } },
      async resolve(
        parent: any,
        args: { id: typeof GraphQLID; last: typeof GraphQLInt }
      ) {
        try {
          const user = await User.findById(args.id);

          if (!user) {
            throw new Error("User not found");
          }

          if (args.last) {
            return (await Project.find({ _id: { $in: user.projects } })).splice(
              0,
              args.last
            );
          }
          return await Project.find({ _id: { $in: user.projects } });
        } catch (error: any) {
          throw new Error(`Error fetching user projects: ${error.message}`);
        }
      },
    },

    getAllProjects: {
      type: new GraphQLList(ProjectType),
      args: { category: { type: GraphQLString } },
      resolve(parent: any, args: any) {
        return Project.find();
      },
    },

    getProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: { id: typeof GraphQLID }) {
        return Project.findById(args.id);
      },
    },
  },
});
