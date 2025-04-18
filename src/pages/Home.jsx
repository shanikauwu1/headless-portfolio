import Hero from "../components/Hero";
import FeatureProjects from "../utilities/FeatureProjects";

function Home() {
  return (
    <>
      <Hero />

      <section id="features-project" className="mb-20">
        <h2 className="text-4xl font-mono font-semibold text-center mb-10 dark:text-light_text">
          Featured Projects
        </h2>
        <FeatureProjects />
      </section>
    </>
  );
}

export default Home;
