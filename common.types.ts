import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  id: string;
  githubURL: string;
  liveURL: string;
  desc: string;
  title: string;
  image: string;
  category: string;
  getProject: any;
  createdBy: {
    desc: string;
    username: string;
    email: string;
    id: string;
  };
}

export interface UserProfile {
  createdBy: any;
  getUserProject: any;
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}

export interface CreatePorjectForm {
  title: string;
  desc: string;
  image: string;
  liveURL: string;
  githubURL: string;
  category: string;
}
