import { useEffect, useState } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";
import { motion } from "framer-motion";
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

  const restPath = restBase + "pages/71?_fields=acf,title,yoast_head_json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(restPath);
        if (!res.ok) throw new Error("Failed to fetch contact page data");

        const data = await res.json();
        setRestData(data);
        setIsLoaded(true);

        // Set Title and Description from Yoast SEO data
        if (data.yoast_head_json) {
          const { title, description } = data.yoast_head_json;

          document.title = title || "Contact | Shanika Ekanayake";

          let metaDescription = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescription) {
            metaDescription.setAttribute("content", description || "");
          } else {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            metaDescription.setAttribute("content", description || "");
            document.head.appendChild(metaDescription);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();

    return () => {
      setRestData(null); // Clean-up if needed
    };
  }, []);

  if (error) return <p className="text-red-500">{`Error: ${error}`}</p>;
  if (!isLoaded) return <Loading />;

  return (
    <section className="flex flex-col justify-center items-center min-h-[70vh]">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        whileHover={{ scale: 1.2, rotate: 3, color: "#f08181" }}
        className="cursor-pointer"
      >
        <h1 className="text-5xl font-bold mb-12 text-secondary dark:text-light_text">
          {restData?.acf?.heading}
        </h1>
      </motion.div>

      <div className="flex justify-center items-center gap-6 text-7xl text-accent">
        {restData?.acf?.icons?.map((item, idx) => {
          const Icon = iconComponents[item["react-icon"]];
          const url = item["url"];

          return Icon ? (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.2, rotate: 5, color: "#f43f5e" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer"
            >
              <div className="hover:text-dark dark:hover:text-light_text transition-colors duration-300">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              </div>
            </motion.div>
          ) : null;
        })}
      </div>
    </section>
  );
}

export default Contact;
