import { useEffect, useState } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

// Import all icon packs you'll use
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const iconComponents = {
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
  FaEnvelope: FaEnvelope,
};

function Contact() {
  const [restData, setRestData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const restPath = restBase + "pages/71?_fields=acf,title";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(restPath);
        if (!res.ok) throw new Error("Failed to fetch contact page data");

        const data = await res.json();
        setRestData(data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">{`Error: ${error}`}</p>;
  if (!isLoaded) return <Loading />;

  return (
    <section className=" flex flex-col justify-center items-center min-h-[70vh]">
      <h1 className="text-5xl font-bold mb-12 dark:text-light_text">
        {restData?.acf?.heading}
      </h1>

      <div className="flex justify-center items-center gap-6 text-7xl text-primary ">
        {restData?.acf?.icons?.map((item, idx) => {
          const Icon = iconComponents[item["react-icon"]];
          return Icon ? (
            <div
              key={idx}
              className="hover:text-accent transition-colors duration-300 cursor-pointer"
            >
              <Icon />
            </div>
          ) : null;
        })}
      </div>
    </section>
  );
}

export default Contact;
