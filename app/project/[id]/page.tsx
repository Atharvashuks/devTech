import Image from "next/image";
import Link from "next/link";

import { ProjectInterface } from "@/common.types";
import { getIndividualProject } from "@/config/action";
import { getCurrentUser } from "@/config/session";
import Modal from "@/components/Modal";
import RelatedProjects from "@/components/RelatedProjects";

const Projects = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getIndividualProject(id)) as ProjectInterface;

  if (!result) {
    <p>Failed to fetch projects!!</p>;
  }

  const projectData = result?.getProject;

  console.log("i am user if deor main page", projectData?.createdBy?.id);

  const renderLink = () => `/profile/${result?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectData?.createdBy?.desc}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {projectData?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>
                {projectData?.createdBy?.username}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectData?.category}`}
                className="text-primary-purple font-semibold"
              >
                {projectData?.category}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <Image
          src={`${projectData?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{projectData?.desc}</p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={projectData?.githubURL}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectData?.liveURL}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectData?.createdBy?.desc}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
      <RelatedProjects
        userId={projectData?.createdBy?.id}
        projectId={projectData?.id}
      />
    </Modal>
  );
};

export default Projects;
