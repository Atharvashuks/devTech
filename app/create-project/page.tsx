import { redirect } from "next/navigation";

import Modal from "@/components/Modal";
import { getCurrentUser } from "@/config/session";
import CreatePorjectForm from "@/components/CreateProjectForm";

const CreateProject = async () => {
  const session = await getCurrentUser();

  !session?.user && redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Add a Project</h3>
      <CreatePorjectForm type="add" session={session} />
    </Modal>
  );
};

export default CreateProject;
