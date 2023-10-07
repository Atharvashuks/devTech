import Image from "next/image";
import Link from "next/link";

import { ProjectInterface } from "@/common.types";
import { getIndividualProject } from "@/config/action";
import { getCurrentUser } from "@/config/session";
import Modal from "@/components/Modal";

const Projects = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getIndividualProject(id)) as ProjectInterface;

  if (!result) {
    <p>Failed to fetch projects!!</p>;
  }

  const renderLink = () => `/profile/${result?.createdBy?.id}`;

  console.log("dara OGB VCJBN ERJHGHI I GHG SFG RES", result?.getProject.image);
  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={result?.getProject?.createdBy?.desc}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {result?.getProject?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>
                {result?.getProject?.createdBy?.username}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${result?.getProject.category}`}
                className="text-primary-purple font-semibold"
              >
                {result?.getProject?.category}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <Image
          src={`${result?.getProject?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {result?.getProject?.desc}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={result?.getProject?.githubURL}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={result?.getProject?.liveURL}
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
            src={result?.getProject?.createdBy?.desc}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
    </Modal>
  );
};

export default Projects;
