import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${restBase}pfh-project/${id}?_embed`);
        const data = await res.json();
        console.log(data);
        setProject(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching project:", error);
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{project.title.rendered}</h2>

      {featuredImage && (
        <img
          src={featuredImage}
          alt={project.title.rendered}
          className="w-full max-w-2xl mb-4 rounded"
        />
      )}

      {project.acf?.description && (
        <p className="mb-2">
          <strong>Description:</strong> {project.acf.description}
        </p>
      )}

      {project.acf?.development && (
        <p className="mb-2">
          <strong>Development:</strong> {project.acf.development}
        </p>
      )}

      {project.acf?.reflection && (
        <p className="mb-2">
          <strong>Reflection:</strong> {project.acf.reflection}
        </p>
      )}

      {project.acf?.live_site?.url && (
        <p className="mb-2">
          <strong>Live Site:</strong>{" "}
          <a
            href={project.acf.live_site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {project.acf.live_site.url}
          </a>
        </p>
      )}

      {project.acf?.github_link?.url && (
        <p className="mb-2">
          <strong>GitHub:</strong>{" "}
          <a
            href={project.acf.github_link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {project.acf.github_link.url}
          </a>
        </p>
      )}
    </div>
  );
};

export default SingleProject;
