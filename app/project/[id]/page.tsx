import { ProjectInterface } from "@/common.types";
import { getIndividualProject } from "@/config/action";
import { getCurrentUser } from "@/config/session";
import React from "react";

const Projects = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getIndividualProject(id)) as ProjectInterface;

  if (!result) {
    <p>Failed to fetch projects!!</p>;
  }

  console.log(result);
  return <div></div>;
};

export default Projects;
