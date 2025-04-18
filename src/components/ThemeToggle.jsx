import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

// Function to toggle the theme (light/dark) based on user preference
function ThemeToggle() {
  // State to manage the theme, defaulting to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect hook to apply the theme when the component mounts
  useEffect(() => {
    document.documentElement.className = theme; // Update the root class (HTML tag)
    localStorage.setItem("theme", theme); // Save the current theme in localStorage
  }, [theme]);

  // Toggle the theme state
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-800 dark:bg-light_text p-2 rounded-full"
    >
      {theme === "light" ? (
        <FaMoon className="text-white" size={20} />
      ) : (
        <FaSun className="text-yellow-500" size={20} />
      )}
    </button>
  );
}

export default ThemeToggle;
