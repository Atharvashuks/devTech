import User from "@/models/user";
import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    desc: { type: GraphQLString },
    githubURL: { type: GraphQLString },
    linkedInURL: { type: GraphQLString },
  }),
});

export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    githubURL: { type: GraphQLString },
    liveURL: { type: GraphQLString },
    image: { type: GraphQLString },
    category: { type: GraphQLString },
    createdBy: {
      type: UserType,
      resolve(parent: { createdBy: any }, args: any) {
        return User.findById(parent.createdBy);
      },
    },
  }),
});
