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
        className="text-5xl font-extrabold tracking-tight transition-all duration-500 ease-in-out
             text-secondary dark:text-light_text hover:scale-110"
      >
        <span className="relative">
          <span className="text-primary">S</span>
          <span className="absolute left-4 top-0 text-accent">E</span>
        </span>
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
              `relative inline-block  transition-all duration-300 
       ${
         isActive
           ? "text-primary dark:text-primary"
           : "text-dark dark:text-light_text"
       }
       before:content-[''] before:absolute before:bottom-0 before:right-0
       before:w-0 before:h-[2px] before:bg-current
       before:transition-all before:duration-300
       hover:before:w-full hover:before:left-0 hover:before:right-auto`
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
              `relative inline-block  transition-all duration-300 
       ${
         isActive
           ? "text-primary dark:text-primary"
           : "text-dark dark:text-light_text"
       }
       before:content-[''] before:absolute before:bottom-0 before:right-0
       before:w-0 before:h-[2px] before:bg-current
       before:transition-all before:duration-300
       hover:before:w-full hover:before:left-0 hover:before:right-auto`
            }
            end
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            onClick={() => isMenuOpen && toggleMenu()}
            className={({ isActive }) =>
              `relative inline-block  transition-all duration-300 
       ${
         isActive
           ? "text-primary dark:text-primary"
           : "text-dark dark:text-light_text"
       }
       before:content-[''] before:absolute before:bottom-0 before:right-0
       before:w-0 before:h-[2px] before:bg-current
       before:transition-all before:duration-300
       hover:before:w-full hover:before:left-0 hover:before:right-auto`
            }
            end
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={() => isMenuOpen && toggleMenu()}
            className={({ isActive }) =>
              `relative inline-block  transition-all duration-300 
       ${
         isActive
           ? "text-primary dark:text-primary"
           : "text-dark dark:text-light_text"
       }
       before:content-[''] before:absolute before:bottom-0 before:right-0
       before:w-0 before:h-[2px] before:bg-current
       before:transition-all before:duration-300
       hover:before:w-full hover:before:left-0 hover:before:right-auto`
            }
            end
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
