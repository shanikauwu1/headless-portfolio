import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import SingleProject from "./pages/SingleProject";
import SVGLogo from "./components/SVGLogo";
import { useState, useEffect } from "react";

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
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 w-11/12 lg:w-4/5 mx-auto pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<SingleProject />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
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
  backgroundColor: "#f08181",
};
export default App;
