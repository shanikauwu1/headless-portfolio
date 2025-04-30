import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollToTopDown = ({ scrollImage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <motion.div
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
      >
        <img
          src={scrollImage}
          alt="Scroll down"
          className="w-[80px] h-[80px] hover:scale-110 transition-transform duration-300"
        />
      </motion.div>
    )
  );
};

export default ScrollToTopDown;
