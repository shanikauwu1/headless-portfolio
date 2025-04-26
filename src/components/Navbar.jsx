import { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();

  // check the path
  // Check if the current path is not the home page
  //const isNotHomePage = location.pathname !== "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`flex justify-between items-center py-8 px-6 text-dark text-2xl lg:px-16 dark:text-white relative"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-4xl font-semibold bg-primary bg-clip-text text-transparent opacity-90 transition-all duration-300  dark:text-light_text"
      >
        Shanika E<strong className="text-5xl">.</strong>
      </Link>

      {/* Hamburger / Close Icon */}
      <div className="block lg:hidden z-50">
        <button
          onClick={toggleMenu}
          className="text-primary dark:text-white  focus:outline-none "
        >
          {isMenuOpen ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Nav Links */}
      <ul
        className={`
    lg:flex lg:space-x-6
    ${
      isMenuOpen
        ? "fixed inset-0 bg-accent dark:bg-black dark:text-light_text text-light_text flex flex-col justify-center items-center space-y-8 z-40 lg:hidden"
        : "hidden lg:flex"
    }
    space-y-4 lg:space-y-0
  `}
      >
        {/* Nav Items */}
        <li>
          <NavLink
            to="/"
            onClick={() => isMenuOpen && toggleMenu()}
            className={({ isActive }) =>
              isActive ? "text-primary  dark:text-primary" : "hover:underline"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={() => isMenuOpen && toggleMenu()}
            className={({ isActive }) =>
              isActive ? "text-primary dark:text-primary" : "hover:underline"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            onClick={() => isMenuOpen && toggleMenu()}
            className={({ isActive }) =>
              isActive ? "text-primary  dark:text-primary" : "hover:underline"
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={() => isMenuOpen && toggleMenu()}
            className={({ isActive }) =>
              isActive ? "text-primary   dark:text-primary" : "hover:underline"
            }
          >
            Contact
          </NavLink>
        </li>

        <li>
          <ThemeToggle />
        </li>
      </ul>

      {/* Theme Toggle (mobile menu) */}
      {isMenuOpen && (
        <div className="absolute bottom-10">
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
