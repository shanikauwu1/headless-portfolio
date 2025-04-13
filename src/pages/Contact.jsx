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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-4">{restData?.acf?.heading}</h1>

      <div className="flex justify-center gap-6 text-4xl text-blue-600">
        {restData?.acf?.icons?.map((item, idx) => {
          const Icon = iconComponents[item["react-icon"]];
          return Icon ? <Icon key={idx} /> : null;
        })}
      </div>
    </div>
  );
}

export default Contact;
