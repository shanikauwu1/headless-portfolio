import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

function Hero() {
  // Fetch data including embedded features like images and ACF fields
  const restPath = restBase + "pages/69?_embed&_fields=acf,title,content"; // Add _embed to include featured image
  const [restData, setData] = useState(null); // Initialize as null instead of an empty object
  const [isLoaded, setLoadStatus] = useState(false);
  const [error, setError] = useState(null); // To track any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data); // Pages are returned as an array, so we access the first item
        setLoadStatus(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
        setLoadStatus(false);
      }
    };

    fetchData();

    return () => {
      setData(null); // Clean up data on component unmount
      setLoadStatus(false); // Reset loading status
    };
  }, [restPath]);

  // Extract featured image from the embedded data (if available)
  const featuredImage =
    restData?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <>
      {isLoaded ? (
        <>
          <title>{` Shanika Ekanayake | ${
            restData?.title?.rendered || "Web Developer"
          } `}</title>

          <section className="relative h-[80vh] flex flex-col lg:flex-row items-center justify-center text-dark text-center px-4">
            {/* Featured Image */}
            {featuredImage && (
              <div className="absolute inset-0">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 max-w-3xl text-lg md:text-xl p-4 z-10">
              {/* Render the content of the page */}
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: restData?.content?.rendered || "No content available",
                }}
              />
            </div>

            {/* ACF Data (e.g., name, title, short about) */}
            <div className="flex-1 max-w-3xl text-lg md:text-xl p-4 z-10">
              {/* ACF Name */}
              <h2 className="text-3xl font-bold text-primary">
                {restData?.acf?.name || "Name Not Available"}
              </h2>

              {/* ACF Title */}
              <h3 className="text-2xl text-primary">
                {restData?.acf?.title || "Title Not Available"}
              </h3>

              {/* ACF About */}
              <p className="text-lg text-gray-600">
                {restData?.acf?.about_me_short ||
                  "About me description is not available."}
              </p>
            </div>
          </section>
        </>
      ) : error ? (
        <p className="text-red-500">{`Error: ${error}`}</p> // Display error message if there's an error
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Hero;
