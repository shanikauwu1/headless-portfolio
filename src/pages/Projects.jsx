import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const restPath = restBase + `pfh-project`;

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
    <div className="p-4">
      <h2 className="text-2xl mb-4">Front-End Projects</h2>
      {isLoaded ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <h3 className="text-lg font-semibold">
                {project.title.rendered}
              </h3>
              <div />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading projects...</p>
      )}
    </div>
  );
}

export default Projects;
