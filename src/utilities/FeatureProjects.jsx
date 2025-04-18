import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "./Loading";
import ProjectCard from "../components/Project";

function FeatureProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const restPath = `${restBase}pfh-project?_embed`;

    const fetchProjects = async () => {
      try {
        const res = await fetch(restPath);
        const data = await res.json();

        const featured = data
          .filter((project) => project["pfh-featured"]?.length > 0)
          .slice(0, 2);

        setProjects(featured);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoaded(false);
      }
    };
    fetchProjects();
  }, []);

  if (!isLoaded) return <Loading />;

  return (
    <section
      id="projects"
      className="p-4 lg:p-8 lg:w-2/3 mx-auto bg-primary rounded-2xl "
    >
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default FeatureProjects;
