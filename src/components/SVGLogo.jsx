const SVGLogo = () => (
  <>
    <style>{`
      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>

    <svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated Circle centered */}
      <circle
        cx="52"
        cy="45"
        r="25"
        stroke="url(#textGradient)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="188.4"
        strokeDashoffset="188.4"
        style={{
          animation: "draw 2s ease-in-out forwards",
        }}
      />

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cd2028" />
          <stop offset="100%" stopColor="#f08181" />
        </linearGradient>
      </defs>

      {/* S and E Text centered */}
      <text
        x="50"
        y="53"
        fontSize="24"
        fontWeight="700"
        textAnchor="middle"
        fill="#cd2028"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        S
      </text>
      <text
        x="58"
        y="48"
        fontSize="24"
        fontWeight="700"
        textAnchor="middle"
        fill="#f08080"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        E
      </text>
    </svg>
  </>
);

export default SVGLogo;
