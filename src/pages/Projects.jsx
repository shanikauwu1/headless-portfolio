import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import ProjectCard from "../components/Project";
import { motion } from "framer-motion";

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
    <section className="p-4 mb-12 ">
      <h2 className="text-4xl mb-12 font-semibold dark:text-light_text">
        My Projects
      </h2>
      {isLoaded ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 bg-secondary rounded-xl">
                <ProjectCard key={project.id} project={project} />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default Projects;
