import Project from "@/models/project";
import User from "@/models/user";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

// @ts-nocheck
// @ts-ignore
export const UserType = new GraphQLObjectType({
  name: "User",
  // @ts-nocheck
  // @ts-ignore
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    desc: { type: GraphQLString },
    githubURL: { type: GraphQLString },
    linkedInURL: { type: GraphQLString },
    projects: {
      type: new GraphQLList(ProjectType),
    },
  }),
});

// @ts-nocheck
// @ts-ignore
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
    createdAt: { type: GraphQLString },
  }),
});
