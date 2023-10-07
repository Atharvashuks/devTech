import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  image: string;
  title: string;
  username: string;
  desc: string;
  userId: string;
};

const ProjectCard = ({ id, image, title, username, desc, userId }: Props) => {
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={426}
          height={326}
          className="w-full h-full object-cover rounded-2xl"
          alt="Project img"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={desc}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile img"
            />
            <p>{username}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            {/* // TODO: implement like functionality */}
            <Image src="/heart.svg" width={13} height={13} alt="like" />
            <p className="text-sm">3</p>
          </div>
          <div className="flexCenter gap-2">
            {/* // TODO: implement view functionality */}
            <Image src="/eye.svg" width={13} height={13} alt="view" />
            <p className="text-sm">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
