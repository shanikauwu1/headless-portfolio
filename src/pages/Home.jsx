import Hero from "../components/Hero";
import FeatureProjects from "../utilities/FeatureProjects";
import scollImage from "../assets/scroll-down.gif";

function Home() {
  return (
    <>
      <Hero />

      <a
        href="#projects"
        className="block mx-auto w-[100px] h-[100px] cursor-pointer transition-transform duration-300 hover:scale-110"
      >
        <img
          src={scollImage}
          alt="Scroll to projects"
          className="w-full h-full object-contain"
        />
      </a>

      <FeatureProjects />
    </>
  );
}

export default Home;
