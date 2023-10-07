import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/config/action";

type ProjectSearch = {
  getAllProjects: any;
  projectSearch: {
    pageInfo: {
      prevPage: boolean;
      nextPage: boolean;
      startCursor: boolean;
      endCursor: boolean;
    };
  };
};

const Home = async () => {
  const data = (await getAllProjects()) as ProjectSearch;

  const projects: {
    image: any;
    node: ProjectInterface;
  }[] = data.getAllProjects;

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text=center">
          No Projects found. Go create some!!
        </p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {projects.map((node: any) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            username={node?.createdBy?.username}
            desc={node?.createdBy?.desc}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
