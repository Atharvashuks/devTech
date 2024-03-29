const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,

  GraphQLNonNull,
} = require("graphql");

import User from "@/models/user";
import { ProjectType, UserType } from "./schema";
import Project from "@/models/project";

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

    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        desc: { type: GraphQLString },
        liveURL: { type: GraphQLString },
        githubURL: { type: GraphQLString },
        category: { type: GraphQLString },
        createdBy: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(
        parent: any,
        args: {
          title: any;
          image: any;
          desc: any;
          liveURL: any;
          githubURL: any;
          category: any;
          createdBy: any;
        }
      ) {
        const project = new Project({
          title: args.title,
          image: args.image,
          desc: args.desc,
          liveURL: args.liveURL,
          githubURL: args.githubURL,
          category: args.category,
          createdBy: args.createdBy,
        });

        return project.save().then((savedProject: { _id: any }) => {
          return User.findByIdAndUpdate(
            args.createdBy,
            { $push: { projects: savedProject._id } },
            { new: true }
          )
            .populate("projects")
            .exec();
        });
      },
    },

    editProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLString },
        image: { type: GraphQLString },
        desc: { type: GraphQLString },
        liveURL: { type: GraphQLString },
        githubURL: { type: GraphQLString },
        category: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(
        parent: any,
        args: {
          title: any;
          image: any;
          desc: any;
          liveURL: any;
          githubURL: any;
          category: any;
          id: any;
        }
      ) {
        const project = {
          title: args.title,
          image: args.image,
          desc: args.desc,
          liveURL: args.liveURL,
          githubURL: args.githubURL,
          category: args.category,
        };

        console.log("i am in eit reslver", project);

        return Project.findOneAndUpdate(
          { _id: args.id },
          {
            title: args.title,
            image: args.image,
            desc: args.desc,
            liveURL: args.liveURL,
            githubURL: args.githubURL,
            category: args.category,
          },
          {
            new: true,
          }
        );
      },
    },

    deleteProject: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent: any, args: { id: typeof GraphQLID }) {
        return Project.findByIdAndRemove(args.id);
      },
    },
  },
});
