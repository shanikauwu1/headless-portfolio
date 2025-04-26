import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/shanikaE/",
  build: {
    outDir: "shanikaE",
  },
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
});
