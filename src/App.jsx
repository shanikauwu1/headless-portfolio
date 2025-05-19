import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import SingleProject from "./pages/SingleProject";
import SVGLogo from "./components/SVGLogo";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching resources)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-white text-black px-4 py-2 rounded shadow"
      >
        Skip to main content
      </a>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 w-11/12 lg:w-4/5 mx-auto pt-16"
        role="main"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<SingleProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Loader = () => (
  <div style={appStyle}>
    <SVGLogo />
  </div>
);
const appStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#eeeeee",
};
export default App;
