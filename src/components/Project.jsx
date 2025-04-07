// Project.js
function Project({ project }) {
  return (
    <li key={project.id} className="mb-2">
      <h3 className="text-lg font-semibold">{project.title.rendered}</h3>
      {/* You can add more fields here like project description or excerpt */}
      <div
        dangerouslySetInnerHTML={{
          __html: project.excerpt.rendered || "No description available",
        }}
      />
      {/* If you have ACF fields like featured image or other data, you can display them here */}
      {project.acf?.image && (
        <img src={project.acf.image.url} alt={project.title.rendered} />
      )}
    </li>
  );
}

export default Project;
