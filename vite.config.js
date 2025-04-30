import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // or "/" for absolute root
  build: {
    outDir: "dist", // standard default build output folder
  },
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
});
