import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import BubbleCanvas from "./BubbleCanvas";
import { FaUser } from "react-icons/fa";
import scollImage from "../assets/arrow-down.png";
import { Link } from "react-router-dom";

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
        console.log(data);
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

          <section className="relative min-h-fit lg:h-[90vh] flex flex-col lg:flex-row items-center justify-center text-dark text-center px-4 mb-8">
            <BubbleCanvas />
            {featuredImage && (
              <div className="absolute inset-0 flex justify-center items-center">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-[200px] h-auto object-contain opacity-50"
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
              <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2 font-mono dark:text-light_text">
                {restData?.acf?.greeting || "Hi There!"}
              </h1>
              <h2 className=" text-4xl md:text-6xl  text-primary mb-3 font-medium">
                {restData?.acf?.name || "Name Not Available"}
              </h2>

              {/* ACF Title */}
              <h3
                className="text-3xl font-bold
                md:text-4xl text-dark mb-3 md:font-medium font-mono dark:text-light_text"
              >
                {restData?.acf?.title || "Title Not Available"}
              </h3>

              {/* ACF About */}
              <p className="text-lg font-normal  md:text-xl font-sans md:font-semibold  text-dark dark:text-light_text">
                {restData?.acf?.about_me_short ||
                  "About me description is not available."}
              </p>

              <div className="flex flex-col md:flex-row   md:justify-center items-center gap-6 mt-8">
                <Link to="/projects">
                  <button className="px-6 py-3 text-white font-semibold  dark:border-white rounded-md bg-gradient-to-r from-[#256525] to-[#e08081] hover:opacity-90 transition duration-300">
                    Discover My Projects
                  </button>
                </Link>

                <Link to="/about">
                  {" "}
                  <button className="flex items-center gap-2 px-6 py-3 font-semibold text-[#256525] border-2 border-[#256525] dark:border-white dark:text-light_text rounded-md hover:text-white hover:bg-gradient-to-r hover:from-[#256525] hover:to-[#e08081] transition duration-300">
                    <FaUser />
                    Who am I?
                  </button>
                </Link>
              </div>

              <a
                href="#projects"
                className="block mx-auto w-[70px] h-[70px] mt-8 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={scollImage}
                  alt="Scroll to projects"
                  className="w-full h-full object-contain"
                />
              </a>
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
