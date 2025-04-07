/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f08080",
        light_text: "#edf6f9",
        secondary: "#b0c4b1", // lightgrren
        accent: "#9d8189",
        dark: "#14213d", // Dark gray color
        light: "ffe5d9", // Light gray color
      },
    },
  },
  plugins: [],
};
