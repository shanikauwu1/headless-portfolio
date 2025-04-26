import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { APP_FOLDER_NAME } from "./globals";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
