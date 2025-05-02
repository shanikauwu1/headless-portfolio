import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import Loading from "../utilities/Loading";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchSkillsAndCategories = async () => {
      try {
        // Fetch skills with embedded media
        const skillsRes = await fetch(
          `${restBase}pfh-skill?_embed&per_page=20`
        );
        const skillsData = await skillsRes.json();

        // Fetch categories
        const catRes = await fetch(`${restBase}skill-category`);
        const catData = await catRes.json();

        setSkills(skillsData);
        setCategories(catData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoaded(false);
      }
    };

    fetchSkillsAndCategories();
  }, []);

  if (!isLoaded) return <Loading />;

  // Filter skills based on active tab
  const filteredSkills =
    activeTab === "all"
      ? skills
      : skills.filter((skill) =>
          skill["skill-category"]?.includes(Number(activeTab))
        );

  return (
    <div className="px-6 py-12 min-h-fit">
      <h2 className="text-3xl md:text-4xl font-bold text-dark mb-10 dark:text-light_text">
        My Skills
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-row">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded text-sm sm:px-6 sm:py-3 sm:text-base ${
            activeTab === "all"
              ? "bg-dark text-white dark:bg-accent"
              : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id.toString())}
            className={`px-4 py-2 rounded text-sm sm:px-6 sm:py-3 sm:text-base ${
              activeTab === cat.id.toString()
                ? "bg-dark text-white dark:bg-accent"
                : "bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {filteredSkills.map((skill) => {
          const imageUrl =
            skill._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <div
              key={skill.id}
              className="bg-white shadow-md rounded-lg px-4 pt-2 text-left hover:shadow-xl transition-shadow flex flex-row gap-2  items-center"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={skill.title.rendered}
                  className="w-[70px] h-[40px] mb-2 object-contain"
                />
              )}
              <h3 className="text-sm font-semibold text-center">
                {skill.title.rendered}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
