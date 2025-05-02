import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import { FaLink, FaGithub, FaLightbulb, FaRocket } from "react-icons/fa";
import computerMockup from "../assets/computer-bg.png";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${restBase}pfh-project/${id}?_embed`);
        const data = await res.json();
        setProject(data);
        setIsLoaded(true);

        const title = data?.yoast_head_json?.title || data.title.rendered;
        const description =
          data?.yoast_head_json?.description ||
          "Explore this project in detail.";

        document.title = title;

        let metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
          metaTag.setAttribute("content", description);
        } else {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("name", "description");
          metaTag.setAttribute("content", description);
          document.head.appendChild(metaTag);
        }

        // fetch and , get the skill IDs
        if (data.acf?.project_skills?.length > 0) {
          // Fetch each skill by ID
          const skillRequests = data.acf.project_skills.map((skillId) =>
            fetch(`${restBase}pfh-skill/${skillId}?_embed`).then((res) =>
              res.json()
            )
          );
          const skillData = await Promise.all(skillRequests);
          setSkills(skillData);
        }
      } catch (error) {
        console.error("Error fetching project or skills:", error);
        setIsLoaded(false);
      }
    };

    fetchProject();
  }, [id]);

  if (!isLoaded) return <Loading />;
  if (!project) return <p>Project not found.</p>;

  const featuredImage =
    project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <section className="p-4 dark:text-light_text">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-gray-800 dark:text-light_text">
        {project.title.rendered}
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-1/2 lg:pr-4">
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Computer mockup image */}
            <img
              src={computerMockup}
              srcSet={`
        ${computerMockup} 640w,
        ${computerMockup} 768w,
        ${computerMockup} 1024w
      `}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
              alt="Computer Mockup"
              className="w-full"
            />

            {/* Project screenshot inside screen */}
            {featuredImage && (
              <img
                src={featuredImage}
                srcSet={`
          ${featuredImage}?resize=480 480w,
          ${featuredImage}?resize=768 768w,
          ${featuredImage}?resize=1024 1024w
        `}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 600px"
                alt={project.title.rendered}
                className="absolute top-[5%] left-[4%] w-[92%] h-[65%] object-cover rounded-md shadow-md"
              />
            )}
          </div>
        </aside>

        <article className="w-full lg:w-1/2 lg:pl-4">
          {project.acf?.description && (
            <div className="mb-2">
              <h2 className="text-2xl md:text-3xl mb-8 font-semibold">
                Project Overview
              </h2>
              <p> {project.acf.description}</p>
            </div>
          )}

          <div className="flex flex-row  gap-8 mt-8">
            {project.acf?.live_site?.url && (
              <a
                href={project.acf.live_site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent  hover:text-secondary transition"
              >
                <FaLink size={40} />
              </a>
            )}

            {project.acf?.github_link?.url && (
              <a
                href={project.acf.github_link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent  hover:text-secondary transition"
              >
                <FaGithub size={40} />
              </a>
            )}
          </div>
        </article>
      </div>
      <div className="mt-6 lg:mt-12">
        <h2 className="text-2xl md:text-3xl mb-12 font-semibold mt-4">
          Tools and Technologies
        </h2>
        {skills.length > 0 && (
          <div className="mt-8 mb-12">
            <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills.map((skill) => {
                const featuredImage =
                  skill._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <li
                    key={skill.id}
                    className="flex flex-col items-center bg-gray-100 dark:bg-dark_secondary p-4 rounded-lg shadow dark: text-dark"
                  >
                    {featuredImage && (
                      <img
                        src={featuredImage}
                        alt={skill.title.rendered}
                        className="w-16 h-16 object-contain mb-2"
                      />
                    )}
                    <p className="text-sm font-medium text-center">
                      {skill.title.rendered}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl mb-8 font-semibold mt-4 flex items-center gap-2">
          Project Features and Highlights
        </h2>
        {project.acf?.development && (
          <ul className="list-none pl-0 space-y-2">
            {project.acf.development
              .split(".")
              .filter((item) => item.trim() !== "")
              .map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaRocket className="text-accent mt-1 mr-4 flex-shrink-0" />
                  <span>{item.trim()}</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl mb-8 font-semibold mt-4 flex items-center gap-2">
          My Learning Journey
        </h2>
        {project.acf?.reflection && (
          <ul className="list-none pl-0 space-y-2">
            {project.acf.reflection
              .split(".")
              .filter((item) => item.trim() !== "")
              .map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaLightbulb className="text-accent flex-shrink-0 mt-1 mr-4" />
                  <span>{item.trim()}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SingleProject;
