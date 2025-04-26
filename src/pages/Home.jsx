import Hero from "../components/Hero";
import FeatureProjects from "../utilities/FeatureProjects";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>

      <section id="features-project" className="mb-20">
        <h2 className="text-4xl  font-semibold text-center mt-20 mb-10 dark:text-light_text">
          Featured Projects
        </h2>
        <div className="flex flex-col justify-center items-center gap-8">
          <FeatureProjects />
          <Link
            to="/projects"
            className="font-semibold text-lg transition duration-300 ease-in-out hover:underline hover:scale-105 dark:text-light_text"
          >
            More Projects &raquo;
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
