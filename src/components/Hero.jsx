import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import { FaUser } from "react-icons/fa";
import scollImage from "../assets/arrow-down.png";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import ChoroplethGlobe from "../components/ChoroplethGlobe";

function Hero() {
  const restPath = restBase + "pages/69?_embed&_fields=acf,title,content";

  const [restData, setData] = useState(null);
  const [isLoaded, setLoadStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setData(data);
        setLoadStatus(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoadStatus(false);
      }
    };

    fetchData();

    return () => {
      setData(null);
      setLoadStatus(false);
    };
  }, [restPath]);

  return (
    <>
      {isLoaded ? (
        <>
          <title>
            {`Shanika Ekanayake | ${
              restData?.title?.rendered || "GIS Developer"
            }`}
          </title>

          {/* HERO SECTION */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* 🌍 Globe Background */}
            <div className="absolute inset-0 z-0 scale-110 hover:scale-125 transition-transform duration-700">
              <ChoroplethGlobe />
            </div>

            {/* 🌑 Overlay for readability */}
            <div className="absolute inset-0 bg-white/50 dark:bg-black/60 z-10 pointer-events-none"></div>

            {/* 🧾 Content */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl">
              {/* Greeting */}
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2 dark:text-light_text">
                {restData?.acf?.greeting || "Hi There!"}
              </h2>

              {/* Name animation */}
              <motion.h2
                className="text-4xl md:text-6xl text-secondary mb-6 mt-6 font-medium dark:text-accent"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  letterSpacing: "-0.1em",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  letterSpacing: "0em",
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              >
                {restData?.acf?.name || "Shanika Ekanayake"}
              </motion.h2>

              {/* Typewriter title */}
              <h3 className="text-3xl font-bold md:text-4xl text-dark mb-3 dark:text-light_text">
                <Typewriter
                  words={
                    restData?.acf?.title
                      ? restData.acf.title.split(",")
                      : [
                          "GIS Developer",
                          "Web Developer",
                          "Spatial Data Analyst",
                        ]
                  }
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h3>

              {/* Short description */}
              <p className="text-lg md:text-xl font-light text-dark dark:text-light_text">
                {restData?.acf?.about_me_short ||
                  "I transform spatial data into clear, powerful GIS solutions."}
              </p>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
                <Link to="/projects">
                  <button className="px-6 py-3 text-white font-semibold rounded-md border-2 border-secondary bg-secondary hover:bg-transparent hover:text-secondary transition duration-300">
                    Discover My Projects
                  </button>
                </Link>

                <Link to="/about">
                  <button className="flex items-center gap-2 px-6 py-3 font-semibold text-[#256525] border-2 border-[#256525] dark:border-white dark:text-light_text rounded-md hover:text-white hover:bg-secondary transition duration-300">
                    <FaUser />
                    Who am I?
                  </button>
                </Link>
              </div>

              {/* Scroll icon */}
              <a
                href="#projects"
                className="block mx-auto w-[70px] h-[70px] mt-8 cursor-pointer"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <img
                    src={scollImage}
                    alt="Scroll"
                    className="w-full h-full object-contain opacity-80"
                  />
                </motion.div>
              </a>
            </div>
          </section>
        </>
      ) : error ? (
        <p className="text-red-500">{`Error: ${error}`}</p>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Hero;
