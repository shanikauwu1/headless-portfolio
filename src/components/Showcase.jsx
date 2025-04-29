import React from "react";

const Showcase = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video">
      {/* Computer Frame Image */}
      <img
        src="/path-to-your-assets/monitor-mockup.png"
        alt="Computer Mockup"
        className="w-full h-auto"
      />

      {/* Project Screenshot */}
      <img
        src="/path-to-your-assets/project-screenshot.jpg"
        alt="Project Screenshot"
        className="absolute top-[10%] left-[8%] w-[84%] h-[80%] object-cover rounded-md"
      />
    </div>
  );
};

export default Showcase;
