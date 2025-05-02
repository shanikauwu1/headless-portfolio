import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FeatureProjects from "../utilities/FeatureProjects";
import { Link } from "react-router-dom";
import { restBase } from "../utilities/Utilities";

function Home() {
  const [seoData, setSeoData] = useState(null);
  const restPath = restBase + "pages/69";

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(restPath);
        if (!response.ok) {
          throw new Error("Failed to fetch SEO data");
        }

        const data = await response.json();
        setSeoData(data);

        const yoast = data.yoast_head_json;

        // Set SEO title
        document.title =
          yoast?.title || "Shanika Ekanayake | Web Developer Portfolio";

        // Set SEO meta description
        const descriptionContent =
          yoast?.description ||
          "Explore Shanika Ekanayake’s portfolio – a Web Developer in Canada.";

        let metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
          metaTag.setAttribute("content", descriptionContent);
        } else {
          const newMetaTag = document.createElement("meta");
          newMetaTag.setAttribute("name", "description");
          newMetaTag.setAttribute("content", descriptionContent);
          document.head.appendChild(newMetaTag);
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchSeoData();

    return () => {
      setSeoData(null);
    };
  }, [restPath]);

  return (
    <>
      <section>
        <Hero />
      </section>
      {/* Features projects section */}
      <section id="features-project" className="mb-20">
        <h2 className="text-4xl font-semibold text-center mt-20 mb-10 dark:text-light_text">
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
