import { getUserProject } from "@/config/action";

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  console.log("Ima userid from related peorhsgtv", userId);
  const result = await getUserProject(userId);

  console.log("i am user projrect restlu", result);
  return <div>RelatedProjects</div>;
};

export default RelatedProjects;
