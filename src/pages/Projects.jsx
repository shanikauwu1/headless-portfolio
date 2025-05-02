import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import ProjectCard from "../components/Project";
import { motion } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${restBase}project-category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch projects based on the active category
  useEffect(() => {
    const restPath = `${restBase}pfh-project?_embed`;
    const categoryParam =
      activeCategory !== "all" ? `&project-category=${activeCategory}` : "";
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${restPath}${categoryParam}`);
        const data = await res.json();
        //console.log(data);
        setProjects(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoaded(false);
      }
    };

    fetchProjects(); // Fetch projects when activeCategory changes
  }, [activeCategory]); // This effect will run every time the activeCategory changes

  //   Manual SEO for projects page

  useEffect(() => {
    document.title = "Projects | Shanika Ekanayake";

    //  Set or create meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent =
      "Browse a collection of web development projects by Shanika Ekanayake, showcasing work in React, PHP, WordPress, and more.";

    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionContent);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", descriptionContent);
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <section className="p-4 mb-12">
      <h2 className="text-4xl mb-8 font-semibold dark:text-light_text">
        My Projects
      </h2>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded ${
            activeCategory === "all"
              ? "bg-dark text-white dark:bg-accent"
              : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded ${
              activeCategory === cat.id
                ? "bg-dark text-white dark:bg-accent"
                : "bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {isLoaded ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 bg-secondary dark:bg-accent rounded-xl">
                <ProjectCard project={project} />
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
