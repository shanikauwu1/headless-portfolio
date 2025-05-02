import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import scollImage from "../assets/arrow-down.png";
import Skills from "../components/Skills";
import { FaLinkedin, FaGithub, FaCheckCircle } from "react-icons/fa";
import bakeImg from "../assets/bakeAcake.gif";
import { motion } from "framer-motion";
import ScrollToTopDown from "../utilities/ScrollToTopDown";

function About() {
  const restPath = restBase + "pages/63";
  const [restData, setRestData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRestData(data);
        setIsLoaded(true);

        // fetch SEO data

        const title = data?.yoast_head_json?.title || data.title.rendered;
        const description =
          data?.yoast_head_json?.description || "About  Shanika Ekanayake";

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

        // Fetch profile image
        const profilePicId = data.acf?.["profile-pic"];
        if (profilePicId) {
          const imgRes = await fetch(`${restBase}media/${profilePicId}`);
          const imgData = await imgRes.json();
          setProfileImageUrl(imgData.source_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoaded(false);
      }
    };

    fetchData();

    return () => {
      setRestData(null);
      setIsLoaded(false);
    };
  }, [restPath]);

  if (error) return <p className="text-red-500">{`Error: ${error}`}</p>;
  if (!isLoaded) return <Loading />;

  return (
    <div className="page-about mt-12 mb-12">
      <section className=" py-16 px-6 md:px-20 rounded-3xl">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-20">
          {/* Text Section */}
          <div className="flex-1">
            <motion.h2
              className="text-5xl font-bold mb-8 text-gray-800 dark:text-light_text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Who I Am
            </motion.h2>
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left dark:text-light_text">
              {restData?.acf?.brief_about_me}
            </p>

            <a
              href="#hobby"
              className="inline-block px-4 md:px-6 py-3 bg-accent mt-12 text-white text-sm md:text-lg font-semibold rounded-full shadow-md hover:bg-dark dark:hover:bg-light_text dark:hover:text-dark transition duration-300"
            >
              🍰 See What I Love Doing!
            </a>
          </div>

          {/* Image & Name Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.h1
              className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-accent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              {restData?.acf?.name}
            </motion.h1>
            {profileImageUrl && (
              <img
                src={profileImageUrl}
                alt="Shanika Ekanayake"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full mx-auto md:mx-0 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />
            )}

            <div className="flex justify-center items-center space-x-6  mt-8">
              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/shanikajayawardane/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-accent hover:text-light_text"
              >
                <FaLinkedin size={60} />
              </a>

              <a
                href="https://github.com/shanikauwu1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-accent hover:text-light_text"
              >
                <FaGithub size={60} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* {skill section} */}
      <section className="mt-8 mb-8 p-8 md:p-12  dark:bg-transparent rounded-3xl shadow-xl transition-all duration-300">
        <Skills />
      </section>
      {/* Education */}
      <section id="education" className="px-6 py-16 md:px-20 ">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 dark:text-light_text">
          My Education
        </h2>
        {restData.acf?.my_eductaion?.length > 0 && (
          <div className="space-y-4">
            {restData.acf.my_eductaion.map((edu, index) => (
              <div key={index}>
                <p className="font-semibold dark:text-accent">{edu.degree}</p>
                <p className="text-sm text-gray-600 dark:text-light_text">
                  {edu.institution} • {edu.year}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
      {/*   My Experience */}
      <section className="mt-8 mb-8 p-8 md:p-12 rounded-3xl shadow-xl transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 dark:text-light_text">
          My Experience
        </h2>

        <div className="p-2 w-full md:max-w-4xl lg:px-8 lg:py-16 relative rounded-lg bg-white dark:bg-dark dark:text-light_text">
          {/* Vertical timeline line (full height) */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-[307px] w-1 bg-pink-400 z-0"></div>

          {restData.acf.experience.map((exp, index) => (
            <div
              key={index}
              className="group relative mb-12 flex flex-col md:flex-row z-10" // Ensure each item is above the line
            >
              {/* Left Side */}
              <div className="w-full md:w-1/3 pr-8 text-right relative mb-4 md:mb-0 z-20">
                {/* Dot on timeline */}
                <div className="hidden lg:block absolute top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-red-400 bg-white rounded-full transition-colors duration-300 group-hover:bg-black z-30"></div>

                <h3 className="text-left text-lg font-semibold">
                  {exp.duration}
                </h3>
                <p className="text-sm text-gray-600 text-left dark:text-light_text">
                  <strong>{exp.title}</strong>
                  <br /> {exp.company}
                </p>
              </div>

              {/* Right Side */}
              <div className="w-full md:w-2/3 pl-0 md:pl-12 pt-4 pb-4 z-20">
                <ul className="font-medium p-4 bg-light dark:bg-accent text-dark rounded-lg hover:bg-accent dark:hover:bg-light transition-colors duration-300">
                  {exp["details-experience"]
                    .split(".")
                    .filter((item) => item.trim() !== "")
                    .map((item, idx) => (
                      <li key={idx} className="mb-2 flex flex-row gap-4">
                        <div className="text-xl text-dark">
                          <FaCheckCircle />
                        </div>
                        {item.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Hobby  */}
      <section id="hobby" className="py-16 px-6 md:px-20 rounded-3xl shadow-lg">
        {/* Hobby Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 dark:text-light_text">
          Hobby
        </h2>

        {/* Hobby Description */}
        {restData.acf?.hobby && (
          <div className="mb-10">
            <p className="text-xl font-semibold leading-relaxed text-gray-700 dark:text-accent">
              {restData.acf.hobby}
            </p>
          </div>
        )}

        {/* Hobby Image */}
        <div className="overflow-hidden rounded-xl shadow-md max-w-2xl mx-auto">
          <img
            src={bakeImg}
            alt="Hobby image"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <ScrollToTopDown scrollImage={scollImage} />
    </div>
  );
}

export default About;
