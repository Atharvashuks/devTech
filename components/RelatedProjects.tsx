import Link from "next/link";
import Image from "next/image";

import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProject } from "@/config/action";

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const result = (await getUserProject(userId)) as UserProfile;

  if (!result) {
    return <p>Failed to fetch projects!!</p>;
  }

  const projectData = result.getUserProject;
  const userInfo = projectData[0]?.createdBy;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {userInfo?.username}</p>
        <Link
          href={`/profile/${userInfo?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {projectData?.map(
          (temp: any) =>
            temp?.id !== projectId && (
              <div className="flexCenter related_project-card drop-shadow-card gap-8">
                <Link
                  href={`/project/${temp?.id}`}
                  className="flexCenter group relative w-full h-full"
                >
                  <Image
                    src={temp?.image}
                    width={414}
                    height={314}
                    className="w-full h-full object-cover rounded-2xl"
                    alt="project image"
                  />

                  <div className="hidden group-hover:flex related_project-card_title">
                    <p className="w-full">{temp?.title}</p>
                  </div>
                </Link>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default RelatedProjects;
