import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import scollImage from "../assets/arrow-down.png";
import Skills from "../components/Skills";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import bakeImg from "../assets/bakeAcake.gif";

function About() {
  const restPath = restBase + "pages/63?_fields=acf,title";
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
      <section className=" py-16 px-6 md:px-20 bg-gradient-to-br from-white to-primary rounded-3xl">
        <title>{`Shanika Ekanayake | ${
          restData?.title?.rendered || "About"
        }`}</title>

        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-20">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-8 text-gray-800">Who I Am</h2>
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              {restData?.acf?.brief_about_me}
            </p>
          </div>

          {/* Image & Name Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              {restData?.acf?.name}
            </h1>
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
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white hover:text-primary"
              >
                <FaLinkedin size={60} />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white hover:text-primary"
              >
                <FaGithub size={60} />
              </a>
            </div>
          </div>
        </div>
        <img src={scollImage} alt="Scrolling" className="w-[80px] h-[80px]" />
      </section>

      {/* {skill section} */}
      <section className="mt-8 mb-8 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white to-secondary shadow-xl transition-all duration-300">
        <Skills />
      </section>
      {/* Education */}
      <section className="px-6 py-16 md:px-20 bg-gradient-to-br from-white to-primary rounded-3xl">
        <h2 className="text-4xl font-semibold mb-6">My Education</h2>
        {restData.acf?.my_eductaion?.length > 0 && (
          <div className="space-y-4">
            {restData.acf.my_eductaion.map((edu, index) => (
              <div key={index}>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.institution} • {edu.year}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 mb-8 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white to-secondary shadow-xl transition-all duration-300">
        <h2 className="text-4xl font-semibold">My Experience</h2>

        <div className="w-full max-w-4xl px-8 py-24 relative rounded-lg">
          {/* Vertical timeline line (full height) */}
          <div className="absolute top-0 bottom-0 left-[307px] w-1 bg-pink-400 z-0"></div>

          {restData.acf.experience.map((exp, index) => (
            <div key={index} className="relative mb-12 flex flex-wrap">
              {/* Left Side */}
              <div className="w-full md:w-1/3 pr-8 text-right relative mb-4 md:mb-0">
                {/* Dot on timeline */}
                <div className="absolute top-2 left-full transform -translate-x-1/2 w-8 h-8 border-4 border-red-400 bg-white rounded-full z-10"></div>

                <h3 className="text-lg font-semibold">{exp.duration}</h3>
                <p className="text-sm text-gray-600">
                  {exp.title}, {exp.company}
                </p>
              </div>

              {/* Right Side */}
              <div className="w-full md:w-2/3 pl-12 bg-white pt-4 pb-4">
                <p className="font-medium text-gray-700">
                  {exp["details-experience"]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 md:px-20 bg-gradient-to-br from-white to-primary rounded-3xl shadow-lg">
        {/* Hobby Title */}
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Hobby</h2>

        {/* Hobby Description */}
        {restData.acf?.hobby && (
          <div className="mb-10">
            <p className="text-xl font-semibold leading-relaxed text-gray-700">
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
    </div>
  );
}

export default About;
