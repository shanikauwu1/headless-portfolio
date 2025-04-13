import { Link } from "react-router-dom";
function Project({ project }) {
  const { title, acf, id, _embedded } = project;

  const featuredImage = _embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Truncate description to 50 characters
  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Featured Image */}
      {featuredImage && (
        <img
          src={featuredImage}
          alt={title.rendered}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Project Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800">{title.rendered}</h3>

        {/* Truncated Description */}
        {acf?.description && (
          <p className="text-gray-600 text-sm">
            {truncateText(acf.description, 50)}
          </p>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap gap-4 mt-3">
          {/* GitHub */}
          {acf?.github_link?.url && (
            <a
              href={acf.github_link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}

          {/* Live Site */}
          {acf?.live_site?.url && (
            <a
              href={acf.live_site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:underline"
            >
              Live Site
            </a>
          )}
        </div>

        {/* View More Button */}
        <div className="mt-4">
          <Link
            to={`/project/${id}`}
            className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;
