import { redirect } from "next/navigation";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/config/session";

const CreateProject = async () => {
  const session = await getCurrentUser();

  !session?.user && redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Add a Project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
