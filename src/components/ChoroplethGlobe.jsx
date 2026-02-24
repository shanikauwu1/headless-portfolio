import Globe from "react-globe.gl";
import { useState, useEffect } from "react";

export default function ChoroplethGlobe() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState(null); // Track hovered country

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        // Add a random value for demo
        const featuresWithValue = data.features.map((f) => ({
          ...f,
          properties: {
            ...f.properties,
            value: Math.floor(Math.random() * 100),
          },
        }));
        setCountries({ features: featuresWithValue });
      })
      .catch((err) => console.error(err));
  }, []);

  const getCountryColor = (d) => {
    const value = d.properties?.value ?? 0;
    if (value > 80) return "#ef4444"; // red
    if (value > 60) return "#f59e0b"; // orange
    if (value > 40) return "#3b82f6"; // blue
    if (value > 20) return "#10b981"; // green
    return "#9ca3af"; // gray
  };

  return (
    <div className="w-full h-full relative">
      {/* Globe */}
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        polygonsData={countries.features}
        polygonAltitude={0.01}
        polygonCapColor={getCountryColor}
        polygonSideColor={() => "rgba(0,0,0,0.15)"}
        polygonStrokeColor={() => "#111"}
        enablePointerInteraction={true}
        onPolygonHover={setHoverD} // ← set hovered country
      />

      {/* Tooltip */}
      {hoverD && (
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded shadow-md pointer-events-none">
          {hoverD.properties.ADMIN} — Value: {hoverD.properties.value}
        </div>
      )}
    </div>
  );
}
