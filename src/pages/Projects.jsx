import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import ProjectCard from "../components/Project";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const restPath = restBase + `pfh-project?_embed`;

    const fetchProjects = async () => {
      try {
        const res = await fetch(restPath);
        const data = await res.json();
        console.log(data);
        setProjects(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoaded(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-2xl mb-4">Front-End Projects</h2>
      {isLoaded ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default Projects;
