import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <title>{`Shanika Ekanayake | ${
        restData?.title?.rendered || "About"
      }`}</title>

      <h1 className="text-3xl font-bold mb-4 text-center">
        {restData?.acf?.name}
      </h1>

      {/* Profile Image */}
      {profileImageUrl && (
        <img
          src={profileImageUrl}
          alt="Shanika Ekanayake"
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
        />
      )}

      <p className="text-gray-700 text-center mb-6">
        {restData?.acf?.brief_about_me}
      </p>

      {/* Education */}
      {restData.acf?.my_eductaion?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📘 My Education</h2>
          {restData.acf.my_eductaion.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-600">
                {edu.institution} • {edu.year}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {restData.acf?.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">💼 My Experience</h2>
          {restData.acf.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                {exp.title} at {exp.company}
              </p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
              <p className="text-gray-700 mt-1">{exp["details-experience"]}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hobby */}
      {restData.acf?.hobby && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🎯 Hobby</h2>
          <p>{restData.acf.hobby}</p>
        </div>
      )}
    </div>
  );
}

export default About;
