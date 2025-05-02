import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import BubbleCanvas from "./BubbleCanvas";
import { FaUser } from "react-icons/fa";
import scollImage from "../assets/arrow-down.png";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

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

  const name = restData?.acf?.name || "Name Not Available";

  const waveVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const letterVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {isLoaded ? (
        <>
          <title>{` Shanika Ekanayake | ${
            restData?.title?.rendered || "Web Developer"
          } `}</title>

          <section className="relative min-h-fit lg:h-[90vh] flex flex-col lg:flex-row items-center justify-center text-dark text-center px-4 mb-8">
            <BubbleCanvas />

            {/*         
            <div className="flex-1 max-w-3xl text-lg md:text-xl p-4 z-10">
            

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className=" object-cover rounded-full opacity-80 "
              >
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html:
                      restData?.content?.rendered || "No content available",
                  }}
                />
              </motion.div>
            </div> */}

            {/* ACF Data (e.g., name, title, short about) */}
            <div className="flex-1 max-w-3xl text-lg md:text-xl p-4 z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2  dark:text-light_text">
                {restData?.acf?.greeting || "Hi There!"}
              </h2>

              <motion.h2
                className="text-4xl md:text-6xl text-secondary mb-6 mt-6 font-medium dark:text-accent"
                initial={{ opacity: 0, scale: 0.8, letterSpacing: "-0.1em" }}
                animate={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {restData?.acf?.name || "Name Not Available"}
              </motion.h2>

              {/* ACF Title */}
              <h3 className="text-3xl font-bold md:text-4xl text-dark mb-3 md:font-medium dark:text-light_text">
                <Typewriter
                  words={
                    restData?.acf?.title
                      ? restData.acf.title.split(",") // in case it's a comma-separated string
                      : ["Title Not Available"]
                  }
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h3>

              {/* ACF About */}
              <p className="text-lg font-normal  md:text-xl font-sans md:font-light  text-dark dark:text-light_text">
                {restData?.acf?.about_me_short ||
                  "About me description is not available."}
              </p>

              <div className="flex flex-col md:flex-row   md:justify-center items-center gap-6 mt-8">
                <Link to="/projects">
                  <button className="px-6 py-3 text-white font-semibold  dark:border-white rounded-md border-2 border-secondary bg-secondary hover:bg-transparent hover:text-secondary transition duration-300">
                    Discover My Projects
                  </button>
                </Link>

                <Link to="/about">
                  {" "}
                  <button className="flex items-center gap-2 px-6 py-3 font-semibold text-[#256525] border-2 border-[#256525] dark:border-white dark:text-light_text rounded-md hover:text-white hover:bg-gradient-to-r hover:bg-secondary transition duration-300">
                    <FaUser />
                    Who am I?
                  </button>
                </Link>
              </div>

              <a
                href="#projects"
                className="block mx-auto w-[70px] h-[70px] mt-8 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className=" object-cover rounded-full opacity-80 "
                >
                  <img
                    src={scollImage}
                    alt="Scroll to projects"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
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
