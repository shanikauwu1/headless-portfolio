import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const restPath = restBase + `pfh-skill?_embed`;

    const fetchSkills = async () => {
      try {
        const res = await fetch(restPath);
        const data = await res.json();
        setSkills(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching Skills:", error);
        setIsLoaded(false);
      }
    };
    fetchSkills();
  }, []);

  if (!isLoaded) return <Loading />;

  return (
    <div className="px-6 py-12  min-h-fit">
      <h2 className="text-4xl font-bold text-center mb-10">My Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {skills.map((skill) => {
          const imageUrl =
            skill._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <div
              key={skill.id}
              className="bg-white shadow-md rounded-lg px-4 pt-4 text-left hover:shadow-xl transition-shadow flex flex-row"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={skill.title.rendered}
                  className="w-[70px] h-[40px] mx-auto mb-4 object-contain"
                />
              )}
              <h3 className="text-lg font-semibold">{skill.title.rendered}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
