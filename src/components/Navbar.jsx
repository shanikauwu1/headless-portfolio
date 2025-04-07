import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  // State to manage the visibility of the menu on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center py-8 px-6 bg-primary text-light_text text-2xl lg:px-16 dark:text-white dark:bg-black">
      <ThemeToggle />

      {/* Hamburger Icon */}
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="text-white">
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navbar Links */}
      <ul
        className={`lg:flex lg:space-x-6 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block space-y-4 lg:space-y-0`}
      >
        <li className="group relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-dark" : "hover:underline"
            }
            end
          >
            Home
          </NavLink>
          {/* Underline animation */}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-dark transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-dark" : "hover:underline"
            }
          >
            About
          </NavLink>
          {/* Underline animation */}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-dark transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-dark" : "hover:underline"
            }
          >
            Projects
          </NavLink>
          {/* Underline animation */}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-dark transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group relative">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-dark" : "hover:underline"
            }
          >
            Contact
          </NavLink>
          {/* Underline animation */}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-dark transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>

      <a
        href="#home"
        className="text-4xl font-semibold bg-gradient-to-r from-white to-green-600 bg-clip-text text-transparent opacity-90 transition-all duration-300"
      >
        SE
      </a>
    </nav>
  );
};

export default Navbar;
