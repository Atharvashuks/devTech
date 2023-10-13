import { redirect } from "next/navigation";

import Modal from "@/components/Modal";
import { getCurrentUser } from "@/config/session";
import CreatePorjectForm from "@/components/CreateProjectForm";
import { getIndividualProject } from "@/config/action";
import { ProjectInterface } from "@/common.types";

const Editproject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  !session?.user && redirect("/");

  const result = (await getIndividualProject(id)) as ProjectInterface;

  if (!result) {
    <p>Failed to fetch project!!</p>;
  }

  const projectData = result?.getProject;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit your Project</h3>
      <CreatePorjectForm type="edit" session={session} project={projectData} />
    </Modal>
  );
};

export default Editproject;
