import { useState, useEffect } from "react";
import Loading from "./Loading";
import FeaturedImage from "./FeaturedImage";
import { restBase } from "./Utilities";

const RelatedProjects = ({ projectId }) => {
  const restPath = restBase + `fwd-work/${projectId}?_embed`;
  //const restPath = restBase + `fwd-work/${projectId}`;
  const [restData, setData] = useState(null);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath, projectId]);

  return (
    <>
      {isLoaded ? (
        restData ? (
          <section className="related-project">
            {restData.featured_media !== 0 && restData._embedded && (
              <FeaturedImage
                featuredImageObject={restData._embedded["wp:featuredmedia"][0]}
              />
            )}
            <h4>{restData.title.rendered}</h4>
          </section>
        ) : (
          <p>No related project found.</p>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RelatedProjects;
