import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-6">
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-primary"
          >
            <FaLinkedin size={40} />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-primary"
          >
            <FaGithub size={40} />
          </a>
        </div>

        {/* Optional: Footer text */}
        <p className="mt-4 text-center text-sm text-dark">
          &copy; {new Date().getFullYear()} Shanika Ekanayake.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
