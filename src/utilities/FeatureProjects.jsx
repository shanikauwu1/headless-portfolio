import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "./Loading";
import ProjectCard from "../components/Project";
import { motion } from "framer-motion";

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
      className="p-4 lg:p-8 lg:w-2/3 mx-auto bg-gradient-to-r from-secondary to-green-900 rounded-2xl "
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FeatureProjects;
